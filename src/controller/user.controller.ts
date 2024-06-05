import { Request, Response } from 'express';
import { UserRepository } from '../database/repositories/user.repository';
import { UniversityRepository } from '../database/repositories/university.repository';
import { UserEntity } from '../database/entities/user.entity';

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

  static async createUser(req: Request, res: Response): Promise<void> {
    const { id, name, email, universityId, role, department, createdAt, updatedAt } = req.body;

    try {

      const user = new UserEntity;
      user.id = id;
      user.name = name;
      user.email = email;
      user.role = role;
      user.department = department;
      user.createdAt = createdAt;
      user.updatedAt = updatedAt;

      if (universityId) {
        const university = await UniversityRepository.findOneBy({ id: universityId });

        if (!university) {
          res.status(404).json({ message: 'University not found :(' });
          return;
        }

        user.university = university
      }

      const savedUser = await UserRepository.save(user);
      res.status(201).json(savedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email, role, department, createdAt, updatedAt } = req.body;

    try {
      const user = await UserRepository.findOneBy({ id });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      user.id = id;
      user.name = name;
      user.email = email;
      user.role = role;
      user.department = department;
      user.createdAt = createdAt;
      user.updatedAt = updatedAt;

      const updatedUser = await UserRepository.save(user);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const user = await UserRepository.findOneBy({ id });

      if (!user) {
        res.status(404).json({ message: "User not found :(" });
        return;
      }

      await UserRepository.remove(user);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  static async setUserUniversity(req: Request, res: Response): Promise<void> {
    const { userId, universityId } = req.body;

    try {
      const user = await UserRepository.findOneBy({ id: userId });
      const university = await UniversityRepository.findOneBy({ id: universityId });

      if (user && university) {
        user.university = university;
        await UserRepository.save(user);
        res.status(200).send()
      } else {
        res.status(404).json({ message: "User or University not found :(" })
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removeUserUniversity(req: Request, res: Response): Promise<void> {
    const { userId } = req.body;

    try {
      const user = await UserRepository.findOne({
        where: { id: userId },
        relations: ['university']
      });

      if (user) {
        user.university = null;
        await UserRepository.save(user);
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found :(' });
      }

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
