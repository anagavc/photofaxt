//setting up the app to use the  local .env while in development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//requiring exxpress as my server
const express = require('express');
//executing express
const app = express();
//requiring path
const path = require('path');
//requiring the error class we created
const ExpressError = require('./utils/ExpressError');
//requiring mongoose
const mongoose = require('mongoose');
//requiring passport
const passport = require('passport');
//requiring passport-local
const LocalStrategy = require('passport-local');
//requiring our route for the homepage
const homeRoutes = require('./routes/home');
//requiring our route for the admin
const adminRoutes = require('./routes/admin');
//requiring sessions
const session = require('express-session');
//requiring methodOverride
const methodOVerride = require('method-override');
//requiring ejs-mate
const ejsMate = require('ejs-mate');
//requiring our connect-flash
const flash = require('connect-flash');
//requiirng express-mongo-sanitize that aids in preventing mongo injection
const mongoSanitize = require('express-mongo-sanitize');
//requiirng helmet that will enbale us set up our content security policy
const helmet = require("helmet");
//requiring connect-mongo
const MongoStore = require('connect-mongo');
//creating a variable to contain both the remote adnd local database
const dbUrl = process.env.DB_URL;

//creating a secret that will further aid in protecting the app's sessions
const secret = process.env.SECRET || 'topsecret';

//setting the application's port
const port = process.env.PORT || 3000;
//requiring admin model
const Admin = require('./models/admin');
//requiring title  model
const Title = require('./models/title');


//this tells express to use ejs Locals for all ejs templates
app.engine('ejs', ejsMate)

//setting our view engine to be ejs
app.set('view engine', 'ejs');

//joining our views directory with path
app.set('views', path.join(__dirname, 'views'));

//this will enable us serve the files in our public directory
app.use(express.static(path.join(__dirname, 'public')));

//setting up the database connection using mongoose
mongoose
    .connect(dbUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });

//logic to check if there is an error with our database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});
//telling express to parse our post requests so we can access req.body
app.use(express.urlencoded({ extended: true }));

//telling express to use flash
app.use(flash());

//creating a new store variable that will enable us use connect-mongo
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});
store.on('error', function (e) {
    console.log("SESSION STORE ERROR", e)
});
//setting up express to use  express-session
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // secure:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));

//telling our app to use passport.initialize and passport.session
app.use(passport.initialize());
app.use(passport.session());

//telling our server to use method override and the query string we want to use is _method
app.use(methodOVerride('_method'));

//thi tells passport to use the local strategy and authenticate our  admin model
passport.use(new LocalStrategy(Admin.authenticate()));

//this tells passport how to store an admin in a session
passport.serializeUser(Admin.serializeUser());

//this tells passport how to get an admin out from a session
passport.deserializeUser(Admin.deserializeUser());

//using mongoSanitize
app.use(mongoSanitize());


//the underlisted are a list of urls that we want to be accessed by the application,anything not in the list will be rejected
const scriptSrcUrls = [
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://fonts.googleapis.com/",
    "https://cdn.jsdelivr.net",
];
const fontSrcUrls = [
    'https://fonts.googleapis.com/',
    ' https://fonts.gstatic.com/',
    "https://cdn.jsdelivr.net"
];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dbi5rixx1/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);
//middleware to enable use flash automatically in the templates without having to pass it through
app.use((req, res, next) => {
    res.locals.currentUser = req.user; //setting our currentUser in all our templates to be equals to req.user
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// setting up the route to be used  for the homepage
app.use('/', homeRoutes);

//setting up the route to be used for the admin page
app.use('/admin', adminRoutes);


//setting up the 404 route
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

//setting up the error hnadler and the error template tghat is to be rendered
app.use(async (err, req, res, next) => {
    const { statusCode = 500 } = err;
    const title = await Title.findById("60e1b0bdd2ef5332442124d7")
    if (!err.message) err.message = 'Oh No, something went wrong'
    res.status(statusCode).render('error', { err, title });
})


//console.logging that the app is listening on port 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});