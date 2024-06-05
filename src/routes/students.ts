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

router.post('/', async (req: Request, res: Response) => {
  try {
    await UserController.createUser(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await UserController.updateUser(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await UserController.deleteUser(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/setUserUniversity', async (req: Request, res: Response) => {
  try {
    await UserController.setUserUniversity(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
