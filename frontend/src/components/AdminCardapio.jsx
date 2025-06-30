export default function AdminCardapio() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-red-600 text-white text-left">
            <th className="py-3 px-4 text-sm font-semibold">Produto</th>
            <th className="py-3 px-4 text-sm font-semibold">Preço</th>
            <th className="py-3 px-4 text-sm font-semibold">Categoria</th>
          </tr>
        </thead>
        <tbody>
         <tr className="hover:bg-red-50 transition">
  <td className="py-3 px-4 text-sm text-gray-800">Pizza Margherita</td>
  <td className="py-3 px-4 text-sm text-gray-800">R$ 35,00</td>
  <td className="py-3 px-4 text-sm text-gray-800">Pizza</td>
</tr>
<tr className="hover:bg-red-50 transition">
  <td className="py-3 px-4 text-sm text-gray-800">Pizza Calabresa</td>
  <td className="py-3 px-4 text-sm text-gray-800">R$ 40,00</td>
  <td className="py-3 px-4 text-sm text-gray-800">Pizza</td>
</tr>
<tr className="hover:bg-red-50 transition">
  <td className="py-3 px-4 text-sm text-gray-800">Pizza Quatro Queijos</td>
  <td className="py-3 px-4 text-sm text-gray-800">R$ 45,00</td>
  <td className="py-3 px-4 text-sm text-gray-800">Pizza</td>
</tr>
<tr className="hover:bg-red-50 transition">
  <td className="py-3 px-4 text-sm text-gray-800">Refrigerante</td>
  <td className="py-3 px-4 text-sm text-gray-800">R$ 7,50</td>
  <td className="py-3 px-4 text-sm text-gray-800">Bebida</td>
</tr>
<tr className="hover:bg-red-50 transition">
  <td className="py-3 px-4 text-sm text-gray-800">Água Mineral</td>
  <td className="py-3 px-4 text-sm text-gray-800">R$ 5,00</td>
  <td className="py-3 px-4 text-sm text-gray-800">Bebida</td>
</tr>
<tr className="hover:bg-red-50 transition">
  <td className="py-3 px-4 text-sm text-gray-800">Lasanha</td>
  <td className="py-3 px-4 text-sm text-gray-800">R$ 38,00</td>
  <td className="py-3 px-4 text-sm text-gray-800">Massa</td>
</tr>
<tr className="hover:bg-red-50 transition">
  <td className="py-3 px-4 text-sm text-gray-800">Espaguete</td>
  <td className="py-3 px-4 text-sm text-gray-800">R$ 30,00</td>
  <td className="py-3 px-4 text-sm text-gray-800">Massa</td>
</tr>

        </tbody>
      </table>
    </div>
  );
}
