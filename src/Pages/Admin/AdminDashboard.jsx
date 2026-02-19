import { useState } from "react";

const AdminDashboard = () => {

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-8 space-y-8">
      
      <h1 className="text-3xl font-bold">Panel Admin</h1>

      {/* Sección Productos */}
      <section className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Productos</h2>

        <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition">
          Crear Producto
        </button>

        <div className="mt-6 space-y-2">
              <div
                className="flex justify-between bg-gray-800 p-3 rounded-lg"
              >
                <span>skate</span>
                <div className="space-x-3">
                  <button className="text-blue-400 hover:text-blue-300">
                    Editar
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    Eliminar
                  </button>
                </div>
              </div>
        </div>
      </section>

      {/* Sección Usuarios */}
      <section className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Usuarios</h2>

        <div className="space-y-2">
  
              <div 
                className="flex justify-between bg-gray-800 p-3 rounded-lg"
              >
                <span>roberto</span>
                <button className="text-red-400 hover:text-red-300">
                  Eliminar
                </button>
                <button className="text-red-400 hover:text-red-300">
                  Modificar
                </button>
              </div>
        </div>
      </section>

    </div>
  );
};

export default AdminDashboard;
