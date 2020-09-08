import express, { Request, Response } from 'express';

import { RESULT } from '../config/index';
import { checkPostSchema } from '../config/validator';
import { sessionHandler } from '../controller/middlewares/auth';
import Controller from '../controller/request';

const router = express.Router();

router.get('/', sessionHandler, async (_:Request, res: Response) => {
	const result: RESULT = await new Controller().get();
	// console.log("the session",_.session!)
	return result.error
		? res.status(<number>result.code).json({ error: result.error })
		: res.status(<number>result.code).json({ data: result.data,token:_.headers.cookie });
});

router.post('/', async function(req: Request, res: Response) {
	const result: RESULT = await new Controller().post(req.body);
	return result.error
		? res.status(<number>result.code).json({ error: result.error })
		: res.status(<number>result.code).json({ data: result.data });
});

// router.put('/:id', function (req: Request, res: Response, next: NextFunction) {
//   const result = Controller.put(item)
//   return res.status(200).send("thank you")
// });

router.delete('/:id', async function(req: Request, res: Response) {
	const result = await new Controller().delete(req.params.id);
	return result.error
		? res.status(<number>result.code).json({ error: result.error })
		: res.status(<number>result.code).json({ data: result.data });
});

export default router;
