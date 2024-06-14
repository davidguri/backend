import { Request, Response } from "express";
import { ClassRepository } from "../database/repositories/class.repository";
import { ClassEntity } from "../database/entities/class.entity";
import { ClassMapper } from "../database/mappings/class.mapper";
import Class from "../models/class.model";

export class ClassController {
  static async getClasses(): Promise<Class[] | null> {
    return await ClassRepository.findAll()
  }

  static async getClassesById(id: string): Promise<Class | null> {
    return await ClassRepository.findById(id);
  }

  static async getClassesByUniversity(universityId: string): Promise<Class[] | null> {
    return ClassRepository.findByUniversity(universityId);
  }

  static async getClassesByUser(userId: string): Promise<Class[] | null> {
    return ClassRepository.findByUser(userId);
  }

  static async createClass(classModel: Class): Promise<Class> {
    return await ClassRepository.saveObject(classModel);
  }

  static async updateClass(id: string, classModel: Class): Promise<Class> {
    let classObj = await ClassRepository.findById(id);

    if (!classObj) {
      throw new Error
    }

    const { id: classId, createdAt, ...formatedClassModel } = classObj;

    classObj = {
      ...classObj,
      ...formatedClassModel,
    };

    classObj.name = classModel.name || classObj.name;
    classObj.department = classModel.department || classObj.department;
    classObj.updatedAt = classModel.updatedAt || classObj.updatedAt;

    return await ClassRepository.saveObject(classObj);
  }

  static async deleteClass(id: string): Promise<void> {
    const classObj = await ClassRepository.findById(id);

    if (!classObj) {
      throw new Error
    }

    await ClassRepository.removeObject(classObj);
  }
}