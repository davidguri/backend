import express, { Request, Response } from "express";
import { UniversityController } from "../controller/university.controller";

export const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await UniversityController.getUniversitiesById(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    await UniversityController.getUniversities(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    await UniversityController.createUniversity(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await UniversityController.updateUniversity(req, res);
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