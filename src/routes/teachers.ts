import express, { Request, Response } from "express";

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('teachers')
});

router.post('/', (req: Request, res: Response) => {
  res.send('add teacher')
});

router.put('/', (req: Request, res: Response) => {
  res.send('update teachers')
});

router.delete('/', (req: Request, res: Response) => {
  res.send('remove teacher')
});

export default router