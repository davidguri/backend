import express, { Request, Response } from "express";
import { ClassController } from "../controller/class.controller";

export const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await ClassController.getClassesById(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/university/:id', async (req: Request, res: Response) => {
  try {
    const classes = await ClassController.getClassesByUniversity(req, res);
    if (classes) {
      res.status(200).json(classes);
    } else {
      res.status(404).json({ message: "Class not found :(" })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const classes = await ClassController.getClassesByUser(req, res);
    if (classes) {
      res.status(200).json(classes);
    } else {
      res.status(404).json({ message: "Class not found :(" })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const classes = await ClassController.getClasses();
    res.status(200).json(classes)
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