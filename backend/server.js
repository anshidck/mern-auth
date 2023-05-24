const express = require('express');
const PORT = process.env.PORT || 5000
const goalRouter = require('./router/goalRouter');
const userRouter = require('./router/userRouter')
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config()
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`server started ${PORT}`)
})