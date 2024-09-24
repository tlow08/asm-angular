import Joi from "joi";

const registerValidator = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
})

const loginValidator = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
})

export {registerValidator, loginValidator};