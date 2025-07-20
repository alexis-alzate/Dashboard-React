import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = ({ isOpen, setIsOpen, activeMenu, setActiveMenu }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Usuarios', icon: '👥' },
    { id: 'products', label: 'Productos', icon: '📦' },
    { id: 'orders', label: 'Órdenes', icon: '🛍️' },
    { id: 'analytics', label: 'Analíticas', icon: '📈' },
    { id: 'settings', label: 'Configuración', icon: '⚙️' }
  ];

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-gray-900 text-white w-64 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
                AD
              </div>
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="border-t border-gray-800 pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;