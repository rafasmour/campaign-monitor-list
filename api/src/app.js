import express from 'express';
import subscribersRouter from './routes/subscribers.routes.js';
import cors from 'cors';


const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/subscribers', subscribersRouter);
export default app;