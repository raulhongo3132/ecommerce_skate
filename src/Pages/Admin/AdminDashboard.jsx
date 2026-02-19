import { useState } from "react";

/* ---------------- Modal Reutilizable ---------------- */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-lg rounded-xl p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

/* ---------------- Admin Dashboard ---------------- */
const AdminDashboard = () => {
  const [products, setProducts] = useState([{ id: 1, name: "skate", price: 100, image: "", description: "Demo" }]);
  const [users, setUsers] = useState([{ id: 1, name: "roberto", image: "", description: "Usuario demo" }]);

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(""); // "product" | "user"
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: ""
  });

  /* ---------- Abrir modal ---------- */
  const openCreate = (type) => {
    setMode(type);
    setEditingItem(null);
    setFormData({ name: "", image: "", description: "", price: "" });
    setIsOpen(true);
  };

  const openEdit = (type, item) => {
    setMode(type);
    setEditingItem(item);
    setFormData(item);
    setIsOpen(true);
  };

  /* ---------- Guardar ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "product") {
      if (editingItem) {
        setProducts(products.map(p => (p.id === editingItem.id ? formData : p)));
      } else {
        setProducts([...products, { ...formData, id: Date.now() }]);
      }
    }

    if (mode === "user") {
      if (editingItem) {
        setUsers(users.map(u => (u.id === editingItem.id ? formData : u)));
      } else {
        setUsers([...users, { ...formData, id: Date.now() }]);
      }
    }

    setIsOpen(false);
  };

  /* ---------- Eliminar ---------- */
  const deleteItem = (type, id) => {
    if (type === "product") setProducts(products.filter(p => p.id !== id));
    if (type === "user") setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-8 space-y-8">
      <h1 className="text-3xl font-bold">Panel Admin</h1>

      {/* Sección Productos */}
      <section className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Productos</h2>

        <button
          onClick={() => openCreate("product")}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Crear Producto
        </button>

        <div className="mt-6 space-y-2">
          {products.map(product => (
            <div key={product.id} className="flex justify-between bg-gray-800 p-3 rounded-lg">
              <span>{product.name}</span>
              <div className="space-x-3">
                <button
                  onClick={() => openEdit("product", product)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteItem("product", product.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Usuarios */}
      <section className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Usuarios</h2>

        <button
          onClick={() => openCreate("user")}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition mb-4"
        >
          Crear Usuario
        </button>

        <div className="space-y-2">
          {users.map(user => (
            <div key={user.id} className="flex justify-between bg-gray-800 p-3 rounded-lg">
              <span>{user.name}</span>
              <div className="space-x-3">
                <button
                  onClick={() => openEdit("user", user)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Modificar
                </button>
                <button
                  onClick={() => deleteItem("user", user.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">
          {editingItem ? "Editar" : "Crear"} {mode === "product" ? "Producto" : "Usuario"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-white/20 outline-none"
          />

          <input
            type="text"
            placeholder="Imagen (URL)"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-white/20 outline-none"
          />

          <textarea
            placeholder="Descripción"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-white/20 outline-none"
          />

          {mode === "product" && (
            <input
              type="number"
              placeholder="Precio"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-white/20 outline-none"
            />
          )}

          <div className="flex gap-4">
            <button type="submit" className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300">
              Guardar
            </button>
            <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
