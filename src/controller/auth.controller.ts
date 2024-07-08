import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { Request, Response } from 'express';
import { UserRepository } from '../database/repositories/user.repository';
import { UserEntity } from '../database/entities/user.entity';
import User from '../models/user.model';


export class AuthController {
  private static saltRounds = 10;
  public static jwt_secret = process.env.JWT_SECRET || "jwt_secret"

  static async hash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds)
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, hash);
      return match
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static genToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, this.jwt_secret, { expiresIn: "1h" })
    return token
  }

  static async registerUser(userModel: User): Promise<string> {
    try {
      const hashedPassword = await this.hash(userModel.password);
      const newUser = new UserEntity();
      newUser.name = userModel.name;
      newUser.email = userModel.email;
      newUser.password = hashedPassword;
      newUser.role = userModel.role;
      newUser.department = userModel.department;

      const savedUser = await UserRepository.saveObject(newUser);
      const token = this.genToken(savedUser);
      return token;
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await UserRepository.findOne({ where: { email } })

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const match = await this.compare(password, user.password)

      if (!match) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const token = this.genToken(user);
      res.status(200).json({ user, token });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}