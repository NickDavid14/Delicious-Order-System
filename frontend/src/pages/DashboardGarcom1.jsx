import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5001";

async function enviarVendaParaRelatorio(itensVendidos) {
  try {
    console.log("Enviando para backend:", itensVendidos);
    const response = await fetch(`${API_BASE_URL}/api/relatorio`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itens: itensVendidos }),
    });

    if (!response.ok) throw new Error("Erro ao registrar venda no relatório");

    console.log("Venda registrada no relatório com sucesso!");
    return true;
  } catch (error) {
    console.error("Erro ao enviar venda:", error);
    return false;
  }
}

const mesas = Array.from({ length: 12 }, (_, i) => i + 1);

export default function DashboardGarcom() {
  const navigate = useNavigate();
  const [statusMesas, setStatusMesas] = useState({});

  const atualizarStatus = () => {
    const novoStatus = {};
    mesas.forEach((mesa) => {
      const dados = localStorage.getItem(`pedido_mesa_${mesa}`);
      if (dados) {
        try {
          const { status } = JSON.parse(dados);
          novoStatus[mesa] = status;
        } catch {
          novoStatus[mesa] = undefined;
        }
      } else {
        novoStatus[mesa] = undefined;
      }
    });
    setStatusMesas(novoStatus);
  };

  useEffect(() => {
    atualizarStatus();
    const intervalo = setInterval(atualizarStatus, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const abrirMenuMesa = (mesaId) => {
    navigate(`/menu/${mesaId}`);
  };


  const confirmarEntrega = async (mesaId) => {
    const dadosBrutos = localStorage.getItem(`pedido_mesa_${mesaId}`);
    if (!dadosBrutos) return;

    try {
      const dadosParseados = JSON.parse(dadosBrutos);
      const itens = dadosParseados.itens;

      if (Array.isArray(itens) && itens.length > 0) {
        // Garante que cada item tenha os campos necessários
        const itensFormatados = itens.map((item) => ({
          nome: item.nome || item.id || "Produto desconhecido",
          preco: Number(item.preco) || 0,
          quantidade: Number(item.quantidade) || 1,
          excecoes: Array.isArray(item.excecoes) ? item.excecoes : [],
        }));

        const sucesso = await enviarVendaParaRelatorio(itensFormatados);
        if (sucesso) {
          localStorage.removeItem(`pedido_mesa_${mesaId}`);
          atualizarStatus();
        } else {
          alert("Erro ao enviar pedido. Tente novamente.");
        }
      } else {
        alert("Não há itens para enviar no pedido.");
      }
    } catch (error) {
      console.error("Erro ao processar itens da mesa:", error);
      alert("Erro ao processar pedido. Veja o console para detalhes.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      {}
      <div className="w-full max-w-md flex justify-center mb-8">
        <div className="flex w-48 h-16 rounded-md overflow-hidden border border-gray-300 shadow-md">
          <div className="flex-1 bg-green-600" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-red-600" />
        </div>
      </div>

      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Dashboard das Mesas</h1>

      {/* Legenda */}
      <div className="flex gap-6 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <span>Sem pedido</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-200 border border-red-600 rounded" />
          <span>Pendente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-200 border border-yellow-500 rounded" />
          <span>Pronto</span>
        </div>
      </div>

      {}
      <div className="grid grid-cols-4 gap-6 max-w-md w-full mb-8">
        {mesas.map((mesa) => {
          const status = statusMesas[mesa];

          let cor =
            "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer";
          if (status === "pendente")
            cor = "bg-red-200 border-2 border-red-600 text-red-800 cursor-pointer";
          if (status === "pronto")
            cor =
              "bg-yellow-200 border-2 border-yellow-500 text-yellow-800 cursor-pointer";

          return (
            <div key={mesa} className="relative">
              <button
                onClick={() => abrirMenuMesa(mesa)}
                className={`w-full font-bold text-lg rounded-lg h-20 flex items-center justify-center shadow-md transition ${cor}`}
                aria-label={`Mesa ${mesa}`}
              >
                {status === "pronto" && (
                  <span className="absolute top-1 right-2 text-yellow-600 text-sm animate-bounce">
                    🔔
                  </span>
                )}
                Mesa {mesa}
              </button>

              {status === "pronto" && (
                <button
                  onClick={() => confirmarEntrega(mesa)}
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow hover:bg-green-700"
                >
                  OK
                </button>
              )}
            </div>
          );
        })}
      </div>

      {}
      <button
        onClick={() => {
          mesas.forEach((mesa) =>
            localStorage.removeItem(`pedido_mesa_${mesa}`)
          );
          atualizarStatus();
        }}
        className="mt-4 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold shadow"
      >
        Limpar todos os pedidos
      </button>
    </div>
  );
}
