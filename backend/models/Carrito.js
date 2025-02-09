import mongoose from "mongoose";

const CarritoSchema = new mongoose.Schema({
  productos: [
    {
      nombre: String,
      cantidad: Number,
      precio: Number,
      subtotal: Number, // cantidad * precio
    }
  ],
  total: { type: Number, required: true },
  fechaCompra: { type: Date, default: Date.now }
});

const Carrito = mongoose.model("Carrito", CarritoSchema);

export default Carrito;
