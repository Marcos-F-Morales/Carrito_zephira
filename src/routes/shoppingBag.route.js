// src/routes/shoppingBag.route.js
import express from "express";
import { ShoppingbagController } from "../controllers/shoppingBag.controller.js";
import { Shoppingbag } from "../models/Shoppingbag.js";

export const ShoppingbagRoute = (app) => {
  const router = express.Router();
  const controller = new ShoppingbagController();

  // 👉 Rutas CRUD existentes
  router.post("/", (req, res) => controller.addToBag(req, res));
  router.get("/:user_id", (req, res) => controller.getBagByUser(req, res));
  router.put("/:user_id/:producto_talla_color_id", (req, res) => controller.updateBagItem(req, res));
  router.delete("/:user_id/:producto_talla_color_id", (req, res) => controller.removeFromBag(req, res));
  router.delete("/clear/:user_id", (req, res) => controller.clearBag(req, res));

  // ⚡ NUEVO: Ruta para Stripe/Gateway (devuelve los ítems listos para pagar)
  router.get("/items/:user_id", async (req, res) => {
    try {
      const { user_id } = req.params;
      const cart = await Shoppingbag.findAll({ where: { user_id } });

      if (!cart.length) {
        return res.status(404).json({ message: "El carrito está vacío para este usuario." });
      }

      // 🔹 Adaptamos formato que Stripe espera
      const items = cart.map((item) => ({
        name: item.product_name || "Producto carrito",
        price: parseFloat(item.price) || 0,
        quantity: item.quantity || 1,
      }));

      return res.json({ items });
    } catch (error) {
      console.error("Error obteniendo ítems del carrito:", error);
      return res.status(500).json({ error: "Error al obtener los ítems del carrito." });
    }
  });

  // 🔗 Montar en Express
  app.use("/favorites-shoppingbag-service/shoppingbag", router);
};
