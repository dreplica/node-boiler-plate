 import {Request, Response,NextFunction} from "express"
import { verifyToken } from "../../config/encrypt"
 
// function auth(req: ({ user: string } & Request), res: Response, next: NextFunction) {

//     //use jwt to veify user
//     //collect user from cookies
//      res.set("cookies",{token:`Bearer `})
//     return next()
//  }

export async function sessionHandler(req: Request, _: Response, next: NextFunction) {
    const [cookie,...remaining] = req.headers.cookie?.match(/token=.{0,};/) as RegExpExecArray
    if (!req.session?.user) {
        const user = await verifyToken(cookie.replace(/token=|;/g,"").trim())
        req.session!.user = user
    }
    next() 
}