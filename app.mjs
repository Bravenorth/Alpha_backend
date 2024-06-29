import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.mjs';
import scrappingEntriesRoutes from './routes/scrappingEntriesRoutes.mjs'; // Import des routes de scrapping
import errorHandler from './middlewares/errorHandler.mjs';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.error('DB connection error:', err));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', scrappingEntriesRoutes); // Utilisation des routes de scrapping

app.use(errorHandler);

export default app;
