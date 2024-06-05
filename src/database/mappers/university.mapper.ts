import University from "../../models/university.model";
import { UniversityEntity } from "../entities/university.entity";

export class UniversityMapper {
  static toEntity(model: University): UniversityEntity {
    const university = new UniversityEntity;

    university.id = model.id;
    university.name = model.name;
    university.location = model.location;
    university.createdAt = model.createdAt;
    university.updatedAt = model.updatedAt;

    return university
  }

  static toModel(entity: UniversityEntity): University {
    return {
      id: entity.id,
      name: entity.name,
      location: entity.location,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    }
  }
}