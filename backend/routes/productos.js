import express from 'express';
import Producto from '../models/Producto.js';

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find().select('-__v');
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Ruta para agregar un producto
router.post('/', async (req, res) => {
  try {
    const nuevoProducto = new Producto({
      nombre: req.body.nombre,
      precio: req.body.precio,
      stock: req.body.stock,
      marca: req.body.marca,
      categoria: req.body.categoria,
      descripcionCorta: req.body.descripcionCorta,
      descripcionLarga: req.body.descripcionLarga,
      foto: req.body.foto || "https://via.placeholder.com/200", // 🔴 Si falta, asigna una por defecto
      envio: req.body.envio
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

// Ruta para eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// Ruta para actualizar un producto por ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(id, updateData, { new: true });

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});



export default router;
