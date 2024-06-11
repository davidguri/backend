import Grade from "../../models/grade.model";
import { GradeEntity } from "../entities/grade.entity";
import { ClassEntity } from "../entities/class.entity";
import { UserEntity } from "../entities/user.entity";

export class GradeMapper {
  static toEntity(model: Grade, classObj: ClassEntity, user: UserEntity): GradeEntity {
    const grade = new GradeEntity();

    grade.id = model.id;
    grade.grade = model.grade;
    grade.percentage = model.percentage;
    grade.class = classObj;
    grade.user = user;
    grade.createdAt = model.createdAt;
    grade.updatedAt = model.updatedAt;

    return grade;
  }

  static toModel(entity: GradeEntity): Grade {
    return {
      id: entity.id,
      grade: entity.grade,
      percentage: entity.percentage,
      class: entity.class.id,
      user: entity.user.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    }
  }
}