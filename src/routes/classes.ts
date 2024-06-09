import express, { Request, Response } from "express";
import { ClassController } from "../controller/class.controller";

export const router = express.Router();

router.post('/:id', async (req: Request, res: Response) => {
  try {
    await ClassController.getClassesById(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/university/:id', async (req: Request, res: Response) => {
  try {
    await ClassController.getClassesByUniversity(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/user/:id', async (req: Request, res: Response) => {
  try {
    await ClassController.getClassesByUser(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    await ClassController.getClasses(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    await ClassController.createClass(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await ClassController.updateClass(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await ClassController.deleteClass(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router