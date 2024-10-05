const express = require('express');
const path = require('path'); // Importing path module
const userRoutes = require('./routes/userRoutes');
const connection = require('./connection');

const app = express();
connection()


// Set view engine to EJS
app.set('view engine', 'ejs');  


// Set the path to the view directory (since your folder is named 'view')
app.set('views', path.join(__dirname, 'view')); // Correct this line to use 'views'

app.use('/', userRoutes);

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is running on port 3000");
    }
});




















