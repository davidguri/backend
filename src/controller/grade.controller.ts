import { GradeRepository } from "../database/repositories/grade.repository";
import Grade from "../models/grade.model";

export class GradeController {
  static async getGrades(): Promise<Grade[] | null> {
    return await GradeRepository.findAll();
  }

  static async getGradesById(id: string): Promise<Grade | null> {
    return await GradeRepository.findById(id);
  }

  static async getGradesByUser(userId: string): Promise<Grade[] | null> {
    return await GradeRepository.findByUser(userId)
  }

  static async getGradesByClass(classId: string): Promise<Grade[] | null> {
    return await GradeRepository.findByClass(classId)
  }

  static async createGrade(gradeModel: Grade): Promise<Grade> {
    return await GradeRepository.saveObject(gradeModel);
  }

  static async updateGrade(id: string, gradeModel: Grade): Promise<void> {
    let grade = await GradeRepository.findById(id);

    if (!grade) {
      throw new Error
    }

    const { id: gradeId, createdAt, ...formatedGradeModel } = gradeModel;

    grade = {
      ...grade,
      ...formatedGradeModel,
    };
  }

  static async deleteGrade(id: string): Promise<void> {
    const grade = await GradeRepository.findById(id);

    if (!grade) {
      throw new Error
    }

    await GradeRepository.removeObject(grade);
  }
}