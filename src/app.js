const express = require("express");
const cors = require("cors");
const path = require("path");
const restaurantRoutes = require("./modules/restaurants/restaurant.routes");
const authRoutes = require("./modules/auth/auth.routes");
const dishRoutes = require("./modules/dishes/dish.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/", dishRoutes);

// Erros de upload (tipo ou tamanho de arquivo).
app.use((error, req, res, next) => {
  if (error && (error.name === "MulterError" || error.message?.startsWith("Formato inválido"))) {
    return res.status(400).json({ error: error.code === "LIMIT_FILE_SIZE" ? "A imagem deve ter no máximo 5 MB" : error.message });
  }
  return next(error);
});

module.exports = app;
