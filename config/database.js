const mongoose = require("mongoose");

require("dotenv").config();

//above line adds all .env file data to process object
//uske lie phle install dotenv library
// in terminal run : npm i dotenv
//now connect with DB

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(()=>{
        console.log("DB Connection Successsful")
    })
    .catch((error)=>{
        console.log("DB connection unsuccessfull");
        console.log(error.message)
        process.exit(1);
    })

    module.exports = dbConnect;
}
module.exports = dbConnect;
