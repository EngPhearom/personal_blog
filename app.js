const express = require('express');
const upload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

//register view engine
app.set('view engine', 'ejs');

//register static
app.use(express.static('public')); //use for static file (css, js, img)
app.use(express.urlencoded({extended: true})); //convert input from frontend to object in backend
app.use(upload()); // for upload file

//User
app.use(userRoutes);

//Admin
app.use(adminRoutes);

app.listen(process.env.PORT);
