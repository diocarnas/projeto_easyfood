const restaurantService = require("./restaurant.service");

async function list(req, res) {
  try {
    const { category } = req.query;
    const restaurants = await restaurantService.listRestaurants({ category });
    res.json(restaurants);
  } catch (error) {
    console.error("Erro ao buscar restaurantes:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function stats(req, res) {
  try {
    const data = await restaurantService.getStats();
    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function create(req, res) {
  const { name, category, address, phone, rating } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: "Nome e categoria são obrigatórios" });
  }

  try {
    const restaurant = await restaurantService.createRestaurant({
      name,
      category,
      address,
      phone,
      rating,
      ownerId: req.user.id
    });
    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Erro ao cadastrar restaurante:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function update(req, res) {
  const id = Number(req.params.id);
  const { name, category, address, phone, rating } = req.body;

  try {
    const existing = await restaurantService.getRestaurantById(id);

    if (!existing) {
      return res.status(404).json({ error: "Restaurante não encontrado" });
    }
    if (existing.ownerId && existing.ownerId !== req.user.id) {
      return res.status(403).json({ error: "Você não tem permissão para editar este restaurante" });
    }

    const updated = await restaurantService.updateRestaurant(id, { name, category, address, phone, rating });
    res.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar restaurante:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function remove(req, res) {
  const id = Number(req.params.id);

  try {
    const existing = await restaurantService.getRestaurantById(id);

    if (!existing) {
      return res.status(404).json({ error: "Restaurante não encontrado" });
    }
    if (existing.ownerId && existing.ownerId !== req.user.id) {
      return res.status(403).json({ error: "Você não tem permissão para excluir este restaurante" });
    }

    await restaurantService.deleteRestaurant(id);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir restaurante:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = { list, stats, create, update, remove };
