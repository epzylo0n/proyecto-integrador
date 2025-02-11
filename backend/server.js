import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import productosRoutes from './routes/productos.js';
import carritoRoutes from './routes/carrito.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir el frontend desde "public/dist"
app.use(express.static(path.resolve('public/dist')));

// Rutas API
app.use('/api/productos', productosRoutes);
app.use('/api/carrito', carritoRoutes);

// Manejar cualquier otra ruta para devolver el frontend
app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/dist', 'index.html'));
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Conectado'))
  .catch(err => console.error('❌ Error en conexión MongoDB:', err));

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
