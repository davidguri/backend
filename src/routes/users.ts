import express, { Request, Response } from 'express';
import { UserController } from '../controller/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserController.getUsersById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found :(" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/university/:university', async (req: Request, res: Response) => {
  try {
    const users = await UserController.getUsersByUniversity(req.params.university);
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
    const users = await UserController.getUsersByRole(req.params.role);
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
    const users = await UserController.getUsersByDepartment(req.params.department);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'User not found :(' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const users = await UserController.getUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {

    const savedUser = await UserController.createUser(req.body);
    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserController.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:userId/classes/:classId', async (req: Request, res: Response) => {
  try {
    const user = await UserController.addUserToClass(req.params.userId, req.params.classId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await UserController.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
