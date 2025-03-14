import express from 'express';
import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
})

const PORT = process.env.BACKEND_PORT || 3000;
const app = express();
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});