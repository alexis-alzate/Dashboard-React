import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardContent = () => {
  const stats = [
    { label: 'Usuarios Totales', value: '1,234', change: '+12%', trend: 'up' },
    { label: 'Ingresos', value: '$45,678', change: '+8%', trend: 'up' },
    { label: 'Órdenes', value: '89', change: '-3%', trend: 'down' },
    { label: 'Tasa Conversión', value: '3.2%', change: '+0.5%', trend: 'up' }
  ];

  const chartData = [
    { mes: 'Ene', ventas: 4000, usuarios: 240 },
    { mes: 'Feb', ventas: 3000, usuarios: 139 },
    { mes: 'Mar', ventas: 2000, usuarios: 380 },
    { mes: 'Abr', ventas: 2780, usuarios: 390 },
    { mes: 'May', ventas: 1890, usuarios: 480 },
    { mes: 'Jun', ventas: 2390, usuarios: 380 },
    { mes: 'Jul', ventas: 3490, usuarios: 430 }
  ];

  const pieData = [
    { name: 'Desktop', value: 68, color: '#3B82F6' },
    { name: 'Mobile', value: 25, color: '#10B981' },
    { name: 'Tablet', value: 7, color: '#F59E0B' }
  ];

  const recentActivity = [
    { id: 1, user: 'Juan Pérez', action: 'Nuevo pedido', time: 'Hace 5 min', icon: '🛍️' },
    { id: 2, user: 'María García', action: 'Registro completo', time: 'Hace 15 min', icon: '👤' },
    { id: 3, user: 'Carlos López', action: 'Pago recibido', time: 'Hace 1 hora', icon: '💳' },
    { id: 4, user: 'Ana Martínez', action: 'Comentario añadido', time: 'Hace 2 horas', icon: '💬' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard General</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Ventas vs Usuarios</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="usuarios" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Dispositivos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
          {recentActivity.map(activity => (
            <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activity.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;