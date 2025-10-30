import { Shoppingbag } from "../models/Shoppingbag.js";
import { getProductById, getUserById } from "../utils/apiClient.js";

export class ShoppingbagController {
  async addToBag(req, res) {
    try {
      const { user_id, producto_talla_color_id, cantidad } = req.body;
      const user = await getUserById(user_id);
      const product = await getProductById(producto_talla_color_id);

      if (!user || !product)
        return res.status(404).json({ message: "Usuario o producto no encontrado" });

      const item = await Shoppingbag.create({ user_id, producto_talla_color_id, cantidad });
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ message: "Error al agregar al carrito", error: err.message });
    }
  }

getBagByUser = async (req, res) => {
  try {
    console.log('🔍 Buscando carrito para user_id:', req.params.user_id);
    
    const { user_id } = req.params;
    const cart = await Shoppingbag.findAll({ where: { user_id } });
    
    console.log('✅ Carrito encontrado:', cart);
    return res.json(cart);
    
  } catch (error) {
    console.log('❌ ERROR en getBagByUser:', error.message);
    console.log('❌ Stack trace:', error.stack);
    return res.status(500).json({ message: "Error al obtener carrito", error: error.message });
  }
}

  async updateBagItem(req, res) {
    try {
      const { user_id, producto_talla_color_id } = req.params;
      const { cantidad } = req.body;
      await Shoppingbag.update({ cantidad }, { where: { user_id, producto_talla_color_id } });
      res.status(200).json({ message: "Cantidad actualizada" });
    } catch (err) {
      res.status(500).json({ message: "Error al actualizar producto" });
    }
  }

  async removeFromBag(req, res) {
    try {
      const { user_id, producto_talla_color_id } = req.params;
      await Shoppingbag.destroy({ where: { user_id, producto_talla_color_id } });
      res.status(200).json({ message: "Producto eliminado" });
    } catch (err) {
      res.status(500).json({ message: "Error al eliminar producto" });
    }
  }

  async clearBag(req, res) {
    try {
      const { user_id } = req.params;
      await Shoppingbag.destroy({ where: { user_id } });
      res.status(200).json({ message: "Carrito vaciado" });
    } catch (err) {
      res.status(500).json({ message: "Error al vaciar carrito" });
    }
  }
}
