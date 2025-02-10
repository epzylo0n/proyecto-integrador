import { useState, useEffect } from "react";
import "../styles/agregarProducto.css";

const AgregarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    marca: "",
    categoria: "",
    descripcionCorta: "",
    descripcionLarga: "",
    foto: "",
    envio: false,
  });

  const [productos, setProductos] = useState([]);
  const [errores, setErrores] = useState({});
  const [formValido, setFormValido] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/productos");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setProducto({ ...producto, [name]: newValue });

    validarCampo(name, newValue);
  };

  const validarCampo = (name, value) => {
    let error = "";

    if (name === "nombre" && value.length < 3) {
      error = "Debe tener al menos 3 caracteres.";
    } else if (name === "precio" && (!/^\d+$/.test(value) || value <= 0)) {
      error = "Debe ser un número positivo.";
    } else if (name === "stock" && (!/^\d+$/.test(value) || value < 0)) {
      error = "Debe ser un número mayor o igual a 0.";
    } else if (name === "marca" && value.length < 2) {
      error = "Debe contener al menos 2 caracteres.";
    } else if (name === "descripcionCorta" && value.length > 100) {
      error = "Máximo 100 caracteres.";
    } else if (name === "descripcionLarga" && value.length > 500) {
      error = "Máximo 500 caracteres.";
    } else if (name === "foto" && !/^https?:\/\/.+/.test(value)) {
      error = "Debe ser una URL válida.";
    }

    setErrores((prev) => ({ ...prev, [name]: error }));

    const nuevosErrores = { ...errores, [name]: error };
    setErrores(nuevosErrores);

    const camposRequeridos = { ...producto, [name]: value };
    const sinErrores =
      Object.values(nuevosErrores).every((err) => err === "") &&
      Object.entries(camposRequeridos).every(([key, val]) => key === "envio" || val !== "");

    setFormValido(sinErrores);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValido) return;

    try {
      const response = await fetch("http://localhost:5000/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el producto.");
      }

      alert("Producto agregado exitosamente.");
      obtenerProductos();

      setProducto({
        nombre: "",
        precio: "",
        stock: "",
        marca: "",
        categoria: "",
        descripcionCorta: "",
        descripcionLarga: "",
        foto: "",
        envio: false,
      });
      setErrores({});
      setFormValido(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al agregar el producto.");
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/productos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto.");
      }

      alert("Producto eliminado correctamente.");
      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Hubo un problema al eliminar el producto.");
    }
  };

  const editarProducto = (producto) => {
    if (productoEditado === producto._id) {
      setProducto({
        nombre: "",
        precio: "",
        stock: "",
        marca: "",
        categoria: "",
        descripcionCorta: "",
        descripcionLarga: "",
        foto: "",
        envio: false,
      });
      setProductoEditado(null);
    } else {
      setProducto(producto);
      setProductoEditado(producto._id);
    }
  };

  const guardarEdicion = async () => {
    if (!productoEditado) {
      alert("No se ha seleccionado un producto para editar.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/productos/${productoEditado}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el producto. Código: ${response.status}`);
      }

      alert("Producto actualizado correctamente.");
      setProductoEditado(null);
      obtenerProductos();

      setProducto({
        nombre: "",
        precio: "",
        stock: "",
        marca: "",
        categoria: "",
        descripcionCorta: "",
        descripcionLarga: "",
        foto: "",
        envio: false,
      });
      setErrores({});
      setFormValido(false);
    } catch (error) {
      console.error("Error en la actualización:", error);
      alert("Hubo un problema al actualizar el producto.");
    }
  };

  return (
    <div className="contenedor-principal">
      <div className="form-container">
        <h2 className="titulo-form">{productoEditado ? "Editar Producto" : "Agregar Producto"}</h2>
        <form onSubmit={productoEditado ? guardarEdicion : handleSubmit} className="formulario">
          <input type="text" name="nombre" placeholder="Nombre" value={producto.nombre} onChange={handleChange} />
          {errores.nombre && <p className="error">{errores.nombre}</p>}

          <input type="number" name="precio" placeholder="Precio" value={producto.precio} onChange={handleChange} />
          {errores.precio && <p className="error">{errores.precio}</p>}

          <input type="number" name="stock" placeholder="Stock" value={producto.stock} onChange={handleChange} />
          {errores.stock && <p className="error">{errores.stock}</p>}

          <input type="text" name="marca" placeholder="Marca" value={producto.marca} onChange={handleChange} />
          {errores.marca && <p className="error">{errores.marca}</p>}

          <input type="text" name="categoria" placeholder="Categoría" value={producto.categoria} onChange={handleChange} />
          {errores.categoria && <p className="error">{errores.categoria}</p>}

          <textarea name="descripcionCorta" placeholder="Descripción Corta" value={producto.descripcionCorta} onChange={handleChange} />
          {errores.descripcionCorta && <p className="error">{errores.descripcionCorta}</p>}

          <textarea name="descripcionLarga" placeholder="Descripción Larga" value={producto.descripcionLarga} onChange={handleChange} />
          {errores.descripcionLarga && <p className="error">{errores.descripcionLarga}</p>}

          <input type="text" name="foto" placeholder="URL de la imagen 550x550 px" value={producto.foto} onChange={handleChange} />
          {errores.foto && <p className="error">{errores.foto}</p>}

          <label>
            <input type="checkbox" name="envio" checked={producto.envio} onChange={handleChange} />
            Envío disponible
          </label>

          <button type="submit" className="btn-agregar" disabled={!formValido}>
            {productoEditado ? "Guardar Cambios" : "Agregar"}
          </button>
        </form>
      </div>

      <div className="tabla-container">
        <h2 className="titulo-form">Lista de Productos</h2>
        <table className="productos-table">
          <tbody>
            {productos.map((prod) => (
              <tr key={prod._id}>
                <td>{prod.nombre}</td>
                <td>
                  <button onClick={() => editarProducto(prod)}>
                    {productoEditado === prod._id ? "Cancelar" : "Editar"}
                  </button>
                  <button onClick={() => eliminarProducto(prod._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgregarProducto;