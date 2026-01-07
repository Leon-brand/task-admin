

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getUserTasks, updateTaskStatus, deleteTask } from "../services/taskService";
import { TaskCard } from "../components/TaskCard";
import { TaskFilters } from "../components/TaskFilters";
import { useNavigate } from "react-router-dom";
import { ChangeStatusModal } from "../components/ChangeStatusModal";


export const TaskList = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  // Estado para los criterios de filtrado
  const [filters, setFilters] = useState({
    status: "Todas",
    priority: "Todas",
  });

  // Carga inicial de tareas desde Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getUserTasks(user.uid);
        setTasks(data);
      } catch (error) {
        console.error("Error cargando tareas:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTasks();
  }, [user]);

  // Función para manejar la actualización de estado desde el modal
  const handleUpdateStatus = async (taskId, nextStatus) => {
    try {
      await updateTaskStatus(taskId, nextStatus);
      
      // Actualización optimista del estado local para evitar recargar de la DB
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t))
      );
      setSelectedTask(null);
    } catch (err) {
      console.error("Error al actualizar el estado de la tarea:", err);
      alert("No se pudo actualizar el estado");
    }
  };

  const handleDeleteTask = async (taskId) => {
  const confirmed = window.confirm(
    "¿Estás seguro de que deseas eliminar esta tarea?"
  );

  if (!confirmed) return;

  try {
    await deleteTask(taskId);

    // Actualizar estado local
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  } catch (error) {
    alert("Ocurrió un error al eliminar la tarea:  ", error );
  }
};


  /**
   * Lógica de filtrado combinada en memoria.
   * Filtra por estado y prioridad simultáneamente.
   */
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchStatus = filters.status === "Todas" || task.status === filters.status;
      const matchPriority = filters.priority === "Todas" || task.priority === filters.priority;
      return matchStatus && matchPriority;
    });
  }, [tasks, filters]);

  if (loading) return <h2>Cargando tareas...</h2>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 style={{color: '#4f46e5'}}>Mis Tareas</h2>
        <div className="header-actions">
          <button onClick={() => navigate("/create")}>Nueva Tarea</button>

        </div>
      </header>

      {/* Componente de Filtros */}
      <TaskFilters filters={filters} setFilters={setFilters} />

      <div className="tasks-grid">
        {filteredTasks.length === 0 ? (
          <p className="empty-message">No se encontraron tareas con estos filtros</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-item-wrapper">
              <TaskCard task={task} />
              <div className="task-item-actions">
                <button 
                  className="btn-status"
                  onClick={() => setSelectedTask(task)}
                >
                  Cambiar Estado
                </button>

                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Cambio de Estado */}
      {selectedTask && (
        <ChangeStatusModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleUpdateStatus}
        />
      )}
    </div>
  );
};