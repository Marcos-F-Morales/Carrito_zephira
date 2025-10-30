// config/database.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Parsea el puerto a número
const dbPort = parseInt(process.env.PORT, 10) || 5432;

// Configuración de Sequelize para Neon con SSL
export const sequelize = new Sequelize(
  process.env.DB,        // Nombre de la base de datos
  process.env.USER,      // Usuario
  process.env.PASSWORD,  // Contraseña
  {
    host: process.env.HOST,
    port: dbPort,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necesario para Neon
      },
    },
  }
);

// Función para probar la conexión
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos PostgreSQL (Neon)");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
};
