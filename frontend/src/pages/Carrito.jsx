import { useEffect } from 'react';
import { enviarCarrito } from '../services/api';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import "../styles/carrito.css";

function Carrito({ carrito, setCarrito }) {
  useEffect(() => {
    console.log("Carrito actualizado:", carrito);
  }, [carrito]);

  // Agrupar productos por ID sumando sus cantidades
  const carritoAgrupado = carrito.reduce((acc, producto) => {
    const existe = acc.find((p) => p._id === producto._id);
    if (existe) {
      existe.cantidad += 1;
    } else {
      acc.push({ ...producto, cantidad: 1 });
    }
    return acc;
  }, []);

  const modificarCantidad = (id, nuevaCantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto._id === id ? { ...producto, cantidad: Math.max(1, nuevaCantidad) } : producto
      )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto._id !== id));
  };

  const calcularTotal = () => {
    return carritoAgrupado.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  };

  const navigate = useNavigate();

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const confirmado = window.confirm("¿Deseas finalizar la compra?");
    if (confirmado) {
      console.log("Enviando carrito a la API:", carrito);

      const productosConCantidad = carrito.map(prod => ({
        _id: prod._id,
        nombre: prod.nombre,
        precio: prod.precio,
        cantidad: prod.cantidad || 1,
      }));

      const respuesta = await enviarCarrito(productosConCantidad);

      if (respuesta) {
        alert("Compra realizada con éxito.");
        setCarrito([]);
        localStorage.removeItem("carrito");
        navigate("/compra-exitosa");
      } else {
        alert("Error al procesar la compra.");
      }
    }
  };

  return (
    <div className="carrito-contenedor">
      <h1 className="carrito-titulo">Carrito de Compras</h1>

      {carritoAgrupado.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="carrito-productos">
          {carritoAgrupado.map((producto) => (
            <div key={producto._id} className="carrito-card">
              <img src={producto.foto || "https://via.placeholder.com/100"} alt={producto.nombre} className="carrito-imagen" />
              <div className="carrito-info">
                <h3>{producto.nombre}</h3>
                <p className="carrito-descripcion">{producto.descripcionCorta}</p>

                <div className="carrito-controles">
                  <button onClick={() => eliminarDelCarrito(producto._id)} className="carrito-eliminar">Eliminar</button>
                </div>

                <div className="carrito-precio">
                  <span className="carrito-descuento">-27% </span>
                  <span className="carrito-precio-original">${(producto.precio * 1.37).toFixed(2)}</span>
                  <h2 className="carrito-precio-final">${producto.precio}</h2>
                </div>

                <select 
                  className="carrito-select" 
                  value={producto.cantidad} 
                  onChange={(e) => modificarCantidad(producto._id, Number(e.target.value))}
                >
                  {[...Array(10).keys()].map(num => (
                    <option key={num + 1} value={num + 1}>{num + 1} u.</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {carrito.length > 0 && (
        <div className="carrito-total">
          <h2>Total: ${calcularTotal().toFixed(2)}</h2>
          <button onClick={finalizarCompra} className="carrito-finalizar">Finalizar Compra</button>
        </div>
      )}
    </div>
  );
}

Carrito.propTypes = {
  carrito: PropTypes.array.isRequired,
  setCarrito: PropTypes.func.isRequired,
};

export default Carrito;
