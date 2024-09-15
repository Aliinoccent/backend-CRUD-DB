const Joi = require('joi');

const validateItem = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateItem;

