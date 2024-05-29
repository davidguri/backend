import { dataSource } from "../typeorm.config";
import { UserEntity } from "../entities/user.entity";

export const UserRepository = dataSource.getRepository(UserEntity);