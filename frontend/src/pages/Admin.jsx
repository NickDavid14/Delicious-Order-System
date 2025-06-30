import { useState } from 'react';
import AdminUsuarios from '../components/AdminUsuarios';
import AdminCardapio from '../components/AdminCardapio';
import AdminEstoque from '../components/AdminEstoque';
import AdminRelatorios from '../components/AdminRelatorios';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('usuarios');

  const tabs = [
    { id: 'usuarios', label: 'Usuários' },
    { id: 'cardapio', label: 'Cardápio' },
    { id: 'estoque', label: 'Estoque' },
    { id: 'relatorios', label: 'Relatórios' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {}
      <div className="flex h-2">
        <div className="bg-green-600 w-1/3"></div>
        <div className="bg-white w-1/3"></div>
        <div className="bg-red-600 w-1/3"></div>
      </div>

      {/* TÍTULO */}
      <div className="text-center py-6">
        <h1 className="text-4xl font-extrabold text-red-600">👑 Painel Administrativo</h1>
      </div>

      {/* TABS */}
      <nav className="flex justify-center space-x-4 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full border font-medium shadow-sm transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-red-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* CONTEÚDO */}
      <section className="px-4 md:px-16">
        {activeTab === 'usuarios' && <AdminUsuarios />}
        {activeTab === 'cardapio' && <AdminCardapio />}
        {activeTab === 'estoque' && <AdminEstoque />}
        {activeTab === 'relatorios' && <AdminRelatorios />}
      </section>
    </div>
  );
}
