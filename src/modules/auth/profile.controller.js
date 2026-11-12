const prisma = require("../../database/prisma");
const uploadService = require("../uploads/upload.service");

async function uploadAvatar(req, res) {
  let savedFile;
  try {
    if (!req.file) return res.status(400).json({ error: "Selecione uma imagem" });
    const user = await prisma.user.findUnique({ where: { id: Number(req.user.id) } });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    savedFile = await uploadService.saveImage(req.file, "avatars", `user-${user.id}`);
    const updated = await prisma.user.update({ where: { id: user.id }, data: { avatarUrl: savedFile.url }, select: { id: true, name: true, email: true, avatarUrl: true } });
    if (user.avatarUrl) await uploadService.removePublicFile(user.avatarUrl);
    return res.json({ message: "Foto de perfil atualizada", user: updated });
  } catch (error) {
    if (savedFile) await uploadService.removePublicFile(savedFile.url).catch(() => {});
    console.error("Erro ao atualizar foto de perfil:", error);
    return res.status(error.statusCode || 500).json({ error: error.statusCode ? error.message : "Não foi possível atualizar a foto" });
  }
}

module.exports = { uploadAvatar };
