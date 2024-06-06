import { dataSource } from "../../typeorm.config";
// import { Repository } from 'typeorm';
import { UserEntity } from "../entities/user.entity";

// export class UserRepository extends Repository<UserEntity> {
//   findOneById(id: string): Promise<UserEntity | null> {
//     return this.findOne({ where: { id } });
//   }

//   findAll(): Promise<UserEntity[]> {
//     return this.find();
//   }

//   saveObject(obj: UserEntity): Promise<UserEntity | undefined> {
//     return this.save(obj);
//   }

//   removeObject(obj: UserEntity): Promise<UserEntity | undefined> {
//     return this.remove(obj);
//   }
// }

export const UserRepository = dataSource.getRepository(UserEntity).extend({
  findAll(): Promise<UserEntity[]> {
    return this.find();
  },

  findById(id: string): Promise<UserEntity | null> {
    return this.findOne({ where: { id } });
  },

  saveObject(obj: UserEntity): Promise<UserEntity> {
    return this.save(obj);
  },

  removeObject(obj: UserEntity): Promise<UserEntity> {
    return this.remove(obj);
  },
})

