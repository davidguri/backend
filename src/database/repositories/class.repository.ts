import { dataSource } from "../../typeorm.config";
import { ClassEntity } from "../entities/class.entity";

export const ClassRepository = dataSource.getRepository(ClassEntity).extend({
  findAll(): Promise<ClassEntity[]> {
    return this.find();
  },

  findById(id: string): Promise<ClassEntity | null> {
    return this.findOneBy({ id });
  },

  saveObject(obj: ClassEntity): Promise<ClassEntity> {
    return this.save(obj);
  },

  removeObject(obj: ClassEntity): Promise<ClassEntity> {
    return this.remove(obj);
  },
});