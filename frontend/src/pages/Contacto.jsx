import { useState } from "react";
import "../styles/contacto.css";

const Contacto = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const validarFormulario = () => {
    let erroresValidacion = {};

    if (formulario.nombre.length < 3) {
      erroresValidacion.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!/^\S+@\S+\.\S+$/.test(formulario.email)) {
      erroresValidacion.email = "Ingrese un correo electrónico válido.";
    }

    if (formulario.mensaje.length < 10) {
      erroresValidacion.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    }

    setErrores(erroresValidacion);

    return Object.keys(erroresValidacion).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      console.log("Mensaje enviado:", formulario);
      setMensajeEnviado(true);
      setFormulario({ nombre: "", email: "", mensaje: "" });
      setErrores({});
    }
  };

  return (
    <div className="contacto_contenedor">
      <h1 className="contacto_titulo">Contacto</h1>
      <p className="contacto_descripcion">¿Tienes alguna consulta o sugerencia? ¡Contáctanos!</p>

      <form onSubmit={handleSubmit} className="contacto_formulario">
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formulario.nombre} onChange={handleChange} />
          {errores.nombre && <p className="contacto_error">{errores.nombre}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formulario.email} onChange={handleChange} />
          {errores.email && <p className="contacto_error">{errores.email}</p>}
        </div>

        <div>
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea id="mensaje" name="mensaje" value={formulario.mensaje} onChange={handleChange}></textarea>
          {errores.mensaje && <p className="contacto_error">{errores.mensaje}</p>}
        </div>

        <button type="submit" className="contacto_boton">Enviar</button>
      </form>

      {mensajeEnviado && <p className="contacto_exito">¡Mensaje enviado con éxito!</p>}
    </div>
  );
};

export default Contacto;
