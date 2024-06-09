import express, { Request, Response } from "express";
import { GradeController } from "../controller/grade.controller";

export const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await GradeController.getGradesById(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:id', async (req: Request, res: Response) => {
  try {
    await GradeController.getGradesByUser(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/class/:id', async (req: Request, res: Response) => {
  try {
    await GradeController.getGradesByClass(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    await GradeController.getGrades(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    await GradeController.createGrade(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    await GradeController.updateGrade(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    await GradeController.deleteGrade(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router