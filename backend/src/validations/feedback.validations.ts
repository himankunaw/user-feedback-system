const Joi = require('joi');

export const submitFeedBack = {
  body: Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().max(100).required(),
    feedbackText: Joi.string().required(),
    category: Joi.string().valid('suggestion', 'bug', 'feature', 'other').default('suggestion')
  })
};

export const getallFeedback = {
    query: Joi.object({
        category: Joi.string().valid('suggestion', 'bug', 'feature', 'other').optional(),
        sortBy: Joi.string().valid('newest', 'oldest').optional()
    })
}