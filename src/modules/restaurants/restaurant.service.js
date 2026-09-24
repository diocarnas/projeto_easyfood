const prisma = require("../../database/prisma");

async function listRestaurants({ category } = {}) {
  return prisma.restaurant.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: "desc" }
  });
}

async function getRestaurantById(id) {
  return prisma.restaurant.findUnique({ where: { id } });
}

async function createRestaurant(data) {
  return prisma.restaurant.create({
    data: {
      name: data.name,
      category: data.category,
      address: data.address,
      phone: data.phone,
      rating: data.rating || 0,
      ownerId: data.ownerId
    }
  });
}

async function updateRestaurant(id, data) {
  return prisma.restaurant.update({
    where: { id },
    data: {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.category !== undefined ? { category: data.category } : {}),
      ...(data.address !== undefined ? { address: data.address } : {}),
      ...(data.phone !== undefined ? { phone: data.phone } : {}),
      ...(data.rating !== undefined ? { rating: data.rating } : {})
    }
  });
}

async function deleteRestaurant(id) {
  return prisma.restaurant.delete({ where: { id } });
}

async function getStats() {
  const restaurants = await prisma.restaurant.findMany();
  const total = restaurants.length;
  const categories = {};
  let ratingSum = 0;
  let ratingCount = 0;

  restaurants.forEach((r) => {
    const cat = r.category || "Sem categoria";
    categories[cat] = (categories[cat] || 0) + 1;
    if (r.rating != null) {
      ratingSum += Number(r.rating);
      ratingCount += 1;
    }
  });

  return {
    total,
    categories,
    averageRating: ratingCount ? Number((ratingSum / ratingCount).toFixed(2)) : 0
  };
}

module.exports = {
  listRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getStats
};
