import { Request, Response } from 'express';
import { UserRepository } from '../database/repositories/user.repository';
import { UniversityRepository } from '../database/repositories/university.repository';
import { UserEntity } from '../database/entities/user.entity';
import { UserMapper } from '../database/mappings/user.mapper';
import { Role } from '../models/user.model';
import Department from '../models/department.model';
import User from '../models/user.model';

export class UserController {
  static async getUsers(): Promise<User[] | null> {
    return await UserRepository.findAll()
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

  static async getUsersByUniversity(req: Request): Promise<User[] | null> {
    const { universityId } = req.params

    return await UserRepository.findByUniversity(universityId)
  }

  static async getUsersByRole(req: Request, res: Response): Promise<User[] | null> {
    const { role } = req.params;

    return await UserRepository.findByRole(role as Role)
  }

  static async getUsersByDepartment(req: Request, res: Response): Promise<User[] | null> {
    const { department } = req.params;

    return await UserRepository.findByDepartment(department as Department);
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    const userModel = req.body;

    try {
      let university;
      if (userModel.universityId) {
        university = await UniversityRepository.findOneBy({ id: userModel.universityId });
        if (!university) {
          res.status(404).json({ message: 'University not found' });
          return;
        }
      }

      const user = UserMapper.toEntity(userModel, userModel.classes, userModel.universityId);
      if (university) {
        user.university = university;
      }

      const savedUser = await UserRepository.saveObject(user);
      res.status(201).json(savedUser);
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
      res.status(200).json(updatedUser);
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
}
