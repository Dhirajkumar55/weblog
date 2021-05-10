const mongoose = require('mongoose');
const Blog = require('../models/blog');
const Category = require('../models/category');

mongoose.connect('mongodb://localhost:27017/we-blog', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected")
});

const seedCategory = async() => {
    await Category.deleteMany({});
    const travel = new Category({
        category: 'Travel'
    });
    await travel.save();

    const gaming = new Category({
        category: 'Gaming'
    });
    await gaming.save();

    const technology = new Category({
        category: 'Technology'
    });
    await technology.save();

    const food = new Category({
        category: 'Food'
    });
    await food.save();

    const literature = new Category({
        category: 'Literature'
    });
    await literature.save();

    const business = new Category({
        category: 'Business'
    });
    await business.save();

    const arts = new Category({
        category: 'Arts'
    });
    await arts.save();

    const education = new Category({
        category: 'Education'
    });
    await education.save();

    const social = new Category({
        category: 'Social'
    });
    await social.save();

    const health = new Category({
        category: 'Health'
    });
    await health.save();

}

seedCategory().then(() => {
    mongoose.connection.close();
})