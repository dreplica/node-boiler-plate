import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';

export async function encrypt(password: string) {
	try {
		const { value, error } = Joi.object({
			password: Joi.string().regex(/.{6,30}/).required()
		}).validate({password:password});

        if (error) throw new Error(error.message);
        
        const salt = await bcrypt.genSalt(13);
        const hash = await bcrypt.hash(value.password, salt)
        return {data:hash}

    } catch (error) {
        return {error:error.message,code :404}
     }
    
}


export async function createToken(username: string) {
    try {
        const sign = jwt.sign(username,<string>process.env?.["JWT_TOKEN"])
        if (!sign) throw new Error("sorry couldn't maintain user")
        console.log("the sign",sign)
        return {data:sign}
    } catch (error) {
        return {error:error.message,code:404}
    }
}

export async function verifyToken(token: string) {
    try { 
        const details = jwt.verify(token, <string>process.env?.["JWT_TOKEN"])
        if(!details) throw new Error("sorry couldn't verify user")
        return { data: details }
    } catch (error) {
        return {error:error.message,code:404}
    }
}
