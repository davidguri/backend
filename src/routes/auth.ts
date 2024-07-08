import express, { Request, Response } from 'express';
import { AuthController } from "../controller/auth.controller";

const router = express.Router();

// router.post('/register', (req: Request, res: Response) => AuthController.registerUser(req, res));
router.post('/login', (req: Request, res: Response) => AuthController.loginUser(req, res));

export default router;
