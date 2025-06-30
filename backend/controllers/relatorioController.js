const fs = require("fs");
const path = require("path");

const relatorioPath = path.join(__dirname, "../data/relatorio.json");

function lerRelatorio() {
  if (!fs.existsSync(relatorioPath)) {
    fs.writeFileSync(relatorioPath, JSON.stringify([]));
  }
  const data = fs.readFileSync(relatorioPath);
  return JSON.parse(data);
}

function salvarRelatorio(relatorio) {
  fs.writeFileSync(relatorioPath, JSON.stringify(relatorio, null, 2));
}

exports.registrarVenda = (req, res) => {
  const { itens } = req.body;
  if (!itens || !Array.isArray(itens)) {
    return res.status(400).json({ erro: "Itens inválidos" });
  }

  const relatorio = lerRelatorio();
  relatorio.push({
    data: new Date().toISOString(),
    itens: itens.map((item) => ({
      nome: item.nome,
      preco: item.preco,
      quantidade: item.quantidade,
      excecoes: item.excecoes || [],
    })),
  });

  salvarRelatorio(relatorio);
  res.status(200).json({ mensagem: "Venda registrada" });
};

exports.obterRelatorioSemanal = (req, res) => {
  const relatorio = lerRelatorio();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

  const semanal = relatorio.filter(
    (v) => new Date(v.data) >= seteDiasAtras
  );

  res.json({ semanal });
};
