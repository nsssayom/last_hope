import { Joi } from "express-validation";

export const registrationValidation = {
    body: Joi.object({
        id_type: Joi.number().required(),
        id_number: Joi.string().min(3).max(12).required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).required(),
        user_level: Joi.number()
    })
};

export const userValidation = {
    query: Joi.object({
        id: Joi.number(),
        id_type: Joi.number(),
        id_number: Joi.string(),
        name: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
    })
        .with('id_number', 'id_type')
        .with('id_type', 'id_number')
        .or('id', 'name', 'email', 'phone', 'id_number')
};

export const existancialValidation = {
    body: Joi.object({
        id_type: Joi.number(),
        id_number: Joi.string().alphanum(),
        email: Joi.string().email(),
        phone: Joi.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
    })
    .with ('id_number', 'id_type')
    .with('id_type', 'id_number')
    .or ('id_number', 'email', 'phone')
};

export const loginValidation = {
    query: Joi.object({
        phone: Joi.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
    })
};