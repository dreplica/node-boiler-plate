import joi,{ ObjectSchema} from 'joi';
import { POST, LOGIN } from './index';

export const checkPostSchema:ObjectSchema<POST> = joi.object<POST>({
	organization: joi.string().regex(/^[a-zA-Z]{3,30}$/i).required(),
	address: joi.string().required(),
	ceo: joi.string().required(),
	employees: joi.array().items(joi.string().regex(/^[a-zA-Z]{2,}$/).required()),
	products: joi.array().items(joi.string().regex(/^[a-zA-Z]{5,}$/).required())
});


export const loginSchema = joi.object<LOGIN>({
	username:joi.string().regex(/^[\w|\d]{2,}$/).max(10).required(),
	password:joi.string().regex(/.{6,20}/).required(),
})
