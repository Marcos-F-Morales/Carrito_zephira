// src/config/database.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necesario para Neon
    },
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado exitosamente a la base de datos PostgreSQL (Neon)");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error.message);
    console.error("Detalles:", error);
    throw error;
  }
};
