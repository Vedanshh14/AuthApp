const express  = require("express");
const app = express();

//load env file data to a process object
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json body 
app.use(express.json());

//middleware to parse incoming cookies and extract data from it
const cookieParser = require("cookie-parser");
app.use(cookieParser());


app.listen(PORT,()=>{
    console.log('server started');
})

//import and mount routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/v1",userRoutes)


//connect to db
const dbConnect = require("./config/database");
dbConnect();

//default route
app.get("/",(req,res)=>{
    res.send('<h1>this is AuthApp</h1>');
})