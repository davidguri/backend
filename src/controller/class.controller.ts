import { Request, Response } from "express";
import { ClassRepository } from "../database/repositories/class.repository";
import { ClassEntity } from "../database/entities/class.entity";
import { ClassMapper } from "../database/mappings/class.mapper";
import Class from "../models/class.model";

export class ClassController {
  static async getClasses(): Promise<Class[] | null> {
    return await ClassRepository.findAll()
  }

  static async getClassesById(req: Request, res: Response): Promise<Class | null> {
    const { id } = req.params;

    return await ClassRepository.findById(id);
  }

  static async getClassesByUniversity(req: Request, res: Response): Promise<Class[] | null> {
    const { universityId } = req.params;

    return ClassRepository.findByUniversity(universityId);
  }

  static async getClassesByUser(req: Request, res: Response): Promise<Class[] | null> {
    const { userId } = req.params;

    return ClassRepository.findByUser(userId);
  }

  static async createClass(req: Request, res: Response): Promise<Class> {
    const classModel = req.body;

    return await ClassRepository.saveObject(classModel);
  }

  static async updateClass(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const classModel = req.body;

    try {
      const classObj = await ClassRepository.findById(id);

      if (!classObj) {
        res.status(404).json({ message: "Class not found :(" });
        return;
      }

      classObj.name = classModel.name || classObj.name;
      classObj.department = classModel.department || classObj.department;
      classObj.updatedAt = classModel.updatedAt || classObj.updatedAt;

      const updatedClass = await ClassRepository.saveObject(classObj);
      res.status(200).json(updatedClass)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  static async deleteClass(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const classObj = await ClassRepository.findById(id);

      if (!classObj) {
        res.status(404).json({ message: "Class not found L(" })
        return;
      }

      await ClassRepository.removeObject(classObj);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}