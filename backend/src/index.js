import './database/index.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(    
    cors({
        origin: [
            'http://localhost:5173',
            'https://tejas-task-manager.vercel.app'
        ],
        methods: ['GET','POST','PUT','DELETE'],
        credentials: true
    })
);

app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);


app.listen(3000 , () => {
    console.log("Listening at http://localhost:3000");
});