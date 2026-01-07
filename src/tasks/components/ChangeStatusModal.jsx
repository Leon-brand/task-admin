


import { useState } from "react";

export const ChangeStatusModal = ({ task, onClose, onUpdate }) => {
  const [newStatus, setNewStatus] = useState("");

  // 1. Validar si la tarea está vencida
  const isExpired = task.dueDate?.toDate() < new Date();

  // 2. Definir transiciones permitidas según reglas de negocio
  const getAllowedOptions = () => {
    if (isExpired) return [];
    if (task.status === "Creada") return ["En Proceso", "Cancelada"];
    if (task.status === "En Proceso") return ["Terminada", "Cancelada"];
    return []
  };

  const options = getAllowedOptions();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newStatus) onUpdate(task.id, newStatus);
  };

/*   return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Actualizar Estado</h3>
        <p><strong>Tarea:</strong> {task.title}</p>
        <p><strong>Estado actual:</strong> {task.status}</p>
        
        {isExpired && <p className="error-text">Tarea vencida. Ya No se puede modificar.</p>}

        {options.length > 0 ? (
          <form onSubmit={handleSubmit}>
            <select 
              value={newStatus} 
              onChange={(e) => setNewStatus(e.target.value)}
              required
            >
              <option value="">Seleccione nuevo estado...</option>
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="modal-actions">
              <button type="submit" disabled={!newStatus}>Confirmar</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        ) : (
          !isExpired && (
            <>
              <p>Esta tarea ya no permite más cambios de estado.</p>
              <button onClick={onClose}>Cerrar</button>
            </>
          )
        )}
      </div>
    </div>
  ); */

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 style={{textAlign: 'center'}}>Actualizar Estado</h3>
        <p><strong>Tarea:</strong> {task.title}</p>
        <p><strong>Estado actual:</strong> {task.status}</p>
        
        {isExpired && (
          <p className="error-text">Tarea vencida. Ya No se puede modificar.</p>
        )}

        {options.length > 0 ? (
          <form onSubmit={handleSubmit}>
            <select 
              value={newStatus} 
              onChange={(e) => setNewStatus(e.target.value)}
              required
            >
              <option value="">Seleccione nuevo estado...</option>
              {options.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button type="submit" disabled={!newStatus}>
                Confirmar
              </button>
              <button type="button" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          !isExpired && (
            <div className="modal-no-options">
              <p>Esta tarea ya no permite más cambios de estado.</p>
              <button type="button" className="btn-delete" onClick={onClose}>
                Cerrar
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};