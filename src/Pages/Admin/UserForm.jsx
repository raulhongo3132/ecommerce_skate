import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    if (isEdit) {
      setFormData({
        name: "Usuario demo",
        image: "",
        description: "Bio demo"
      });
    }
  }, [isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      console.log("Actualizar usuario", formData);
    } else {
      console.log("Crear usuario", formData);
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center p-6">
      <div className="bg-gray-900 w-full max-w-xl p-8 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? "Editar Usuario" : "Crear Usuario"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Imagen (URL)"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg"
          />

          <textarea
            placeholder="Descripción"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg"
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Guardar
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UserForm;