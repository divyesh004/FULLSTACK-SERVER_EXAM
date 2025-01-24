const express = require('express');
const app = express();
const connectDB = require('./db');
const cors = require('cors');
const ToDoRouter = require('./routes/to-do');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use("/todo",ToDoRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connectDB;
        console.log('Database connected');
        console.log(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
        console.log('Error connecting to the database', error);
    }
});