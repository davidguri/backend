import express, { Request, Response } from "express";

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('grades')
});

router.post('/', (req: Request, res: Response) => {
  res.send('add grade')
});

router.put('/', (req: Request, res: Response) => {
  res.send('update grades')
});

router.delete('/', (req: Request, res: Response) => {
  res.send('remove grade')
});

export default router