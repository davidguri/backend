import { dataSource } from "../../typeorm.config";
import { GradeEntity } from "../entities/grade.entity";

export const GradeRepository = dataSource.getRepository(GradeEntity).extend({
  findAll(): Promise<GradeEntity[]> {
    return this.find();
  },

  findById(id: string): Promise<GradeEntity | null> {
    return this.findOneBy({ id });
  },

  saveObject(obj: GradeEntity): Promise<GradeEntity> {
    return this.save(obj);
  },

  removeObject(obj: GradeEntity): Promise<GradeEntity> {
    return this.remove(obj);
  }
});