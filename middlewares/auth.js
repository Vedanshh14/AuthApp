//Middlewares to implement
//auth , isStudent , isAdmin;

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    //extracting the token
    //maybe in cookies or header of request
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    // If token not found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing, please login",
      });
    }
    // Verify token
    try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach payload to request,see notion 4.2 for these 2 lines


      console.log(decoded); //to see in postman.
      next(); // Proceed to next middleware or route
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
   } 
  
  catch (err) {
      return res.status(500).json({
      success: false,
      message: "Something went wrong in authentication",
    });
  }
};

exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role!=="student"){
           return res.status(401).json({
                success:false,
                message: "This is a Student Exclusive route"

           });
        }
        //if student then move ahead
        next();
    }
    catch (err) {
      return res.status(500).json({
      success: false,
      message: "Something went wrong in isStudent middleware",
    });
  }
}


exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role!=="admin"){
           return res.status(401).json({
                success:false,
                message: "This is admin Exclusive route"

           });
        }
        //if admin then move ahead
        next();
    }
    catch (err) {
      return res.status(500).json({
      success: false,
      message: "Something went wrong in isAdmin middleware",
    });
  }
}
