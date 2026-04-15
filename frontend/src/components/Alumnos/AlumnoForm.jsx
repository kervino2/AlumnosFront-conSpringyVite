import React, { useState } from 'react';

function AlumnoForm({ alumno, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: alumno?.id || null,
    nombre: alumno?.nombre || '',
    apellido: alumno?.apellido || '',
    email: alumno?.email || '',
    fechaNacimiento: alumno?.fechaNacimiento || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{alumno ? 'Editar Alumno' : 'Nuevo Alumno'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha Nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary">Guardar</button>
            <button type="button" onClick={onCancel} className="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlumnoForm;
