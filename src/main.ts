// src/main.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { dataSource } from './typeorm.config';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

dataSource.initialize()
  .then(() => {
    console.log('Postgres Connection successful');
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Connection failed:', err);
  });
