const Joi = require('Joi');

const validate = (query) => {   
    const schema = {
        country: Joi.string().min(0).max(100),
        searchInMiddle: Joi.string().valid(['true','false'])
    };
    return Joi.validate(query, schema);
};

module.exports = validate;