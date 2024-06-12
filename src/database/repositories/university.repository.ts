import { dataSource } from "../../typeorm.config";
import { UniversityEntity } from "../entities/university.entity";
import { UniversityMapper } from "../mappings/university.mapper";

export const UniversityRepository = dataSource.getRepository(UniversityEntity).extend({
  async findAll(): Promise<UniversityEntity[] | null> {
    return (await this.find({ relations: ['users', 'classes'] }))?.map(UniversityMapper.toModel);
  },

  async findById(id: string): Promise<UniversityEntity | null> {
    return await this.findOneBy({ id });
  },

  async findByLocation(location: string): Promise<UniversityEntity[] | null> {
    return (
      (await this.findBy({ location: location }))?.map(UniversityMapper.toModel)
    );
  },

  async saveObject(obj: UniversityEntity): Promise<UniversityEntity> {
    return await this.save(obj);
  },

  async removeObject(obj: UniversityEntity): Promise<UniversityEntity> {
    return await this.remove(obj);
  },
});