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
const MongoDBStore = require('connect-mongo');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/we-blog';


mongoose.connect(dbUrl, {
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

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function(e) {
    console.log("Session Store Error", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(flash());
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session(sessionConfig));
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
    res.render('blogs/homepage');
})

app.get('/categories', (req, res) => {
    res.redirect('/#categories');
})

app.get('/aboutus', (req,res) =>{
    res.render('blogs/about');
});

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})