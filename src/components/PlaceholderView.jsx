import React from 'react';

const PlaceholderView = ({ title }) => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
    <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 text-center">
      <p className="text-gray-500 text-lg">Esta sección está en desarrollo</p>
      <p className="text-gray-400 mt-2">Pronto estará disponible</p>
    </div>
  </div>
);

export default PlaceholderView;  