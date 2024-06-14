import express, { Request, Response } from "express";
import { UniversityController } from "../controller/university.controller";

export const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const university = await UniversityController.getUniversitiesById(req.params.id);

    if (university) {
      res.json(university)
    } else {
      res.status(404).json({ message: 'University not found :(' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/location/:location', async (req: Request, res: Response) => {
  try {
    const universities = await UniversityController.getUniversitiesByLocation(req.params.location);

    if (universities) {
      res.status(200).json(universities);
    } else {
      res.status(404).json({ message: 'Universities not found :(' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/', async (req: Request, res: Response) => {
  try {
    const universities = await UniversityController.getUniversities();
    res.status(200).json({ universities })
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const savedUniversity = await UniversityController.createUniversity(req.body);
    res.status(201).json({ savedUniversity })
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedUniversity = await UniversityController.updateUniversity(req.params.id, req.body);
    res.status(200).json({ message: "University updated successfully" })
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await UniversityController.deleteUniversity(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router