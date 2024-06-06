import { dataSource } from "../../typeorm.config";
import { UniversityEntity } from "../entities/university.entity";

export const UniversityRepository = dataSource.getRepository(UniversityEntity).extend({
  findAll(): Promise<UniversityEntity[]> {
    return this.find();
  },

  findById(id: string): Promise<UniversityEntity | null> {
    return this.findOneBy({ id });
  },

  findByLocation(location: string): Promise<UniversityEntity[] | null> {
    return this.findBy({ location: location });
  },

  saveObject(obj: UniversityEntity): Promise<UniversityEntity> {
    return this.save(obj);
  },

  removeObject(obj: UniversityEntity): Promise<UniversityEntity> {
    return this.remove(obj);
  },
});