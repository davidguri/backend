import { UserRepository } from '../database/repositories/user.repository';
import { ClassRepository } from '../database/repositories/class.repository';
import { UserEntity } from '../database/entities/user.entity';
import User, { Role } from '../models/user.model';
import Department from '../models/department.model';
import { dataSource } from '../typeorm.config';
import { AuthController } from './auth.controller';
import { Request, Response } from 'express';


export class UserController {
  static async getUsers(): Promise<User[] | null> {
    return await UserRepository.findAll()
  }

  static async getUsersById(id: string): Promise<User | null> {
    return await UserRepository.findById(id);
  }

  static async getUsersByUniversity(universityId: string): Promise<User[] | null> {
    return await UserRepository.findByUniversity(universityId)
  }

  static async getUsersByRole(role: string): Promise<User[] | null> {
    return await UserRepository.findByRole(role as Role)
  }

  static async getUsersByDepartment(department: string): Promise<User[] | null> {
    return await UserRepository.findByDepartment(department as Department);
  }

  static async createUser(userModel: User): Promise<string> {
    console.log()
    return await AuthController.registerUser(userModel);
  }

  static async updateUser(id: string, userModel: User): Promise<User> {
    let user = await UserRepository.findById(id);

    if (!user) {
      throw new Error
    }

    const { id: userId, createdAt, ...formatedUserModel } = userModel;

    user = {
      ...user,
      ...formatedUserModel,
    };

    return await UserRepository.saveObject(user);
  }

  static async deleteUser(id: string): Promise<void> {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new Error
    }

    await UserRepository.removeObject(user);
  }

  static async addUserToClass(userId: string, classId: string): Promise<User> {

    const user = await UserRepository.findById(userId);
    const classObj = await ClassRepository.findById(classId);

    if (!user || !classObj) {
      throw new Error
    }

    await dataSource
      .createQueryBuilder()
      .relation(UserEntity, "classes")
      .of(user)
      .add(classObj);

    return user;
  }
}
