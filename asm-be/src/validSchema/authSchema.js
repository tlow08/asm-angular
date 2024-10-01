import Joi from "joi";

export const authSchema = Joi.object({
    email: Joi.string().required().email().message({
        "string.base": "Email must be a string",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
        "string.email": "Email must be a valid email",
        "string.pattern.base": "Email cannot contain spaces"
    }),

    password: Joi.string().required().min(6).max(255).messages({
        "string.base": "Password must be a string",
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
        "string.min": "Password must have at least 6 characters",
        "string.max": "Password must have at most 255 characters",
        "string.pattern.base": "Password cannot contain spaces",
    }),
});
