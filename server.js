import express from 'express';
import connectDatabase from './config/db';
//import { check, validationResult } from 'express-validator';
import cors from 'cors';
import tasksRoute from './routes/tasks';

// Initialize express
const app = express();

// Connect to database
connectDatabase();

// Middlewares
app.use(express.json({ extended: false })); //handles JSON files
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

// Set up a static folder for front-end
app.use(express.static('public'));


// Routes
app.use('/api/tasks', tasksRoute);


// API endpoints
app.get('/', (req, res) => 
    res.send('http get request sent to root api end point.')
);

// Connection listener
app.listen(3000, () => console.log(`Express server running on port 3000`));