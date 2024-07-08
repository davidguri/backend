import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserEntity } from '../database/entities/user.entity';

const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';

interface CustomRequest extends Request {
  user?: UserEntity;
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = user as UserEntity;
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
