const Blog = require('../models/blog');
const User = require('../models/user');
const { cloudinary } = require("../cloudinary");
const Category = require('../models/category');
const mongoose = require('mongoose');
const JSAlert = require('js-alert');

const convertDataToHtml = (blocks) => {

    var blocklist = []
    const x = blocks.map(block => {
        var convertedHtml = "";
        switch (block.type) {
            case "header":
                convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                break;
            case "paragraph":
                convertedHtml += `<p>${block.data.text}</p>`;
                break;
            case "image":
                convertedHtml += `<img class="img-fluid" src="${block.data.url}">`;
                break;
            case "list":
                convertedHtml += "<ul>";
                block.data.items.forEach(function(li) {
                    convertedHtml += `<li>${li}</li>`;
                });
                convertedHtml += "</ul>";
                break;
            default:
                console.log("Unknown block type", block.type);
                break;
        }
        blocklist.push(convertedHtml)
    });
    return blocklist;
}

module.exports.home = async(req, res) => {
    const blogs = await Blog.find({}).populate('author').sort();
    res.render('blogs/home', { blogs })
}

module.exports.renderNewForm = (req, res) => {
    res.render('blogs/newBlog');
}

module.exports.createNewBlog = async(req, res, next) => {
    const blog = await new Blog(req.body.blog);
    blog.image.url = req.file.path;
    blog.image.filename = req.file.filename;
    blog.author = req.user._id;
    blog.body = convertDataToHtml(JSON.parse(req.body.blogbody).blocks);
    if (req.body.Category) {
        if (req.body.Category instanceof Array) {
            for (let cat of req.body.Category) {
                blog.categories.push(cat);
                let category = await Category.findOneAndUpdate({ 'category': cat }, { $push: { blogs: blog } }, { new: true }).populate({
                    path: 'blogs',
                    populate: {
                        path: 'author'
                    }
                });
            }

        } else {
            blog.categories.push(req.body.Category);
            let category = await Category.findOneAndUpdate({ 'category': req.body.Category }, { $push: { blogs: blog } }).populate('blogs');
        }
    }
    await blog.save();
    req.flash('success', 'Succesfully created a blog');
    res.redirect(`blogs/${blog._id}`);
}

module.exports.showBlog = async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!blog) {
        req.flash('error', 'Cannot find the blog!');
        return res.redirect('/blogs');
    }
    res.render('blogs/post', { blog });
}

module.exports.upvotes = async(req, res) => {
    await Blog.find({
        '_id': req.params.id,
        'likes': {
            $in: [
                mongoose.Types.ObjectId(req.user._id),
            ]
        }
    }, async function(err, docs) {
        if (!docs[0]) {
            const userid = req.user._id;
            const blogid = req.params.id;
            const user = await User.find({ '_id': req.userid })
            const newBlog = await Blog.findByIdAndUpdate({ '_id': blogid }, { $push: { likes: userid } })
        } else {
            const userid = req.user._id;
            const blogid = req.params.id;
            await Blog.findByIdAndUpdate(blogid, { $pull: { likes: userid } });
        }
        res.redirect(`/blogs/${req.params.id}`)
    })
}

module.exports.renderEditForm = async(req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id)
    if (!blog) {
        req.flash('error', 'Blog not found');
        return res.redirect('/blogs');
    }
    res.render('blogs/edit', { blog });
}

module.exports.updateBlog = async(req, res) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, {...req.body.campground });
    req.flash('success', 'Successfully updated the blog!');
    res.redirect(`/blogs/${blog._id}`)
}

module.exports.deleteBlog = async(req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted')
    res.redirect('/blogs');
}