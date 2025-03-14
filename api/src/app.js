import express from 'express';
import subscribersRouter from './routes/subscribers.routes.js';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use('/api/subscribers', subscribersRouter);
export default app;