const Blog = require('../models/blog');
const Comment = require('../models/comment');

module.exports.createComment = async(req, res) => {
    const blog = await Blog.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    blog.comments.push(comment);
    await comment.save();
    await blog.save();
    // req.flash('success', 'Created new comment!');
    res.redirect(`/blogs/${blog._id}`);
}

module.exports.deleteComment = async(req, res) => {
    const { id, commentId } = req.params;
    await Blog.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    // req.flash('success', 'Successfully deleted comment')
    res.redirect(`/blogs/${id}`);
}