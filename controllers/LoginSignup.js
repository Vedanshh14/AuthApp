const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// controller for signup
exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, role } = req.body;

    //checking if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
    //securing the password using hashing

    const hashedPassword = await bcrypt.hash(password, 10);

    //create entry for user

    //create entry for user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "user Entry created Succesfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "user cant be registered",
    });
  }
};


//.....................................................
// controller for login



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        messsage: "please enter all fields",
      });
    }

    //check for registered user
    let user = await userModel.findOne({ email });

    //if not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user doesnt exist",
      });
    }
    // prepare payload to create jwt token and send it into cookies
    // cookie can be sent in res.body also, where frontend can
    //extract it.study about this in detail on notion
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    //if passwords match
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      //updating our user object (not DB) to send in cookies, we wont  send password each time, thus make it undefuned

      user.token = token;
      user.password = undefined;

      const options = {
        //cookies expire in 3days
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "user logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
};
