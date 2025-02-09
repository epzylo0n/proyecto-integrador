import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/api";
import PropTypes from "prop-types";
import "../styles/productos.css";

function Productos({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({
    nombre: "",
    categoria: "",
    precioMin: "",
    precioMax: ""
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {
    const data = await obtenerProductos();
    setProductos(data);
  }

  function manejarAgregar(producto) {
    agregarAlCarrito(producto);
    alert(`${producto.nombre} agregado al carrito`);
  }

  function handleFiltroChange(e) {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  }

  function aplicarFiltros() {
    return productos.filter(producto => {
      const cumpleNombre = filtros.nombre === "" || producto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
      const cumpleCategoria = filtros.categoria === "" || producto.categoria === filtros.categoria;
      const cumplePrecioMin = filtros.precioMin === "" || producto.precio >= parseFloat(filtros.precioMin);
      const cumplePrecioMax = filtros.precioMax === "" || producto.precio <= parseFloat(filtros.precioMax);
      return cumpleNombre && cumpleCategoria && cumplePrecioMin && cumplePrecioMax;
    });
  }

  return (
    <div>
      <h1 className="productos-titulo">Productos</h1>
      <div className="productos-container">
        <div className="productos-grid">
          {aplicarFiltros().map((producto) => (
            <div key={producto._id} className="producto-card">
              <img src={producto.foto || "https://via.placeholder.com/200"} alt={producto.nombre} className="producto-imagen" />
              <div className="producto-info">
                <h3 className="producto-nombre">{producto.nombre}</h3>
                <p className="producto-descripcion">{producto.descripcionCorta}</p>
                <p className="producto-precio">${producto.precio}</p>
                {producto.envio && <p className="producto-envio">🚚 Envío Gratis</p>}
                <button className="producto-boton" onClick={() => manejarAgregar(producto)}>Agregar al Carrito</button>
              </div>
            </div>
          ))}
        </div>

        <div className="barra-busqueda">
          <h3>Buscar Productos</h3>
          <input
            type="text"
            name="nombre"
            placeholder="Buscar por nombre"
            value={filtros.nombre}
            onChange={handleFiltroChange}
          />
          <input
            type="text"
            name="categoria"
            placeholder="Buscar por categoría"
            value={filtros.categoria}
            onChange={handleFiltroChange}
          />
          <input
            type="number"
            name="precioMin"
            placeholder="Precio mínimo"
            value={filtros.precioMin}
            onChange={handleFiltroChange}
          />
          <input
            type="number"
            name="precioMax"
            placeholder="Precio máximo"
            value={filtros.precioMax}
            onChange={handleFiltroChange}
          />
          <button onClick={aplicarFiltros}>Aplicar Filtros</button>
        </div>
      </div>
    </div>
  );
}

Productos.propTypes = {
  agregarAlCarrito: PropTypes.func.isRequired,
};

export default Productos;