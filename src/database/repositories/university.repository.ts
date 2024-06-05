import { dataSource } from "../../typeorm.config";
import { UniversityEntity } from "../entities/university.entity";

export const UniversityRepository = dataSource.getRepository(UniversityEntity);