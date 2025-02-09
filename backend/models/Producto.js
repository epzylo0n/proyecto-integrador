import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  stock: Number,
  marca: String,
  categoria: String,
  descripcionCorta: String,
  descripcionLarga: String,
  foto: String, 
  envio: Boolean
}); 

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;
