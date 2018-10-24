const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const config = require('./src/server/config/database');

require("./src/server/models/user");
require('./src/server/config/passport')(passport);

const port = process.env.PORT || 3000;

const app = express();

//connect to DB
mongoose.connect('mongodb://admin:password@ds115758.mlab.com:15758/workingapi')
.then(() => console.log('Database connected'))
.catch(err => console.log('Error Connecting to Database'));

//setting up middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/node_modules')));

//serving up static files in client directory
app.use(express.static(path.resolve('./src/client')));
//setting up api endpointss
//var index = require('./src/server/routes/index.js');
const users = require('./src/server/routes/users');

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//app.use('/login', index);
app.use('/users', users);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'src/server/views/index.html'));
});


//serving up node_modules

app.listen(port, () => console.log(`Server started on port ${port}`));
