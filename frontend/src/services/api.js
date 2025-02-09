import axios from 'axios';

const API_URL = 'http://localhost:5000/api/productos';

export const obtenerProductos = async () => {
  try {
    const respuesta = await axios.get(API_URL);
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export const agregarProducto = async (producto) => {
    try {
      const respuesta = await axios.post(API_URL, producto, {
        headers: { 'Content-Type': 'application/json' },
      });
      return respuesta.data;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      return null;
    }
  };

  export const enviarCarrito = async (carrito) => {
    try {
      const respuesta = await axios.post("http://localhost:5000/api/carrito", { productos: carrito }, {
        headers: { 'Content-Type': 'application/json' }
      });
      return respuesta.data;
    } catch (error) {
      console.error('Error al finalizar compra:', error);
      return null;
    }
  };
  
  