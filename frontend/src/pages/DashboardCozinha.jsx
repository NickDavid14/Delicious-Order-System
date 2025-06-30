import React, { useEffect, useState } from "react";

export default function DashboardCozinha() {
  const [pedidos, setPedidos] = useState([]);

  const atualizarPedidos = () => {
    const mesas = Array.from({ length: 12 }, (_, i) => i + 1);
    const novosPedidos = [];

    mesas.forEach((mesaId) => {
      const dados = localStorage.getItem(`pedido_mesa_${mesaId}`);
      if (dados) {
        const { itens, status } = JSON.parse(dados);
        if (status === "pendente") {
          novosPedidos.push({ mesaId, itens });
        }
      }
    });

    setPedidos(novosPedidos);
  };

  useEffect(() => {
    atualizarPedidos();
    const intervalo = setInterval(atualizarPedidos, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const marcarComoPronto = (mesaId) => {
    const dados = localStorage.getItem(`pedido_mesa_${mesaId}`);
    if (!dados) return;

    const pedidoAtualizado = { ...JSON.parse(dados), status: "pronto" };
    localStorage.setItem(`pedido_mesa_${mesaId}`, JSON.stringify(pedidoAtualizado));
    atualizarPedidos();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Painel da Cozinha 🍕
      </h1>

      {pedidos.length === 0 ? (
        <p className="text-gray-500 text-center italic">Nenhum pedido pendente no momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pedidos.map((pedido) => (
            <div
              key={pedido.mesaId}
              className="bg-yellow-100 border-2 border-yellow-500 p-4 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-3 text-yellow-800">
                Mesa {pedido.mesaId}
              </h2>
              <ul className="mb-4 space-y-1">
                {pedido.itens.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    <div className="flex justify-between">
                      <span>{item.nome}</span>
                      <span className="font-semibold">x{item.quantidade}</span>
                    </div>
                    {item.excecoes && item.excecoes.length > 0 && (
                      <div className="text-xs italic text-red-600 mt-1 ml-2">
                        Exceções: {item.excecoes.join(", ")}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => marcarComoPronto(pedido.mesaId)}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
              >
                Marcar como pronto
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
