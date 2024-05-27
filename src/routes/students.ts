import express, { Request, Response } from "express";
import { UserController } from "../controller/user.controller";

export const router = express.Router();

router.get('/', (req: Request, res: Response, next) => {
  const users = UserController.getUsers()
  res.status(200).json(users);
  next();
});

router.get('/:id', (req: Request, res: Response, next) => {
  const { id } = req.params
  const users = UserController.getUsersById(id)
  res.status(200).json(users);
  next();
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

export default router