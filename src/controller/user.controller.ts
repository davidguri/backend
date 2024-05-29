// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository';

export class UserController {
  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserRepository.find();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUsersById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await UserRepository.findOneBy({ id });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
