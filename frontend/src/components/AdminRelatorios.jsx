import React, { useEffect, useState } from "react";

const API = "http://localhost:5001";

export default function AdminRelatorios() {
  const [vendasSemana, setVendasSemana] = useState([]);

  const fetchSemanal = async () => {
    try {
      const res = await fetch(`${API}/api/relatorio/semanal`);
      const data = await res.json();
      setVendasSemana(data.semanal || []);
    } catch (e) {
      console.error("Erro ao buscar relatório:", e);
    }
  };

  useEffect(() => {
    fetchSemanal();
    const interval = setInterval(fetchSemanal, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 min-h-screen font-sans text-gray-900">
      <h2 className="text-4xl font-extrabold mb-8 border-b border-gray-300 pb-3">
        Relatório Semanal de Vendas
      </h2>

      {vendasSemana.length === 0 ? (
        <p className="text-gray-600 italic text-lg">
          Nenhuma venda registrada nos últimos 7 dias.
        </p>
      ) : (
        <div className="space-y-10">
          {vendasSemana.map((venda, index) => {
  
            const totalVenda = venda.itens.reduce(
              (acc, item) => acc + item.preco * item.quantidade,
              0
            );

            return (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-6 shadow bg-white"
              >
                <div className="mb-4 text-gray-700 font-semibold text-lg">
                  Data: {new Date(venda.data).toLocaleString()}
                </div>
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-gray-200 text-gray-800 font-semibold">
                      <th className="border px-3 py-2">Produto</th>
                      <th className="border px-3 py-2">Quantidade</th>
                      <th className="border px-3 py-2">Preço Unitário</th>
                      <th className="border px-3 py-2">Subtotal</th>
                      <th className="border px-3 py-2">Exceções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {venda.itens.map((item, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-100 transition-colors duration-150"
                      >
                        <td className="border px-3 py-2 font-medium text-gray-900">
                          {item.nome}
                        </td>
                        <td className="border px-3 py-2">{item.quantidade}</td>
                        <td className="border px-3 py-2">
                          R$ {parseFloat(item.preco).toFixed(2)}
                        </td>
                        <td className="border px-3 py-2 font-semibold text-gray-800">
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </td>
                        <td className="border px-3 py-2">
                          {item.excecoes?.length > 0
                            ? item.excecoes.join(", ")
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100 font-bold text-gray-900">
                      <td className="border px-3 py-2 text-right" colSpan={3}>
                        Total:
                      </td>
                      <td className="border px-3 py-2">
                        R$ {totalVenda.toFixed(2)}
                      </td>
                      <td className="border px-3 py-2">—</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
