import express, { Request, Response } from "express";
import { ClassController } from "../controller/class.controller";

export const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const classObj = await ClassController.getClassesById(req.params.id);
    if (classObj) {
      res.status(200).json(classObj);
    } else {
      res.status(404).json({ message: "Class not found :(" })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/university/:id', async (req: Request, res: Response) => {
  try {
    const classes = await ClassController.getClassesByUniversity(req.params.id);
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
    const classes = await ClassController.getClassesByUser(req.params.id);
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
    const savedClass = await ClassController.createClass(req.body);
    res.status(201).json(savedClass);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedClass = await ClassController.updateClass(req.params.id, req.body);
    res.status(200).json(updatedClass)
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await ClassController.deleteClass(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router