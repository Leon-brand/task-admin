


export const TaskFilters = ({ filters, setFilters }) => {
const handleChange = (e) => {  
  const { name, value } = e.target   // Desestructuramos el nombre y el valor del campo de entrada del evento.
  // Actualizamos los filtros utilizando el estado 'setFilters'.
  // Creamos una copia del estado anterior 'prev' y sobrescribimos el valor de la propiedad 'name' con el nuevo valor 'value'.
  // Esto se hace para mantener el resto del estado sin cambios.
  setFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
}

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label>Estado:</label>
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="Todas">Todas</option>
          <option value="Creada">Creada</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Terminada">Terminada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Prioridad:</label>
        <select name="priority" value={filters.priority} onChange={handleChange}>
          <option value="Todas">Todas</option>
          <option value="Bajo">Bajo</option>
          <option value="Medio">Medio</option>
          <option value="Alto">Alto</option>
        </select>
      </div>
    </div>
  );
};