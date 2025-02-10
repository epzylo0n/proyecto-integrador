import "./Navbar.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // ✅ Importación agregada para validar props

function Navbar({ carrito }) {
  // Contar la cantidad total de productos en el carrito
  const cantidadProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);


  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">Maverick SportWear</h1>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/alta">ABM Producto</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li>
            <Link to="/carrito">
              🛒 Carrito 
              {cantidadProductos > 0 && <span className="carrito-contador">{cantidadProductos}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// ✅ Validar props
Navbar.propTypes = {
  carrito: PropTypes.array.isRequired,
};

export default Navbar;

