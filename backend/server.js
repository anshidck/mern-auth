const express = require('express');
const PORT = process.env.PORT || 5000
const path = require('path')
const goalRouter = require('./router/goalRouter');
const userRouter = require('./router/userRouter')
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config()
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(PORT, () => {
    console.log(`server started ${PORT}`)
})