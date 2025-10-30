import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./src/config/database.js"; // Asegúrate de exportar sequelize
import { FavoritesRoute } from "./src/routes/favorites.route.js";
import { ShoppingbagRoute } from "./src/routes/shoppingBag.route.js";
import { swaggerDocs } from "./src/swagger/swagger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar y sincronizar BD
const startServer = async () => {
  try {
    // 1. Conectar a la base de datos
    await connectDB();
    
    // 2. Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ force: false });
    console.log('✅ Tablas sincronizadas con la base de datos');
    
    // 3. Configurar rutas
    FavoritesRoute(app);
    ShoppingbagRoute(app);
    swaggerDocs(app);
    
    // 4. Iniciar servidor
    const PORT = process.env.APP_PORT || 4002;
    app.listen(PORT, () => console.log(`✅ Favorites-ShoppingBag Service en puerto ${PORT}`));
    
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();