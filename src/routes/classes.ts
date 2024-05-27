import express, { Request, Response } from "express";

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('classes')
});

router.post('/', (req: Request, res: Response) => {
  res.send('add class')
});

router.put('/', (req: Request, res: Response) => {
  res.send('update classes')
});

router.delete('/', (req: Request, res: Response) => {
  res.send('remove class')
});

export default router