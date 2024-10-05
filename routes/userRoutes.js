/*const express = require('express')
const userController =require('../controller/userController')
const router = express.Router()
router.use(express.urlencoded({extended:false}))


router.get('/',(req,res)=>{
    userController.loginpage(req,res)
})
router.get('/signup',(req,res)=>{
    userController.signuppage(req,res)
})
// Express.js route for login page
//router.get('/login', (req, res) => {
  //  res.render('login'); // Renders login.ejs file
//})
router.post('/signup/submit',(req,res)=>{
    console.log('POST request received at /signup/submit');
    userController.signupSubmit(req,res)
})
//router.post('/loginuser',(req,res)=>{
   // userController.userlogin(req,res)
//})
router.post('/login', (req, res) => {
    userController.handleLogin(req, res);
});
router.get('/adminlogin', (req, res) => {
    userController.adminDashboard(req, res);
});
router.get('/userlogin', (req, res) => {
    userController.userDashboard(req, res);
});




module.exports=router;  */


const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    userController.loginpage(req, res);
});

router.get('/signup', (req, res) => {
    userController.signuppage(req, res);
});

router.post('/signup/submit', (req, res) => {
   // console.log('POST request received at /signup/submit');
    userController.signupSubmit(req, res);
});

// Handle login request for both admin and user
router.post('/login', (req, res) => {
    userController.handleLogin(req, res);
});

// Render admin dashboard
router.get('/adminlogin', (req, res) => {
    userController.adminDashboard(req, res);
});  

 //Render user dashboard
router.get('/userlogin', (req, res) => {
    userController.userDashboard(req, res);
});

module.exports = router;
