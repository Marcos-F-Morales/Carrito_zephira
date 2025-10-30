import { Favorites } from "../models/favorites.js";
import { getProductById, getUserById } from "../utils/apiClient.js";

export class FavoritesController {
  async addFavorite(req, res) {
    try {
      const { user_id, producto_talla_color_id } = req.body;
      const user = await getUserById(user_id);
      const product = await getProductById(producto_talla_color_id);

      if (!user || !product)
        return res.status(404).json({ message: "Usuario o producto no encontrado" });

      const favorite = await Favorites.create({ user_id, producto_talla_color_id });
      res.status(201).json(favorite);
    } catch (err) {
      res.status(500).json({ message: "Error al agregar a favoritos", error: err.message });
    }
  }

  async getFavoritesByUser(req, res) {
    try {
      const { user_id } = req.params;
      const favorites = await Favorites.findAll({ where: { user_id } });
      res.status(200).json(favorites);
    } catch (err) {
      res.status(500).json({ message: "Error al obtener favoritos" });
    }
  }

  async removeFavorite(req, res) {
    try {
      const { user_id, producto_talla_color_id } = req.params;
      await Favorites.destroy({ where: { user_id, producto_talla_color_id } });
      res.status(200).json({ message: "Eliminado de favoritos" });
    } catch (err) {
      res.status(500).json({ message: "Error al eliminar favorito" });
    }
  }

  async clearFavorites(req, res) {
    try {
      const { user_id } = req.params;
      await Favorites.destroy({ where: { user_id } });
      res.status(200).json({ message: "Favoritos vaciados" });
    } catch (err) {
      res.status(500).json({ message: "Error al limpiar favoritos" });
    }
  }
}
