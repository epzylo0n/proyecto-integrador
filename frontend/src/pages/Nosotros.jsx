import "../styles/nosotros.css";

const Nosotros = () => {
  return (
    <div className="nosotros_contenedor">
      <h1 className="nosotros_titulo">Sobre Nosotros</h1>

      <div className="nosotros_tarjetas">
        <div className="nosotros_card">
          <h2 className="nosotros_subtitulo">Nuestra Misión</h2>
          <p>Empoderar a los atletas proporcionando prendas que combinan diseño, durabilidad y tecnología avanzada.</p>
        </div>
        <div className="nosotros_card">
          <h2 className="nosotros_subtitulo">Nuestra Visión</h2>
          <p>Ser la marca líder en ropa deportiva, reconocida por inspirar un estilo de vida activo y saludable.</p>
        </div>
        <div className="nosotros_card">
          <h2 className="nosotros_subtitulo">Nuestros Valores</h2>
          <ul>
            <li><strong>Innovación:</strong> Diseñamos productos con las últimas tecnologías.</li>
            <li><strong>Calidad:</strong> Utilizamos materiales de primera para garantizar la máxima durabilidad.</li>
            <li><strong>Sostenibilidad:</strong> Trabajamos con procesos responsables y respetuosos con el medio ambiente.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
