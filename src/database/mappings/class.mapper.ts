import Class from "../../models/class.model";
import { ClassEntity } from "../entities/class.entity";

export class ClassMapper {
  static toEntity(model: Class): ClassEntity {
    const classObj = new ClassEntity;

    classObj.id = model.id;
    classObj.name = model.name;
    classObj.department = model.department;
    classObj.createdAt = model.createdAt;
    classObj.updatedAt = model.updatedAt;

    return classObj;
  }

  static toModel(entity: ClassEntity): Class {
    return {
      id: entity.id,
      name: entity.name,
      department: entity.department,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    }
  }
}