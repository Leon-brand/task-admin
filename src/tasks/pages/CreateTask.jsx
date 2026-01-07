

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { createTask } from "../services/taskService";
import { Timestamp } from "firebase/firestore";

export const CreateTask = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: ""
  });

  const [error, setError] = useState("");

  // Obtener fecha actual en formato YYYY-MM-DD para el atributo 'min' del input
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones de longitud
    if (formData.title.length < 3 || formData.title.length > 100) {
      return setError("El título debe tener entre 3 y 100 caracteres.");
    }
    if (formData.description.length < 10 || formData.description.length > 100) {
      return setError("La descripción debe tener entre 10 y 100 caracteres.");
    }

    try {
      // Conviertel string del input date a un objeto Date de JS y luego a yimestamp de Firebase
      const dateObj = new Date(formData.dueDate);
      
      await createTask({
        ...formData,
        dueDate: Timestamp.fromDate(dateObj),
        userId: user.uid
      });

      navigate("/"); // Regresar al dashboard tras éxito
    } catch (err) {
      console.error(err);
      setError("Error al guardar la tarea en el servidor.");
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nueva Tarea</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Fecha de Vencimiento:</label>
          <input
            type="date"
            name="dueDate"
            required
            min={today}
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Prioridad:</label>
          <select
            name="priority"
            required
            value={formData.priority}
            onChange={handleChange}
          >
                <option value="">Seleccione...</option>
                <option value="Bajo">Bajo</option>
                <option value="Medio">Medio</option>
                <option value="Alto">Alto</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit">Crear Tarea</button>
          <button type="button" onClick={() => navigate("/")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};