

export const TaskCard = ({ task }) => {


  const fixDate = task.dueDate?.toDate 
     ? task.dueDate.toDate().toLocaleDateString() 
    : "Sin fecha";

  return (
    <div className="task-card">
      <h3>{task.title || "Sin título"}</h3>
      <p>{task.description  || "Sin descripción"}</p>
      <p>Prioridad: {task.priority}</p>
      <p>Estado: {task.status}</p>
      <small>Vence: {fixDate}</small>
    </div>
  );
};