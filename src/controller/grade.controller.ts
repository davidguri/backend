import { Request, Response } from "express";
import { GradeRepository } from "../database/repositories/grade.repository";
import { GradeMapper } from "../database/mappings/grade.mapper";
import Grade from "../models/grade.model";

export class GradeController {
  static async getGrades(): Promise<Grade[] | null> {
    return await GradeRepository.findAll();
  }

  static async getGradesById(req: Request, res: Response): Promise<Grade | null> {
    const { id } = req.params;

    return await GradeRepository.findById(id);
  }

  static async getGradesByUser(req: Request, res: Response): Promise<Grade[] | null> {
    const { userId } = req.params;

    return await GradeRepository.findByUser(userId)
  }

  static async getGradesByClass(req: Request, res: Response): Promise<Grade[] | null> {
    const { classId } = req.params;

    return await GradeRepository.findByClass(classId)
  }

  static async createGrade(req: Request, res: Response): Promise<Grade> {
    const gradeModel = req.body;

    return await GradeRepository.saveObject(gradeModel);
  }

  static async updateGrade(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const gradeModel = req.body;

    const grade = await GradeRepository.findById(id);

    if (!grade) {
      res.status(404).json({ message: "Grade not found :(" });
      return;
    }

    grade.grade = gradeModel.grade || grade.grade
    grade.percentage = gradeModel.percentage || grade.percentage;
    grade.createdAt = gradeModel.createdAt || grade.createdAt;
    grade.updatedAt = gradeModel.updatedAt || grade.updatedAt;
  }

  static async deleteGrade(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const grade = await GradeRepository.findById(id);

    if (!grade) {
      res.status(404).json({ message: "Grade not found :(" });
      return;
    }

    await GradeRepository.removeObject(grade);
  }
}