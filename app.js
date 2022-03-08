import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import apiRouter from './routes/routes.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.static('build'));
app.use('/api', apiRouter);

app.listen(process.env.PORT || 3001, () => {
    console.log("Server running on port 3001");
});