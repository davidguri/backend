import express, { Request, Response, NextFunction } from 'express';
import { UserController } from '../controller/user.controller';
import { CustomError } from '../utils/CustomError';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.getUsersById(req, res);
  } catch (error: any) {
    next(new CustomError('Failed to get users', 404));
  }
});

// router.get('/:role', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     await UserController.getUsersByRole(req, res);
//   } catch (error: any) {
//     next(new CustomError('Failed to get users', 404));
//   }
// });

// router.get('/:department', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     await UserController.getUsersByDepartment(req, res);
//   } catch (error: any) {
//     next(new CustomError('Failed to get users', 404));
//   }
// });
// TODO: these don't work due to type errors ../src/controller/user.contoller.ts

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.getUsers(req, res);
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

router.post('/setUserUniversity', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.setUserUniversity(req, res);
  } catch (error: any) {
    next(new CustomError('Failed to set user university', 500));
  }
});

export default router;
