require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require("bcryptjs");
const User = require('./models/User');
const {
    checkAuthenticated,
    checkNotAuthenticated
} = require('./middlewares/auth');

const app = express();

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  async (email) => {
    const userFound = await User.findOne({ email });
    return userFound;
  },
  async (id) => {
    const userFound = await User.findOne({ _id: id });
    return userFound;
  }
);


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(flash());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride("_method"));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/login', checkNotAuthenticated,(req, res) => {
    res.render('login');
});

app.get('/menu', function(req, res) {
    res.render('menu');
});

app.get('/table', function(req, res) {
    res.render('table');
});

app.get('/sign_up', checkNotAuthenticated, (req, res) => {
    res.render('sign_up');
});

app.get('/cart', function(req, res) {
    res.render('cart');
});

app.get('/myOrder', function(req, res) {
    res.render('myOrder');
});

app.get('/orderLists', function(req, res) {
    res.render('orderLists');
});

app.get('/kitchen', function(req, res) {
  res.render('kitchen');
});

app.post(
    "/login",
    checkNotAuthenticated,
    passport.authenticate("local", {
      successRedirect: "/orderLists",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );
  
  app.post("/sign_up", checkNotAuthenticated, async (req, res) => {
    const userFound = await User.findOne({ email: req.body.email });
  
    if (userFound) {
      req.flash("error", "User with that email already exists");
      res.redirect("/sign_up");
    } else {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
          email: req.body.email,
          password: hashedPassword,
        });
  
        await user.save();
        res.redirect("/login");
      } catch (error) {
        console.log(error);
        res.redirect("/sign_up");
      }
    }
  });

  mongoose.connect("mongodb://localhost:27017/auth", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
  
//running on port 3000
app.listen(3000);
console.log('Server is listening on port 3000');