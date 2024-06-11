import Grade from "../../models/grade.model";
import { GradeEntity } from "../entities/grade.entity";

export class GradeMapper {
  static toEntity(model: Grade): GradeEntity {
    const grade = new GradeEntity();

    grade.id = model.id;
    grade.grade = model.grade;
    grade.percentage = model.percentage;
    grade.classId = model.classId;
    grade.userId = model.userId;
    grade.createdAt = model.createdAt;
    grade.updatedAt = model.updatedAt;

    return grade;
  }

  static toModel(entity: GradeEntity): Grade {
    return {
      id: entity.id,
      grade: entity.grade,
      percentage: entity.percentage,
      classId: entity.classId,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    }
  }
}