export default function AdminUsuarios() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-red-600 text-white text-left">
            <th className="py-3 px-4 text-sm font-semibold">Nome</th>
            <th className="py-3 px-4 text-sm font-semibold">Email</th>
            <th className="py-3 px-4 text-sm font-semibold">Função</th>
          </tr>
        </thead>
        <tbody>
          {}
          <tr className="hover:bg-red-50 transition">
            <td className="py-3 px-4 text-sm text-gray-800">Giuseppe Verdi  </td>
            <td className="py-3 px-4 text-sm text-gray-800">giuseppe@delicious.com</td>
            <td className="py-3 px-4 text-sm text-gray-800">Gerente</td>
          </tr>
          <tr className="hover:bg-red-50 transition">
            <td className="py-3 px-4 text-sm text-gray-800">Maria Rossi</td>
            <td className="py-3 px-4 text-sm text-gray-800">maria@delicious.com</td>
            <td className="py-3 px-4 text-sm text-gray-800">Garçom</td>
          </tr>
          <tr className="hover:bg-red-50 transition">
            <td className="py-3 px-4 text-sm text-gray-800">Emiliano</td>
            <td className="py-3 px-4 text-sm text-gray-800">Emiliano@delicious.com</td>
            <td className="py-3 px-4 text-sm text-gray-800">Chef de cozinha</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
