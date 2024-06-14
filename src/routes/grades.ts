import express, { Request, Response } from "express";
import { GradeController } from "../controller/grade.controller";

export const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const grade = await GradeController.getGradesById(req.params.id);
    if (grade) {
      res.status(200).json(grade)
    } else {
      res.status(404).json({ message: "Grade not found :(" })
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const grades = await GradeController.getGradesByUser(req.params.id);
    if (grades) {
      res.status(200).json(grades)
    } else {
      res.status(404).json({ message: "Grades not found :(" })
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/class/:id', async (req: Request, res: Response) => {
  try {
    const grades = await GradeController.getGradesByClass(req.params.id);
    if (grades) {
      res.status(200).json(grades)
    } else {
      res.status(404).json({ message: "Grades not found :(" })
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const grades = await GradeController.getGrades();
    res.status(200).json({ grades });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const savedGrade = await GradeController.createGrade(req.body);
    res.status(201).json(savedGrade);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await GradeController.updateGrade(req.params.id, req.body);
    res.status(200).json({ message: "Grade updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await GradeController.deleteGrade(req.params.id);
    res.status(200).json({ message: "Grade deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router