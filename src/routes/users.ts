import express, { Request, Response, NextFunction } from 'express';
import { UserController } from '../controller/user.controller';
import { CustomError } from '../utils/CustomError';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.getUsersById(req, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/university/:university', async (req: Request, res: Response, next: NextFunction) => {
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

router.get('/role/:role', async (req: Request, res: Response, next: NextFunction) => {
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

router.get('/department/:department', async (req: Request, res: Response, next: NextFunction) => {
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

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserController.getUsers();
    res.status(200).json(users);
  } catch (error: any) {
    next(new CustomError('Failed to get users', 500));
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.createUser(req, res);
  } catch (error: any) {
    next(new CustomError('Failed to create user', 500));
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.updateUser(req, res);
  } catch (error: any) {
    next(new CustomError('Failed to update user', 500));
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.deleteUser(req, res);
  } catch (error: any) {
    next(new CustomError('Failed to delete user', 500));
  }
});

export default router;
