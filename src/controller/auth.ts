import { encrypt,createToken } from '../config/encrypt';
import { LOGIN, RESULT } from './../config/index';
import database from '../model/pg-config';

const { sql } = database

export default class {
    constructor() { };

    async login(login:LOGIN):Promise<RESULT> {
        try {
            const hashPassword = encrypt(login.password)

            // const userCheck = await sql`SELECT username FROM users WHERE username=${login.username}`
            // if(!userCheck.length) throw new Error("sorry username or password is incorrect")
            const {data:token} = await createToken(login.username)
            return {data:token, code:200}
        } catch (error) {
            return {error:error.message, code:404}
        }
    }
}
