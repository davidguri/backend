import { dataSource } from "../../typeorm.config";
import { ClassEntity } from "../entities/class.entity";

export const ClassRepository = dataSource.getRepository(ClassEntity).extend({
  findAll(): Promise<ClassEntity[]> {
    return this.find({ relations: ['university', 'users'] });
  },

  findById(id: string): Promise<ClassEntity | null> {
    return this.findOne({ where: { id }, relations: ['university', 'users'] });
  },

  saveObject(obj: ClassEntity): Promise<ClassEntity> {
    return this.save(obj);
  },

  removeObject(obj: ClassEntity): Promise<ClassEntity> {
    return this.remove(obj);
  },
});