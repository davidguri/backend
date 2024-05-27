import express, { Request, Response } from "express";

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('universities')
});

router.post('/', (req: Request, res: Response) => {
  res.send('add university')
});

router.put('/', (req: Request, res: Response) => {
  res.send('update universities')
});

router.delete('/', (req: Request, res: Response) => {
  res.send('remove university')
});

export default router