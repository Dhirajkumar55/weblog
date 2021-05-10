const Joi = require('joi');

module.exports.blogSchema = Joi.object({
    blog: Joi.object({
        title: Joi.string().required(),
        duration: Joi.number().required().min(0),
    }).required()
});

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        body: Joi.string().required()
    }).required()
})