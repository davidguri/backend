// src/routes/students.ts
import express, { Request, Response } from 'express';
import { UserController } from '../controller/user.controller';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    await UserController.getUsers(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await UserController.getUsersById(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', (req: Request, res: Response) => {
  res.send('add student');
});

router.put('/', (req: Request, res: Response) => {
  res.send('update students');
});

router.delete('/', (req: Request, res: Response) => {
  res.send('remove student');
});

export default router;
