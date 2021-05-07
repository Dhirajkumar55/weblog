if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const { urlencoded } = require('body-parser');
const { v4: uuid } = require('uuid');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Blog = require('./models/blog');
const User = require('./models/user');
const multer = require('multer');
const { storage } = require('./cloudinary');
const upload = multer({ storage });
const session = require('express-session');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const edjsHTML = require("editorjs-html");
const edjsParser = edjsHTML();
const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');


const sessionConfig = {
    secret: 'Thisisnotatallagoodone',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

mongoose.connect('mongodb://localhost:27017/we-blog', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected")
})

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

app.use('/', userRoutes);
app.use('/blogs', blogRoutes);
app.use('/blogs/:id/comments', commentRoutes);
app.use('/categories', categoryRoutes);


app.get('/', (req, res) => {
    res.render('homepage');
})

app.get('/categories', (req, res) => {
    res.redirect('/#categories');
})


app.listen(8080, () => {
    console.log("Listening on port- 8080");
})