import { dataSource } from "../../typeorm.config";
import { GradeEntity } from "../entities/grade.entity";
import { GradeMapper } from "../mappings/grade.mapper";
import Grade from "../../models/grade.model";

export const GradeRepository = dataSource.getRepository(GradeEntity).extend({
  async findAll(): Promise<Grade[] | null> {
    const result = await this.find({ relations: ['classId', 'userId'] })
    return result;
  },

  async findById(id: string): Promise<GradeEntity | null> {
    return await this.findOneBy({ id });
  },

  async findByUser(userId: string): Promise<Grade[] | null> {
    return (
      await this.find({
        where: {
          userId: userId
        }
      })
    ).map(GradeMapper.toModel)
  },

  async findByClass(classId: string): Promise<Grade[] | null> {
    return (
      await this.find({
        where: {
          classId: classId
        }
      })
    ).map(GradeMapper.toModel)
  },

  async saveObject(obj: Grade): Promise<Grade> {
    const grade = GradeMapper.toEntity(obj)

    return (
      GradeMapper.toModel(await this.save(grade))
    );
  },

  async removeObject(obj: GradeEntity): Promise<GradeEntity> {
    return await this.remove(obj);
  }
});