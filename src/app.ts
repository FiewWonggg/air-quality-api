import express from 'express';
import locationRoutes from './routes/location.routes';
import measurementRoutes from './routes/measurement.routes';

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.use('/api/locations', locationRoutes);
app.use('/api/measurements', measurementRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});