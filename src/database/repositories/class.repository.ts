import { dataSource } from "../../typeorm.config";
import { ClassEntity } from "../entities/class.entity";

export const ClassRepository = dataSource.getRepository(ClassEntity);