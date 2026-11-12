const express = require("express");
const controller = require("./auth.controller");
const authenticate = require("./auth.middleware");
const upload = require("../uploads/upload.middleware");
const profileController = require("./profile.controller");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

router.post("/me/avatar", authenticate, upload.single("image"), profileController.uploadAvatar);

router.get("/me", authenticate, (req, res) => {
  res.json({ message: "Você está autenticado!", user: req.user });
});

module.exports = router;
