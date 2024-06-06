import { Request, Response } from 'express';
import { UserRepository } from '../database/repositories/user.repository';
import { UniversityRepository } from '../database/repositories/university.repository';
import { UserEntity } from '../database/entities/user.entity';
import { UserMapper } from '../database/mappings/user.mapper';

export class UserController {
  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserRepository.findAll();
      const userModels = users.map(UserMapper.toModel);
      res.status(200).json(userModels);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUsersById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const user = await UserRepository.findById(id);
      if (user) {
        res.status(200).json(UserMapper.toModel(user));
      } else {
        res.status(404).json({ message: 'User not found :(' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    const userModel = req.body;

    try {
      let university;
      if (userModel.universityId) {
        university = await UniversityRepository.findOneBy({ id: userModel.universityId }); // TODO: Change university repo too
        if (!university) {
          res.status(404).json({ message: 'University not found' });
          return;
        }
      }

      const user = UserMapper.toEntity(userModel);
      if (university) {
        user.university = university;
      }

      const savedUser = await UserRepository.saveObject(user);
      res.status(201).json(UserMapper.toModel(savedUser));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userModel = req.body;

    try {
      const user = await UserRepository.findById(id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      user.name = userModel.name || user.name;
      user.email = userModel.email || user.email;
      user.role = userModel.role || user.role;
      user.department = userModel.department || user.department;
      user.university = userModel.university || user.university;
      user.updatedAt = userModel.updatedAt || user.updatedAt;

      const updatedUser = await UserRepository.saveObject(user);
      res.status(200).json(UserMapper.toModel(updatedUser));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const user = await UserRepository.findById(id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      await UserRepository.removeObject(user);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async setUserUniversity(req: Request, res: Response): Promise<void> {
    const { userId, universityId } = req.body;

    try {
      const user = await UserRepository.findById(userId);
      const university = await UniversityRepository.findOneBy({ id: universityId }); // TODO: Change university repo too

      if (user && university) {
        user.university = university;
        const updatedUser = await UserRepository.saveObject(user);
        res.status(200).json(UserMapper.toModel(updatedUser))
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
      const user = await UserRepository.findOneBy({ id: userId });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      user.university = undefined;
      const updatedUser = await UserRepository.save(user);

      res.status(200).json(UserMapper.toModel(updatedUser));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
