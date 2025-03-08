import colors from 'colors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';

import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import blogRoutes from './routes/blogRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/blogs', blogRoutes); 
app.use('/api/images', imageRoutes);
app.use('/api/uploads', uploadRoutes); 
app.use('/api/users', userRoutes);


const __dirname = path.resolve();

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(favicon(path.join(__dirname, 'client', 'dist', 'logo.png')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`.bold.yellow
    );
});
