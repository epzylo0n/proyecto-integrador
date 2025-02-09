import { Link } from 'react-router-dom';

function CompraExitosa() {
  return (
    <div style={styles.contenedor}>
      <h1>¡Gracias por tu compra! 🎉</h1>
      <p>Tu pedido ha sido procesado correctamente.</p>
      <Link to="/productos">
        <button style={styles.boton}>Volver a la tienda</button>
      </Link>
    </div>
  );
}

const styles = {
  contenedor: { textAlign: "center", marginTop: "50px" },
  boton: { backgroundColor: "blue", color: "white", border: "none", padding: "10px 20px", fontSize: "16px", cursor: "pointer", marginTop: "20px" }
};

export default CompraExitosa;
