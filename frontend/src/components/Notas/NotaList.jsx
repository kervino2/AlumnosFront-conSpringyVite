import React, { useState, useEffect } from 'react';
import { notaService } from '../../services/notaService';
import { alumnoService } from '../../services/alumnoService';
import { materiaService } from '../../services/materiaService';
import './Notas.css';

function NotaList() {
  const [notas, setNotas] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState('');
  const [selectedMateria, setSelectedMateria] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAlumnos();
    loadMaterias();
  }, []);

  const loadAlumnos = async () => {
    try {
      const data = await alumnoService.getAll();
      setAlumnos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando alumnos:', error);
    }
  };

  const loadMaterias = async () => {
    try {
      const data = await materiaService.getAll();
      setMaterias(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando materias:', error);
    }
  };

  const loadNotas = async () => {
    if (!selectedAlumno) {
      setNotas([]);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      let data;
      if (selectedMateria) {
        // Si hay materia seleccionada, filtrar por alumno y materia
        data = await notaService.getByAlumnoMateria(selectedAlumno, selectedMateria);
      } else {
        // Si no, mostrar todas las notas del alumno
        data = await notaService.getByAlumno(selectedAlumno);
      }
      setNotas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando notas:', error);
      setError('Error al cargar las notas');
      setNotas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotas();
  }, [selectedAlumno, selectedMateria]);

  const handleAlumnoChange = (e) => {
    setSelectedAlumno(e.target.value);
    setSelectedMateria(''); // Resetear materia al cambiar alumno
  };

  const getMateriaNombre = (materiaId) => {
    const materia = materias.find(m => m.id === materiaId);
    return materia ? `${materia.nombre} (${materia.codigo})` : 'Cargando...';
  };

  return (
    <div className="nota-list">
      <h2>Notas por Alumno</h2>

      <div className="filtros">
        <div className="form-group">
          <label>Seleccionar Alumno:</label>
          <select value={selectedAlumno} onChange={handleAlumnoChange}>
            <option value="">Seleccionar alumno</option>
            {alumnos.map((alumno) => (
              <option key={alumno.id} value={alumno.id}>
                {alumno.nombre} {alumno.apellido}
              </option>
            ))}
          </select>
        </div>

        {selectedAlumno && (
          <div className="form-group">
            <label>Filtrar por Materia (opcional):</label>
            <select value={selectedMateria} onChange={(e) => setSelectedMateria(e.target.value)}>
              <option value="">Todas las materias</option>
              {materias.map((materia) => (
                <option key={materia.id} value={materia.id}>
                  {materia.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      {loading && <div className="loading">Cargando notas...</div>}

      {!loading && selectedAlumno && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Materia</th>
                <th>Nota</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {notas.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    {selectedMateria 
                      ? 'No hay notas registradas en esta materia para el alumno seleccionado'
                      : 'No hay notas registradas para este alumno'}
                  </td>
                </tr>
              ) : (
                notas.map((nota) => (
                  <tr key={nota.id}>
                    <td>{getMateriaNombre(nota.materia?.id)}</td>
                    <td>
                      {nota.valor}
                    </td>
                    <td>{nota.fechaRegistro}</td>
                    <td>
                      <button 
                        onClick={() => notaService.delete(nota.id).then(() => loadNotas())} 
                        className="btn-delete"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NotaList;