const express = require("express");
const router = express.Router();
const {
  registrarVenda,
  obterRelatorioSemanal,
} = require("../controllers/relatorioController");

router.post("/", registrarVenda);
router.get("/semanal", obterRelatorioSemanal);

module.exports = router;
