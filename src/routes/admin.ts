import express, { Request, Response } from "express";

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('admin')
});

router.put('/', (req: Request, res: Response) => {
  res.send('update admin')
});

export default router