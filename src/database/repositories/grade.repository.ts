import { dataSource } from "../../typeorm.config";
import { GradeEntity } from "../entities/grade.entity";

export const GradeRepository = dataSource.getRepository(GradeEntity);