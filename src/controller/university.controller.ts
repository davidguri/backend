import { Request, Response } from "express";
import { UniversityRepository } from "../database/repositories/university.repository";
import { UniversityEntity } from "../database/entities/university.entity";
import { UniversityMapper } from "../database/mappings/university.mapper";

export class UniversityController {
  static async getUniversities(req: Request, res: Response): Promise<void> {
    try {
      const universities = await UniversityRepository.findAll();
      res.json(universities);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUniversitiesById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const university = await UniversityRepository.findById(id);
      if (university) {
        res.json(university);
      } else {
        res.status(404).json({ message: 'University not found :(' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUniversitiesByLocation(req: Request, res: Response): Promise<void> {
    const { location } = req.params;

    try {
      const universities = await UniversityRepository.findByLocation(location);
      if (universities) {
        res.status(200).json(universities);
      } else {
        res.status(404).json({ message: 'Universities not found :(' })
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createUniversity(req: Request, res: Response): Promise<void> {
    const { id, name, location, createdAt, updatedAt } = req.body;

    const university = new UniversityEntity;
    university.id = id;
    university.name = name;
    university.location = location;
    university.createdAt = createdAt;
    university.updatedAt = updatedAt;

    try {
      const savedUniversity = await UniversityRepository.saveObject(university);
      res.status(201).json(savedUniversity);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUniversity(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, location, createdAt, updatedAt } = req.body;

    try {
      const university = await UniversityRepository.findById(id);

      if (!university) {
        res.status(404).json({ message: 'University not found' });
        return;
      }

      university.id = id;
      university.name = name;
      university.location = location;
      university.createdAt = createdAt;
      university.updatedAt = updatedAt;

      const updatedUniversity = await UniversityRepository.saveObject(university);
      res.json(updatedUniversity);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUniversity(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const university = await UniversityRepository.findById(id);

      if (!university) {
        res.status(404).json({ message: "University not found :(" });
        return;
      }

      await UniversityRepository.removeObject(university);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}