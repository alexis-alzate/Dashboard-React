import React, { useState } from 'react';

const OrdersTable = () => {
  // Estado con órdenes de ejemplo
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: {
        name: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        phone: '+34 600 123 456',
        address: 'Calle Mayor 123, Madrid 28001'
      },
      items: [
        { id: 1, name: 'MacBook Pro 16"', quantity: 1, price: 2499.99 },
        { id: 2, name: 'Magic Mouse', quantity: 1, price: 79.99 }
      ],
      total: 2579.98,
      status: 'Procesando',
      paymentMethod: 'Tarjeta de Crédito',
      paymentStatus: 'Pagado',
      shippingMethod: 'Express',
      trackingNumber: 'TRK123456789',
      date: '2024-03-15',
      estimatedDelivery: '2024-03-18',
      notes: 'Entregar en horario de mañana'
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'María García',
        email: 'maria@ejemplo.com',
        phone: '+34 600 987 654',
        address: 'Av. Diagonal 456, Barcelona 08001'
      },
      items: [
        { id: 3, name: 'iPhone 15 Pro', quantity: 2, price: 999.99 },
        { id: 4, name: 'AirPods Pro', quantity: 1, price: 249.99 }
      ],
      total: 2249.97,
      status: 'Enviado',
      paymentMethod: 'PayPal',
      paymentStatus: 'Pagado',
      shippingMethod: 'Standard',
      trackingNumber: 'TRK987654321',
      date: '2024-03-14',
      estimatedDelivery: '2024-03-20',
      notes: ''
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Carlos López',
        email: 'carlos@ejemplo.com',
        phone: '+34 600 555 444',
        address: 'Plaza España 789, Valencia 46001'
      },
      items: [
        { id: 5, name: 'iPad Air', quantity: 1, price: 599.99 }
      ],
      total: 599.99,
      status: 'Pendiente',
      paymentMethod: 'Transferencia',
      paymentStatus: 'Pendiente',
      shippingMethod: 'Express',
      trackingNumber: '',
      date: '2024-03-16',
      estimatedDelivery: '2024-03-19',
      notes: 'Cliente VIP - Prioridad alta'
    },
    {
      id: 'ORD-004',
      customer: {
        name: 'Ana Martínez',
        email: 'ana@ejemplo.com',
        phone: '+34 600 333 222',
        address: 'Gran Vía 321, Madrid 28013'
      },
      items: [
        { id: 6, name: 'Apple Watch Series 9', quantity: 1, price: 399.99 },
        { id: 7, name: 'Sport Band', quantity: 2, price: 49.99 }
      ],
      total: 499.97,
      status: 'Entregado',
      paymentMethod: 'Tarjeta de Crédito',
      paymentStatus: 'Pagado',
      shippingMethod: 'Standard',
      trackingNumber: 'TRK456789123',
      date: '2024-03-10',
      estimatedDelivery: '2024-03-13',
      deliveredDate: '2024-03-13',
      notes: ''
    },
    {
      id: 'ORD-005',
      customer: {
        name: 'Pedro Sánchez',
        email: 'pedro@ejemplo.com',
        phone: '+34 600 777 888',
        address: 'Rambla Catalunya 654, Barcelona 08007'
      },
      items: [
        { id: 8, name: 'MacBook Air', quantity: 1, price: 1199.99 }
      ],
      total: 1199.99,
      status: 'Cancelado',
      paymentMethod: 'Tarjeta de Crédito',
      paymentStatus: 'Reembolsado',
      shippingMethod: 'Express',
      trackingNumber: '',
      date: '2024-03-12',
      estimatedDelivery: '2024-03-15',
      notes: 'Cancelado por el cliente'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterPayment, setFilterPayment] = useState('Todos');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Estados posibles
  const orderStatuses = ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'];
  const paymentStatuses = ['Pendiente', 'Pagado', 'Reembolsado'];
  
  // Colores para estados
  const getStatusColor = (status) => {
    const colors = {
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Procesando': 'bg-blue-100 text-blue-800',
      'Enviado': 'bg-purple-100 text-purple-800',
      'Entregado': 'bg-green-100 text-green-800',
      'Cancelado': 'bg-red-100 text-red-800',
      'Pagado': 'bg-green-100 text-green-800',
      'Reembolsado': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Cambiar estado de orden
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status: newStatus };
        
        // Si se marca como entregado, agregar fecha de entrega
        if (newStatus === 'Entregado') {
          updatedOrder.deliveredDate = new Date().toISOString().split('T')[0];
        }
        
        // Si se cancela, cambiar estado de pago
        if (newStatus === 'Cancelado' && order.paymentStatus === 'Pagado') {
          updatedOrder.paymentStatus = 'Reembolsado';
        }
        
        return updatedOrder;
      }
      return order;
    }));
  };

  // Ver detalles de orden
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  // Calcular estadísticas
  const stats = {
    total: orders.length,
    pendientes: orders.filter(o => o.status === 'Pendiente').length,
    procesando: orders.filter(o => o.status === 'Procesando').length,
    enviados: orders.filter(o => o.status === 'Enviado').length,
    entregados: orders.filter(o => o.status === 'Entregado').length,
    ingresosTotales: orders
      .filter(o => o.paymentStatus === 'Pagado')
      .reduce((sum, o) => sum + o.total, 0)
  };

  // Filtrar órdenes
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'Todos' || order.status === filterStatus;
    const matchesPayment = filterPayment === 'Todos' || order.paymentStatus === filterPayment;
    
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const orderDate = new Date(order.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      matchesDate = orderDate >= startDate && orderDate <= endDate;
    }
    
    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  // Timeline para tracking
  const getOrderTimeline = (order) => {
    const timeline = [
      { 
        status: 'Pedido Creado', 
        date: order.date, 
        completed: true,
        icon: '🛒'
      },
      { 
        status: 'Pago Confirmado', 
        date: order.date, 
        completed: order.paymentStatus === 'Pagado',
        icon: '💳'
      },
      { 
        status: 'En Preparación', 
        date: order.date, 
        completed: ['Procesando', 'Enviado', 'Entregado'].includes(order.status),
        icon: '📦'
      },
      { 
        status: 'Enviado', 
        date: order.estimatedDelivery, 
        completed: ['Enviado', 'Entregado'].includes(order.status),
        icon: '🚚'
      },
      { 
        status: 'Entregado', 
        date: order.deliveredDate || order.estimatedDelivery, 
        completed: order.status === 'Entregado',
        icon: '✅'
      }
    ];
    
    return timeline;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Órdenes</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <span>📄</span>
          Exportar Reporte
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Órdenes</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pendientes}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Procesando</p>
          <p className="text-2xl font-bold text-blue-600">{stats.procesando}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Enviados</p>
          <p className="text-2xl font-bold text-purple-600">{stats.enviados}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Entregados</p>
          <p className="text-2xl font-bold text-green-600">{stats.entregados}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Ingresos</p>
          <p className="text-2xl font-bold text-blue-600">${stats.ingresosTotales.toFixed(2)}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Búsqueda */}
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="Buscar por ID, cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtro por estado */}
          <div className="md:col-span-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Todos">Todos los estados</option>
              {orderStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Filtro por pago */}
          <div className="md:col-span-2">
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Todos">Todos los pagos</option>
              {paymentStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Rango de fechas */}
          <div className="md:col-span-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botón limpiar */}
          <div className="md:col-span-1">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('Todos');
                setFilterPayment('Todos');
                setDateRange({ start: '', end: '' });
              }}
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de órdenes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pago
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    <div className="text-sm text-gray-500">{order.shippingMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.items.length} producto{order.items.length > 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items[0].name}{order.items.length > 1 && '...'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)} border-0 cursor-pointer`}
                    >
                      {orderStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Ver detalles
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      🖨️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalles */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Orden {selectedOrder.id}
                </h2>
                <p className="text-gray-600">
                  Fecha: {new Date(selectedOrder.date).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Información del cliente */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">📋 Información del Cliente</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Nombre:</span> {selectedOrder.customer.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                  <p><span className="font-medium">Teléfono:</span> {selectedOrder.customer.phone}</p>
                  <p><span className="font-medium">Dirección:</span> {selectedOrder.customer.address}</p>
                </div>
              </div>

              {/* Información de envío */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">🚚 Información de Envío</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Método:</span> {selectedOrder.shippingMethod}</p>
                  <p><span className="font-medium">Estado:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </p>
                  {selectedOrder.trackingNumber && (
                    <p><span className="font-medium">Tracking:</span> {selectedOrder.trackingNumber}</p>
                  )}
                  <p><span className="font-medium">Entrega estimada:</span> {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('es-ES')}</p>
                  {selectedOrder.deliveredDate && (
                    <p><span className="font-medium">Entregado:</span> {new Date(selectedOrder.deliveredDate).toLocaleDateString('es-ES')}</p>
                  )}
                </div>
              </div>

              {/* Productos */}
              <div className="lg:col-span-2">
                <h3 className="font-semibold text-gray-900 mb-3">📦 Productos</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Producto</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Cantidad</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Precio</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map(item => (
                        <tr key={item.id}>
                          <td className="px-4 py-2 text-sm">{item.name}</td>
                          <td className="px-4 py-2 text-sm text-center">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm text-right">${item.price.toFixed(2)}</td>
                          <td className="px-4 py-2 text-sm text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                      <tr>
                        <td colSpan="3" className="px-4 py-2 text-right font-semibold">Total:</td>
                        <td className="px-4 py-2 text-right font-bold text-lg">
                          ${selectedOrder.total.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Timeline de tracking */}
              <div className="lg:col-span-2">
                <h3 className="font-semibold text-gray-900 mb-3">📍 Seguimiento del Pedido</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-4">
                    {getOrderTimeline(selectedOrder).map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-100' : 'bg-gray-200'
                        }`}>
                          <span className="text-lg">{step.icon}</span>
                        </div>
                        <div className="flex-grow">
                          <p className={`font-medium ${
                            step.completed ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.status}
                          </p>
                          <p className="text-sm text-gray-500">{step.date}</p>
                        </div>
                        {index < getOrderTimeline(selectedOrder).length - 1 && (
                          <div className="absolute ml-5 mt-10 h-16 w-0.5 bg-gray-300"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Información de pago */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">💳 Información de Pago</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Método:</span> {selectedOrder.paymentMethod}</p>
                  <p><span className="font-medium">Estado:</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </p>
                </div>
              </div>

              {/* Notas */}
              {selectedOrder.notes && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">📝 Notas</h3>
                  <p className="text-sm text-gray-700">{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="flex gap-3 mt-6 pt-6 border-t">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                📧 Enviar Confirmación
              </button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors">
                🖨️ Imprimir Factura
              </button>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;