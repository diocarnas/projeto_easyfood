const dishService = require("./dish.service");
const uploadService = require("../uploads/upload.service");

function handleError(res, error) {
  const status = error.statusCode || 500;
  if (status === 500) console.error("Erro no módulo de pratos:", error);
  return res.status(status).json({ error: status === 500 ? "Erro interno no servidor" : error.message });
}

async function create(req, res) {
  try { return res.status(201).json(await dishService.createDish(req.params.restaurantId, req.body, req.user.id)); }
  catch (error) { return handleError(res, error); }
}
async function list(req, res) {
  try { return res.json(await dishService.listDishes(req.params.restaurantId)); }
  catch (error) { return handleError(res, error); }
}
async function getById(req, res) {
  try { return res.json(await dishService.getDish(req.params.dishId)); }
  catch (error) { return handleError(res, error); }
}
async function update(req, res) {
  try { return res.json(await dishService.updateDish(req.params.dishId, req.body, req.user.id)); }
  catch (error) { return handleError(res, error); }
}
async function uploadImage(req, res) {
  let savedFile;
  try {
    if (!req.file) return res.status(400).json({ error: "Selecione uma imagem" });
    const dish = await dishService.getDish(req.params.dishId);
    // A autorização é validada antes de gravar o arquivo.
    const existing = await require("../../database/prisma").dish.findUnique({ where: { id: dish.id }, include: { restaurant: true } });
    if (existing.restaurant.ownerId !== Number(req.user.id)) return res.status(403).json({ error: "Você não tem permissão para alterar este prato" });
    savedFile = await uploadService.saveImage(req.file, "dishes", `dish-${dish.id}`);
    const updated = await dishService.setDishImage(dish.id, savedFile.url, req.user.id);
    if (dish.imageUrl) await uploadService.removePublicFile(dish.imageUrl);
    return res.json(updated);
  } catch (error) {
    if (savedFile) await uploadService.removePublicFile(savedFile.url).catch(() => {});
    return handleError(res, error);
  }
}
async function remove(req, res) {
  try {
    const dish = await dishService.deleteDish(req.params.dishId, req.user.id);
    if (dish.imageUrl) await uploadService.removePublicFile(dish.imageUrl);
    return res.status(204).send();
  } catch (error) { return handleError(res, error); }
}
module.exports = { create, list, getById, update, uploadImage, remove, handleError };
