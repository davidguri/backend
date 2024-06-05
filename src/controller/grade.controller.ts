import { Request, Response } from "express";
import { GradeRepository } from "../database/repositories/grade.repository";
import { GradeMapper } from "../database/mappings/grade.mapper";

export class GradeController {
  static async getGrades(req: Request, res: Response): Promise<void> {
    try {
      const grades = await GradeRepository.find();
      const gradeModels = grades.map(GradeMapper.toModel);
      res.status(200).json(gradeModels);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getGradesById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const grade = await GradeRepository.findOne({
        where: { id: id }
      });
      if (grade) {
        res.status(200).json(GradeMapper.toModel(grade))
      } else {
        res.status(404).json({ message: "Grade not found :(" })
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  static async createGrade(req: Request, res: Response): Promise<void> {
    const gradeModel = req.body;

    try {
      const grade = GradeMapper.toEntity(gradeModel)

      const savedGrade = await GradeRepository.save(grade);
      res.status(201).json(GradeMapper.toModel(savedGrade));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateGrade(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const gradeModel = req.body;

    try {
      const grade = await GradeRepository.findOneBy({ id });

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
      const grade = await GradeRepository.findOneBy({ id });

      if (!grade) {
        res.status(404).json({ message: "Grade not found :(" });
        return;
      }

      await GradeRepository.remove(grade);
      res.status(200).json({ message: "Grade deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}