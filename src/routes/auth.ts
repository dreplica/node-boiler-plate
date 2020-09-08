import express, { Request, Response } from 'express';

import Auth from '../controller/auth';

const router = express.Router();

router.post('/login', async function(req: Request, res: Response) {
	const { username, password } = req.body;
	const result = await new Auth().login({ username, password });
	return result.error
		? res.status(<number>result.code).json({ error: result.error })
		: res.cookie('token', result.data).status(<number>result.code).json({ data: result });
});

export default router;
