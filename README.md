# 🏆 Maverick SportWear - Ecommerce

Este es un ecommerce de ropa deportiva desarrollado con **React + Vite** en el frontend y **Node.js + Express + MongoDB** en el backend. Se implementa un CRUD de productos y carrito de compras con persistencia en **MongoDB Atlas**.

## 📌 Tecnologías Utilizadas
- **Frontend**: React, Vite, React Router
- **Estilos**: CSS personalizado
- **Backend**: Node.js, Express, MongoDB Atlas
- **Base de Datos**: MongoDB (con Mongoose)
- **API Cliente**: Fetch / Axios
- **Autenticación**: No aplica en esta versión

---

## 🚀 Cómo Levantar el Proyecto

### 🔧 1. Clonar el repositorio
```sh
git clone https://github.com/epzylo0n/proyecto-integrador.git
cd proyecto-integrador

📦 2. Instalar dependencias
Ejecutar estos comandos en dos terminales separadas:

🔹 Backend:
cd backend
npm install

🔹 Frontend:
cd frontend
npm install

🔑 3. Configurar Variables de Entorno
Crear un archivo .env en backend/ con el siguiente contenido

MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/carrito
PORT=5000
💡 No olvides reemplazar <usuario> y <password> con los valores reales de MongoDB Atlas.

▶ 4. Ejecutar el Proyecto
🔹 Levantar el backend (desde backend/):
npm start o npm run dev

🔹 Levantar el frontend (desde frontend/):
npm run dev

Luego, acceder a http://localhost:5173 en el navegador.

🌐 Rutas de la API
📌 Productos
Método	Endpoint	Descripción
GET	/api/productos	Obtiene todos los productos
GET	/api/productos/:id	Obtiene un producto por ID
POST	/api/productos	Agrega un nuevo producto
PUT	/api/productos/:id	Actualiza un producto
DELETE	/api/productos/:id	Elimina un producto
🔹 Ejemplo de JSON para agregar un producto:
{
  "nombre": "Zapatillas Running",
  "precio": 12000,
  "stock": 15,
  "marca": "Nike",
  "categoria": "Calzado",
  "descripcionCorta": "Zapatillas livianas y cómodas",
  "descripcionLarga": "Diseñadas para correr largas distancias con amortiguación avanzada",
  "foto": "https://picsum.photos/200/300",
  "envio": true
}

🛒 Carrito de Compras
Método	Endpoint	Descripción
POST	/api/carrito	Guarda una compra
GET	/api/carrito	Obtiene el historial de compras
🔹 Ejemplo de JSON para enviar una compra:
{
  "productos": [
    {
      "nombre": "Camiseta Deportiva",
      "cantidad": 2,
      "precio": 4500
    },
    {
      "nombre": "Short Deportivo",
      "cantidad": 1,
      "precio": 3500
    }
  ],
  "total": 12500
}

📄 Notas Finales
No se sube el .env al repositorio, por lo que se debe configurar manualmente.
Para instalar dependencias, recuerda usar npm install en ambas carpetas (frontend/ y backend/).
Si necesitas restablecer la base de datos, puedes eliminar los documentos manualmente desde MongoDB Atlas.