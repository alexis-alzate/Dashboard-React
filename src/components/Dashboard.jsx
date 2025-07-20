import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import UsersTable from './UsersTable';
import PlaceholderView from './PlaceholderView';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UsersTable />;
      case 'products':
        return <PlaceholderView title="Productos" />;
      case 'orders':
        return <PlaceholderView title="Órdenes" />;
      case 'analytics':
        return <PlaceholderView title="Analíticas" />;
      case 'settings':
        return <PlaceholderView title="Configuración" />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <button className="text-gray-600 hover:text-gray-900 relative">
                  🔔
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  ⚙️
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;