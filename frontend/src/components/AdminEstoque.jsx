export default function AdminEstoque() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-red-600 text-white text-left">
            <th className="py-3 px-4 text-sm font-semibold">Ingrediente</th>
            <th className="py-3 px-4 text-sm font-semibold">Quantidade</th>
            <th className="py-3 px-4 text-sm font-semibold">Unidade</th>
            <th className="py-3 px-4 text-sm font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-yellow-50 transition">
            <td className="py-3 px-4 text-sm text-gray-800">Mussarela</td>
            <td className="py-3 px-4 text-sm text-gray-800">5</td>
            <td className="py-3 px-4 text-sm text-gray-800">kg</td>
            <td className="py-3 px-4 text-sm text-green-600 font-medium">Disponível</td>
          </tr>
          <tr className="hover:bg-yellow-50 transition">
            <td className="py-3 px-4 text-sm text-gray-800">Molho de Tomate</td>
            <td className="py-3 px-4 text-sm text-gray-800">2</td>
            <td className="py-3 px-4 text-sm text-gray-800">L</td>
            <td className="py-3 px-4 text-sm text-red-600 font-medium">Baixo</td>
          </tr>
          <tr className="hover:bg-yellow-50 transition">
            <td className="py-3 px-4 text-sm text-gray-800">Farinha de Trigo</td>
            <td className="py-3 px-4 text-sm text-gray-800">10</td>
            <td className="py-3 px-4 text-sm text-gray-800">kg</td>
            <td className="py-3 px-4 text-sm text-green-600 font-medium">Disponível</td>
          </tr>
          <tr className="hover:bg-yellow-50 transition">
            <td className="py-3 px-4 text-sm text-gray-800">Azeitonas Pretas</td>
            <td className="py-3 px-4 text-sm text-gray-800">1.5</td>
            <td className="py-3 px-4 text-sm text-gray-800">kg</td>
            <td className="py-3 px-4 text-sm text-green-600 font-medium">Disponível</td>
          </tr>
          <tr className="hover:bg-yellow-50 transition">
            <td className="py-3 px-4 text-sm text-gray-800">Orégano</td>
            <td className="py-3 px-4 text-sm text-gray-800">0.3</td>
            <td className="py-3 px-4 text-sm text-gray-800">kg</td>
            <td className="py-3 px-4 text-sm text-yellow-600 font-medium">Médio</td>
          </tr>
          <tr className="hover:bg-yellow-50 transition">
            <td className="py-3 px-4 text-sm text-gray-800">Presunto</td>
            <td className="py-3 px-4 text-sm text-gray-800">4</td>
            <td className="py-3 px-4 text-sm text-gray-800">kg</td>
            <td className="py-3 px-4 text-sm text-green-600 font-medium">Disponível</td>
          </tr>
          <tr className="hover:bg-yellow-50 transition">
            <td className="py-3 px-4 text-sm text-gray-800">Cebola</td>
            <td className="py-3 px-4 text-sm text-gray-800">3</td>
            <td className="py-3 px-4 text-sm text-gray-800">kg</td>
            <td className="py-3 px-4 text-sm text-yellow-600 font-medium">Médio</td>
          </tr>
          <tr className="hover:bg-yellow-50 transition">
            <td className="py-3 px-4 text-sm text-gray-800">Pimentão</td>
            <td className="py-3 px-4 text-sm text-gray-800">1</td>
            <td className="py-3 px-4 text-sm text-gray-800">kg</td>
            <td className="py-3 px-4 text-sm text-red-600 font-medium">Baixo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
