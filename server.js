const express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    passport = require('passport');
    require('dotenv').config();


// Express Session
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
});

// Models
//  Userlogin = require("./models/Userlogin"),

// Routes
const dashboardRoute = require("./routes/dashboardRoute");
const registerRoutes = require("./routes/registerroutes");
const loginRoutes = require("./routes/loginroutes");
const managerlist = require("./routes/managerlist");
const productRoutes = require("./routes/productroutes");


const Manager = require("./models/Manager");

// Database
const config = require('./config/database');

//Initialising server
const server = express();

// Mongoose Set up
//connect mongoose
mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;
// Check connection
db.once('open', function () {
    console.log('Connected to MongoDB');
});
// Check for db errors
db.on('error', function (err) {
    console.error(err);
});

// Setting view Engine.
server.set('view engine', 'pug');
server.set('views', './views');

// Express Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(expressSession);

//configuring passport middleware
passport.use(Manager.createStrategy());
passport.serializeUser(Manager.serializeUser());
passport.deserializeUser(Manager.deserializeUser());

// Routing
server.use('/register', registerRoutes);
server.use('/login', loginRoutes);
server.use('/procurement', dashboardRoute);
server.use('/managers', managerlist);
server.use('/', loginRoutes);
server.use('/products', productRoutes);
server.use('/list', productRoutes);
server.use('/edit_product', productRoutes);



// Non Existing Routes and Server Port
// handling non existing routes
server.get('*', (req, res) => {
    res.status(404).send('OOPS! WRONG ADDRESS');
});

// server
server.listen(3002, () => console.log('Listening on Port 3002'));