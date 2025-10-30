// src/routes/favorites.route.js
import express from "express";
import { FavoritesController } from "../controllers/favorites.controller.js";
import { Favorites } from "../models/favorites.js"; // Para acceso directo al modelo si lo necesitas

export const FavoritesRoute = (app) => {
  const router = express.Router();
  const controller = new FavoritesController();

  // 👉 Rutas CRUD existentes
  router.post("/", (req, res) => controller.addFavorite(req, res));
  router.get("/:user_id", (req, res) => controller.getFavoritesByUser(req, res));
  router.delete("/:user_id/:producto_talla_color_id", (req, res) => controller.removeFavorite(req, res));
  router.delete("/clear/:user_id", (req, res) => controller.clearFavorites(req, res));

  // ⚡ NUEVO: Ruta para Stripe/Gateway (devuelve los ítems listos para pagar)
  router.get("/items/:user_id", async (req, res) => {
    try {
      const { user_id } = req.params;
      const favorites = await Favorites.findAll({ where: { user_id } });

      if (!favorites.length) {
        return res.status(404).json({ message: "No hay productos favoritos para este usuario." });
      }

      // 🔹 Adaptamos formato que Stripe espera
      const items = favorites.map((fav) => ({
        name: fav.product_name || "Producto favorito",
        price: parseFloat(fav.price) || 0,
        quantity: fav.quantity || 1,
      }));

      return res.json({ items });
    } catch (error) {
      console.error("Error obteniendo ítems de favoritos:", error);
      return res.status(500).json({ error: "Error al obtener los ítems de favoritos." });
    }
  });

  // 🔗 Montar en Express
  app.use("/favorites-shoppingbag-service/favorites", router);
};
