import express, { Request, Response, NextFunction } from 'express';
import { UserController } from '../controller/user.controller';
import { CustomError } from '../utils/CustomError';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await UserController.getUsersById(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/university/:university', async (req: Request, res: Response) => {
  try {
    const users = await UserController.getUsersByUniversity(req);
    if (users) {
      res.status(200).json(users)
    } else {
      res.status(404).json({ message: 'User not found :(' })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
});

router.get('/role/:role', async (req: Request, res: Response) => {
  try {
    const users = await UserController.getUsersByRole(req, res);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'User not found :(' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/department/:department', async (req: Request, res: Response) => {
  try {
    const users = await UserController.getUsersByDepartment(req, res);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'User not found :(' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await UserController.getUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    await UserController.createUser(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    await UserController.updateUser(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await UserController.deleteUser(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
