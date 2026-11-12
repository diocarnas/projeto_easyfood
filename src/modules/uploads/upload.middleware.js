const multer = require("multer");

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter(req, file, callback) {
    if (!allowedTypes.has(file.mimetype)) return callback(new Error("Formato inválido. Envie JPG, PNG, WEBP ou GIF."));
    callback(null, true);
  }
});

module.exports = upload;
