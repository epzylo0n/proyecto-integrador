import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import CompraExitosa from './pages/CompraExitosa';
import Footer from './components/Footer';
import AgregarProducto from './pages/AgregarProducto';
import './styles/App.css'; // Agregar estilos generales
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";


function App() {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((p) => p._id === producto._id);
      if (existe) {
        return prevCarrito.map((p) =>
          p._id === producto._id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };
  

  return (
    <div className="app-container">
      <Navbar carrito={carrito} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/productos" />} />
          <Route path="/productos" element={<Productos agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/alta" element={<AgregarProducto />} />
          <Route path="/nosotros" element={<Nosotros />} />  
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

