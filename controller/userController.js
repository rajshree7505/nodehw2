const { render } = require('ejs')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const AdminModel= require('../models/adminModel')
const saltRound = 10;
function loginpage(req,res){
  try{
    res.render('login')
  }catch(err){
    console.log(err)
  }
}
function signuppage(req,res){
   try{
    res.render('signup')
   }catch(err){
    console.log(err)
   }
}
async function signupSubmit(req,res){
  try{
       let hashedPassword = bcrypt.hashSync(req.body.password, saltRound);
       let student = await new User(req.body);
       console.log(student);
       student.password = hashedPassword;
       await student.save()
       res.render('login')
  }catch(err){
     console.log(err)
  }
 }
 /*function userlogin(req,res){
  try{
    res.render('userlogin')
  }catch(err){
    console.log(err)
  }
}
*/
async function handleLogin(req, res) {
  const { email, password } = req.body;

  try {
      // First check if the user is an admin
      const admin = await AdminModel.findOne({ email });
      console.log('Admin found:', admin); // Log admin retrieval

      if (admin) {
          // Check if the password matches for admin
          const isAdminMatch = await bcrypt.compare(password, admin.password);
          console.log('Admin password match:', isAdminMatch); // Log password comparison

          if (isAdminMatch) {
              return res.redirect('/adminlogin');
          } else {
              return res.status(401).send('Invalid admin credentials. Please try again.');
          }
      }

      // If not admin, check for regular user
      const user = await User.findOne({ email });
      console.log('User found:', user); // Log user retrieval

      if (!user) {
          return res.status(401).send('Invalid user credentials. Please try again.');
      }

      // Check if the password matches for regular user
      const isUserMatch = await bcrypt.compare(password, user.password);
      console.log('User password match:', isUserMatch); // Log password comparison

      if (!isUserMatch) {
          return res.status(401).send('Invalid user credentials. Please try again.');
      }

      // Redirect based on usertype (1 for admin, 2 for user)
      if (user.usertype === 1) {
          return res.redirect('/adminlogin');
      } else {
          return res.redirect('/userlogin');
      }
  } catch (error) {
      console.error('Error during login:', error); // Log the error
      return res.status(500).send('Internal server error.');
  }
}

async function adminDashboard(req, res) {
  let users = []; // Initialize users as an empty array
  try {
    // Fetch all users from the database
    users = await User.find({}); // Fetch users from the database
    
    // Render the adminlogin page and pass the users data
    res.render('adminlogin', { users }); // Pass users to the template
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users.');
  }
}

module.exports = {
  adminDashboard,
};

  
function  userDashboard(req,res){
  res.render('userlogin')
}  

async function createAdmin() {
  try {
      const existingAdmin = await AdminModel.findOne({ email: 'rajshreeraj9927@gmail.com' });
      if (!existingAdmin) {
          const hashedPassword = await bcrypt.hash('123456', 10); // Hash the password
          const newAdmin = new AdminModel({ email: 'rajshreeraj9927@gmail.com', password: hashedPassword });
          await newAdmin.save();
          console.log('Admin created successfully:', newAdmin);
      } else {
          console.log('Admin already exists:', existingAdmin);
      }
  } catch (error) {
      console.error('Error creating admin:', error);
  }
}

// Call the function to insert data
createAdmin();

// Exporting the functions for use in routes
module.exports={
    loginpage,
    signuppage,
    signupSubmit,
    handleLogin,
    adminDashboard,
    userDashboard,
    //getAllUsers
    //userlogin,
  

    
}