import React, { useState, useEffect } from 'react';
import { alumnoService } from '../../services/alumnoService';
import AlumnoForm from './AlumnoForm';
import './Alumnos.css';

function AlumnoList() {
  const [alumnos, setAlumnos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAlumno, setEditingAlumno] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAlumnos();
  }, []);

  const loadAlumnos = async () => {
    try {
      const data = await alumnoService.getAll();
      setAlumnos(data);
    } catch (error) {
      console.error('Error cargando alumnos:', error);
      setError('Error al cargar los alumnos');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este alumno?')) {
      try {
        await alumnoService.delete(id);
        loadAlumnos();
      } catch (error) {
        setError('Error al eliminar el alumno');
      }
    }
  };

  const handleEdit = (alumno) => {
    setEditingAlumno(alumno);
    setShowForm(true);
  };

  const handleSave = async (alumno) => {
    try {
      if (alumno.id) {
        await alumnoService.update(alumno.id, alumno);
      } else {
        await alumnoService.create(alumno);
      }
      setShowForm(false);
      setEditingAlumno(null);
      loadAlumnos();
    } catch (error) {
      setError(error.response?.data || 'Error al guardar el alumno');
    }
  };

  return (
    <div className="alumno-list">
      <div className="header">
        <h2>Gestión de Alumnos</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          + Nuevo Alumno
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <AlumnoForm
          alumno={editingAlumno}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingAlumno(null);
          }}
        />
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Fecha Nac.</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td>{alumno.id}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.email}</td>
                <td>{alumno.fechaNacimiento}</td>
                <td>
                  <button onClick={() => handleEdit(alumno)} className="btn-edit">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(alumno.id)} className="btn-delete">
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

export default AlumnoList;