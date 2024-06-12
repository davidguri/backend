import { Request, Response } from "express";
import { GradeRepository } from "../database/repositories/grade.repository";
import { GradeMapper } from "../database/mappings/grade.mapper";
import Grade from "../models/grade.model";

export class GradeController {
  static async getGrades(): Promise<Grade[] | null> {
    return await GradeRepository.findAll();
  }

  static async getGradesById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const grade = await GradeRepository.findById(id);
      if (grade) {
        res.status(200).json(GradeMapper.toModel(grade))
      } else {
        res.status(404).json({ message: "Grade not found :(" })
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getGradesByUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    try {
      const grades = await GradeRepository.findByUser(userId)
      if (grades) {
        res.status(200).json(grades)
      } else {
        res.status(404).json({ message: "Grades not found :(" })
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getGradesByClass(req: Request, res: Response): Promise<void> {
    const { classId } = req.params;

    try {
      const grades = await GradeRepository.findByClass(classId)
      if (grades) {
        res.status(200).json(grades)
      } else {
        res.status(404).json({ message: "Grades not found :(" })
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  static async createGrade(req: Request, res: Response): Promise<void> {
    const grade = req.body;

    console.log(grade);

    try {
      const savedGrade = await GradeRepository.saveObject(grade);
      res.status(201).json(savedGrade);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateGrade(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const gradeModel = req.body;

    try {
      const grade = await GradeRepository.findById(id);

      if (!grade) {
        res.status(404).json({ message: "Grade not found :(" });
        return;
      }

      grade.grade = gradeModel.grade || grade.grade
      grade.percentage = gradeModel.percentage || grade.percentage;
      grade.createdAt = gradeModel.createdAt || grade.createdAt;
      grade.updatedAt = gradeModel.updatedAt || grade.updatedAt;
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  static async deleteGrade(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const grade = await GradeRepository.findById(id);

      if (!grade) {
        res.status(404).json({ message: "Grade not found :(" });
        return;
      }

      await GradeRepository.removeObject(grade);
      res.status(200).json({ message: "Grade deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}