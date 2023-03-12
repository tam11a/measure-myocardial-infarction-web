import Joi from "joi";

export const loginResolver = Joi.object({
	email: Joi.string()
		.label("Email")
		// .pattern(/01\d{9}$/)
		.required()
		.messages({
			"string.pattern.base": "Invalid Email Address",
		}),
	password: Joi.string()
		.label("Password")
		// .min(6)
		.required(),
	remember: Joi.boolean().default(true),
	gender: Joi.string().label("Gender").required().default("male"),
	name: Joi.string().label("Full Name").required(),
});
