import { Request, Response } from "express";
import { ClassRepository } from "../database/repositories/class.repository";
import { ClassEntity } from "../database/entities/class.entity";
import { ClassMapper } from "../database/mappings/class.mapper";

export class ClassController {
  static async getClasses(req: Request, res: Response): Promise<void> {
    try {
      const classes = await ClassRepository.findAll()
      const classModels = classes.map(ClassMapper.toModel)
      res.status(200).json(classModels)
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getClassesById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const classObj = await ClassRepository.findById(id);
      if (classObj) {
        res.status(200).json(ClassMapper.toModel(classObj))
      } else {
        res.status(404).json({ message: "Class not found :(" })
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  static async createClass(req: Request, res: Response): Promise<void> {
    const classModel = req.body;

    try {
      const classObj = ClassMapper.toEntity(classModel, classModel.users, classModel.university)

      const savedClass = await ClassRepository.saveObject(classObj);
      res.status(201).json(ClassMapper.toModel(savedClass));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
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
      res.status(200).json(ClassMapper.toModel(updatedClass))
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
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}