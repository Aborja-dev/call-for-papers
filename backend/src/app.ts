import express from 'express';
import cors from 'cors';
import userRoute from "@src/routes/user";
import eventRoute from "@src/routes/event";
export const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', userRoute);
app.use('/event', eventRoute);
app.get('/', (req, res) => {
    res.json({message:'Hello, World !'});
});

