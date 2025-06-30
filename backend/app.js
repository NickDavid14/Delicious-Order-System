const express = require("express");
const cors = require("cors");
const relatorioRoutes = require("./routes/relatorioRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/relatorio", relatorioRoutes);

module.exports = app;
