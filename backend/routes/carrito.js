import express from "express";
import Carrito from "../models/Carrito.js"; // Importamos el modelo del carrito

const router = express.Router();

// Ruta para guardar una compra en la base de datos
router.post("/", async (req, res) => {
  try {
    console.log("Datos recibidos en la API:", req.body);
    const { productos } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío." });
    }

    // Calcular el total de la compra
    const total = productos.reduce((acc, prod) => acc + (prod.cantidad * prod.precio), 0);

    // Crear un nuevo carrito en la base de datos
    const nuevoCarrito = new Carrito({
      productos,
      total
    });

    await nuevoCarrito.save(); // Guardamos en MongoDB

    res.status(201).json({ mensaje: "Compra guardada correctamente.", carrito: nuevoCarrito });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la compra en la base de datos." });
  }
});

// Ruta para obtener todas las compras guardadas (Historial de compras)
router.get("/", async (req, res) => {
  try {
    const compras = await Carrito.find().sort({ fechaCompra: -1 }); // Ordenamos por fecha (más reciente primero)
    res.json(compras);
  } catch (error) {
    console.error("Error al guardar la compra:", error);  // Ver log de error
    res.status(500).json({ error: "Error al obtener el historial de compras." });
  }
});

export default router;
