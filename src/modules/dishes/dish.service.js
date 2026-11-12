const prisma = require("../../database/prisma");

function parseId(value) {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id <= 0) {
    const error = new Error("Identificador inválido");
    error.statusCode = 400;
    throw error;
  }
  return id;
}

function validateDish(data) {
  if (typeof data.name !== "string" || !data.name.trim()) {
    const error = new Error("Nome é obrigatório"); error.statusCode = 400; throw error;
  }
  if (typeof data.category !== "string" || !data.category.trim()) {
    const error = new Error("Categoria é obrigatória"); error.statusCode = 400; throw error;
  }
  const price = Number(data.price);
  if (data.price === "" || data.price == null || !Number.isFinite(price) || price < 0) {
    const error = new Error("Preço inválido"); error.statusCode = 400; throw error;
  }
  if (data.description !== undefined && typeof data.description !== "string") {
    const error = new Error("Descrição inválida"); error.statusCode = 400; throw error;
  }
  return {
    name: data.name.trim(), category: data.category.trim(),
    description: data.description || "", price: price.toFixed(2)
  };
}

function ensureOwnership(restaurant, userId) {
  if (restaurant.ownerId !== Number(userId)) {
    const error = new Error("Você não tem permissão para gerenciar este restaurante");
    error.statusCode = 403; throw error;
  }
}

async function getDishWithRestaurant(dishId) {
  const id = parseId(dishId);
  const dish = await prisma.dish.findUnique({ where: { id }, include: { restaurant: true } });
  if (!dish) { const error = new Error("Prato não encontrado"); error.statusCode = 404; throw error; }
  return dish;
}

async function createDish(restaurantId, data, userId) {
  const id = parseId(restaurantId);
  const validated = validateDish(data);
  const restaurant = await prisma.restaurant.findUnique({ where: { id } });
  if (!restaurant) { const error = new Error("Restaurante não encontrado"); error.statusCode = 404; throw error; }
  ensureOwnership(restaurant, userId);
  return prisma.dish.create({ data: { ...validated, restaurantId: id } });
}

async function listDishes(restaurantId) {
  return prisma.dish.findMany({ where: { restaurantId: parseId(restaurantId) }, orderBy: { id: "asc" } });
}

async function getDish(dishId) {
  const dish = await prisma.dish.findUnique({ where: { id: parseId(dishId) } });
  if (!dish) { const error = new Error("Prato não encontrado"); error.statusCode = 404; throw error; }
  return dish;
}

async function updateDish(dishId, data, userId) {
  const dish = await getDishWithRestaurant(dishId);
  ensureOwnership(dish.restaurant, userId);
  const validated = validateDish({
    name: data.name ?? dish.name, category: data.category ?? dish.category,
    description: data.description ?? dish.description, price: data.price ?? dish.price.toString()
  });
  return prisma.dish.update({ where: { id: dish.id }, data: validated });
}

async function setDishImage(dishId, imageUrl, userId) {
  const dish = await getDishWithRestaurant(dishId);
  ensureOwnership(dish.restaurant, userId);
  return prisma.dish.update({ where: { id: dish.id }, data: { imageUrl } });
}

async function deleteDish(dishId, userId) {
  const dish = await getDishWithRestaurant(dishId);
  ensureOwnership(dish.restaurant, userId);
  await prisma.dish.delete({ where: { id: dish.id } });
  return dish;
}

module.exports = { createDish, listDishes, getDish, updateDish, setDishImage, deleteDish, parseId };
