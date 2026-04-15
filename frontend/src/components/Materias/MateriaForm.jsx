import React, { useState } from 'react';

function MateriaForm({ materia, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: materia?.id || null,
    nombre: materia?.nombre || '',
    codigo: materia?.codigo || '',
    creditos: materia?.creditos || 3,
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
        <h3>{materia ? 'Editar Materia' : 'Nueva Materia'}</h3>
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
            <label>Código:</label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Créditos:</label>
            <input
              type="number"
              name="creditos"
              value={formData.creditos}
              onChange={handleChange}
              min="1"
              max="6"
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

export default MateriaForm;