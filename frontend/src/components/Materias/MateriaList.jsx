import React, { useState, useEffect } from 'react';
import { materiaService } from '../../services/materiaService';
import MateriaForm from './MateriaForm';

function MateriaList() {
  const [materias, setMaterias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMateria, setEditingMateria] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMaterias();
  }, []);

  const loadMaterias = async () => {
    try {
      const data = await materiaService.getAll();
      setMaterias(data);
    } catch (error) {
      setError('Error al cargar las materias');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta materia?')) {
      try {
        await materiaService.delete(id);
        loadMaterias();
      } catch (error) {
        setError('Error al eliminar la materia');
      }
    }
  };

  const handleEdit = (materia) => {
    setEditingMateria(materia);
    setShowForm(true);
  };

  const handleSave = async (materia) => {
    try {
      if (materia.id) {
        await materiaService.update(materia.id, materia);
      } else {
        await materiaService.create(materia);
      }
      setShowForm(false);
      setEditingMateria(null);
      loadMaterias();
    } catch (error) {
      setError(error.response?.data || 'Error al guardar la materia');
    }
  };

  return (
    <div className="materia-list">
      <div className="header">
        <h2>Gestión de Materias</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          + Nueva Materia
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <MateriaForm
          materia={editingMateria}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingMateria(null);
          }}
        />
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Código</th>
              <th>Créditos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.id}>
                <td>{materia.id}</td>
                <td>{materia.nombre}</td>
                <td>{materia.codigo}</td>
                <td>{materia.creditos}</td>
                <td>
                  <button onClick={() => handleEdit(materia)} className="btn-edit">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(materia.id)} className="btn-delete">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MateriaList;