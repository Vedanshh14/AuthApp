const express = require("express");
const router = express.Router();

// import controller

const {signup} = require("../controllers/LoginSignup");
const {login} = require("../controllers/LoginSignup");


//define API routes

router.post("/signup",signup);
router.post("/login",login);


//............Middlewares:..............

//protected routes with middleware, cant access them without
//going through middlewares

// router.get("/ProtectedRoute",middleware1,middleware2,finalController);
//always import all required middlewares from middleware folder
//and finalcontrollers from controllers folder
//example below

//before showing the user student page,
//we wanna check wether user has logged in therefore
//its logic is written in auth middleware
//next we need to do authorization that whether the
//user is admin or student ,agr admin h toh user vala
//route kese dikhadenge, similarly student ko admin ka route
//nhi krne denge access

const {studentPage} = require("../controllers/pages");
const {adminPage} = require("../controllers/pages");

const {auth} = require("../middlewares/auth");
const {isStudent} = require("../middlewares/auth");
const {isAdmin} = require("../middlewares/auth");

router.get("/student",auth, isStudent,studentPage);
router.get("/admin",auth, isAdmin,adminPage);

//above lines mean /student p koi request aaye toh 
//student page vala controller chlana which is there in
// controllers/pages.
//prrrr, usse phle auth and isStudent vala function chlana
//joki middlewares m auth.js m likha h

module.exports = router;