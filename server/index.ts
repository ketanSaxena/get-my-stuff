import express from 'express';
import tripRoutes from './routes/trips';

const app = express();
const PORT = 3000;

app.use('/api/trips', tripRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
