const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.resolve(__dirname, "../../../public");

async function saveImage(file, folder, filename) {
  if (!file || !file.buffer) throw new Error("Arquivo de imagem não recebido");
  const safeFolder = folder === "avatars" ? "avatars" : "dishes";
  const directory = path.join(publicDir, "uploads", safeFolder);
  await fs.mkdir(directory, { recursive: true });

  // Sharp valida o conteúdo real e converte para WebP, removendo metadados.
  const outputName = `${filename}-${Date.now()}.webp`;
  const outputPath = path.join(directory, outputName);
  try {
    await sharp(file.buffer, { limitInputPixels: 25_000_000 })
      .rotate()
      .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath);
  } catch (error) {
    error.statusCode = 400;
    error.message = "O arquivo enviado não contém uma imagem válida.";
    throw error;
  }

  return { url: `/uploads/${safeFolder}/${outputName}`, path: outputPath };
}

async function removePublicFile(publicUrl) {
  if (typeof publicUrl !== "string" || !publicUrl.startsWith("/uploads/")) return;
  const target = path.resolve(publicDir, `.${publicUrl}`);
  if (!target.startsWith(path.join(publicDir, "uploads") + path.sep)) return;
  await fs.unlink(target).catch((error) => { if (error.code !== "ENOENT") throw error; });
}

module.exports = { saveImage, removePublicFile };
