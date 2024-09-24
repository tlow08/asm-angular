import Joi from "joi";

const createValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number(),
    image: Joi.string()
});

export {createValidator};