import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const produtosMenu = [
  { id: 1, nome: "Pizza Margherita", preco: 35.0 },
  { id: 2, nome: "Pizza Calabresa", preco: 40.0 },
  { id: 3, nome: "Pizza Quatro Queijos", preco: 45.0 },
  { id: 4, nome: "Refrigerante", preco: 7.5 },
  { id: 5, nome: "Água Mineral", preco: 5.0 },
  { id: 6, nome: "Lasanha", preco: 38.0 },
  { id: 7, nome: "Espaguete", preco: 30.0 },
];

export default function MenuMesas() {
  const { mesaId } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState([]);
  const [excecaoAberta, setExcecaoAberta] = useState(null);
  const [textoExcecao, setTextoExcecao] = useState("");

  useEffect(() => {
    const pedidoSalvo = localStorage.getItem(`pedido_mesa_${mesaId}`);
    if (pedidoSalvo) {
      const pedidoParseado = JSON.parse(pedidoSalvo);
      setPedido(pedidoParseado.itens || []);
    }
  }, [mesaId]);

  const adicionarItem = (produto) => {
    setPedido((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1, excecoes: [] }];
      }
    });
  };

  const removerItem = (produtoId) => {
    setPedido((prev) => {
      const item = prev.find((i) => i.id === produtoId);
      if (!item) return prev;

      if (item.quantidade === 1) {
        return prev.filter((i) => i.id !== produtoId);
      } else {
        return prev.map((i) =>
          i.id === produtoId ? { ...i, quantidade: i.quantidade - 1 } : i
        );
      }
    });
  };

  const abrirModalExcecao = (item) => {
    setExcecaoAberta(item);
    setTextoExcecao(item.excecoes?.join(", ") || "");
  };

  const salvarExcecao = () => {
    setPedido((prev) =>
      prev.map((item) =>
        item.id === excecaoAberta.id
          ? {
              ...item,
              excecoes: textoExcecao
                .split(",")
                .map((e) => e.trim())
                .filter((e) => e),
            }
          : item
      )
    );
    setExcecaoAberta(null);
    setTextoExcecao("");
  };

  const totalPedido = pedido.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const finalizarPedido = () => {
    if (pedido.length === 0) return;

    const dadosPedido = {
      itens: pedido,
      status: "pendente",
    };

    localStorage.setItem(`pedido_mesa_${mesaId}`, JSON.stringify(dadosPedido));
    alert(`Pedido da Mesa ${mesaId} finalizado!`);
    setPedido([]);
    navigate("/DashboardGarcom1");
  };

  const cancelarPedido = () => {
    const confirmar = window.confirm(
      "Deseja realmente cancelar o pedido desta mesa?"
    );
    if (confirmar) {
      localStorage.removeItem(`pedido_mesa_${mesaId}`);
      setPedido([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <header className="w-full max-w-md mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Menu da Mesa {mesaId}
        </h2>
        <button
          onClick={() => navigate("/DashboardGarcom1")}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Voltar
        </button>
      </header>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Produtos</h3>
        <ul className="divide-y divide-gray-200 max-h-72 overflow-auto">
          {produtosMenu.map((produto) => (
            <li
              key={produto.id}
              className="py-3 flex justify-between items-center hover:bg-red-50 cursor-pointer rounded-md px-2 text-gray-900"
              onClick={() => adicionarItem(produto)}
              title="Clique para adicionar ao pedido"
            >
              <span>{produto.nome}</span>
              <span className="font-semibold text-red-600">
                R$ {produto.preco.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 flex justify-between items-center">
          Pedido Atual
          <span className="text-sm font-normal text-gray-500">
            {pedido.length} item{pedido.length !== 1 ? "s" : ""}
          </span>
        </h3>

        {pedido.length === 0 ? (
          <p className="text-gray-500 italic">Nenhum item adicionado ainda.</p>
        ) : (
          <ul className="divide-y divide-gray-200 max-h-48 overflow-auto">
            {pedido.map((item) => (
              <li
                key={item.id}
                className="py-2 flex justify-between items-center"
              >
                <div>
                  <span className="font-medium text-gray-900">{item.nome}</span>{" "}
                  <span className="text-gray-500 text-sm">x{item.quantidade}</span>
                  {item.excecoes && item.excecoes.length > 0 && (
                    <div className="text-xs italic text-red-600">
                      Exceções: {item.excecoes.join(", ")}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirModalExcecao(item);
                    }}
                    type="button"
                  >
                    Exceções
                  </button>
                  <button
                    title="Clique para remover um item"
                    onClick={() => removerItem(item.id)}
                    className="text-red-600 font-bold px-2"
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-lg text-gray-800">
            Total: R$ {totalPedido.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={cancelarPedido}
              className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={finalizarPedido}
              disabled={pedido.length === 0}
              className={`px-4 py-2 rounded-md text-white font-semibold transition ${
                pedido.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Concluir
            </button>
          </div>
        </div>

        {/* Modal exceção simples */}
        {excecaoAberta && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            onClick={() => setExcecaoAberta(null)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-80"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-3">
                Exceções para {excecaoAberta.nome}
              </h3>
              <textarea
                value={textoExcecao}
                onChange={(e) => setTextoExcecao(e.target.value)}
                placeholder="Digite exceções separadas por vírgula"
                className="w-full border border-gray-300 rounded p-2 mb-4 resize-none"
                rows={4}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setExcecaoAberta(null)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarExcecao}
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
