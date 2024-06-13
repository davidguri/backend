import { Request, Response } from 'express';
import { UserRepository } from '../database/repositories/user.repository';
import { UniversityRepository } from '../database/repositories/university.repository';
import { ClassRepository } from '../database/repositories/class.repository';
import { UserEntity } from '../database/entities/user.entity';
import { UserMapper } from '../database/mappings/user.mapper';
import { Role } from '../models/user.model';
import Department from '../models/department.model';
import User from '../models/user.model';
import { dataSource } from '../typeorm.config';


export class UserController {
  static async getUsers(): Promise<User[] | null> {
    return await UserRepository.findAll()
  }

  static async getUsersById(req: Request): Promise<User | null> {
    const { id } = req.params;

    return await UserRepository.findById(id);
  }

  static async getUsersByUniversity(req: Request): Promise<User[] | null> {
    const { universityId } = req.params

    return await UserRepository.findByUniversity(universityId)
  }

  static async getUsersByRole(req: Request): Promise<User[] | null> {
    const { role } = req.params;

    return await UserRepository.findByRole(role as Role)
  }

  static async getUsersByDepartment(req: Request): Promise<User[] | null> {
    const { department } = req.params;

    return await UserRepository.findByDepartment(department as Department);
  }

  static async createUser(req: Request, res: Response): Promise<User> {
    const userModel = req.body;

    return await UserRepository.saveObject(userModel);
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
      user.universityId = userModel.university || user.universityId;
      user.updatedAt = userModel.updatedAt || user.updatedAt;

      const updatedUser = await UserRepository.saveObject(user);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await UserRepository.findById(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await UserRepository.removeObject(user);
  }

  static async addUserToClass(req: Request, res: Response): Promise<User | void> {
    const { userId, classId } = req.params;

    const user = await UserRepository.findById(userId);
    const classObj = await ClassRepository.findById(classId);

    if (!user || !classObj) {
      res.status(404).json({ message: "User or Class not found :(" })
      return;
    }

    await dataSource
      .createQueryBuilder()
      .relation(UserEntity, "classes")
      .of(user)
      .add(classObj);

    return user;
  }
}
