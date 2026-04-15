import React, { useState, useEffect } from 'react';
import { notaService } from '../../services/notaService';
import { alumnoService } from '../../services/alumnoService';
import { materiaService } from '../../services/materiaService';

function NotaForm() {
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [formData, setFormData] = useState({
    alumno: { id: '' },
    materia: { id: '' },
    valor: '',
    fechaRegistro: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadAlumnos();
    loadMaterias();
  }, []);

  const loadAlumnos = async () => {
    try {
      const data = await alumnoService.getAll();
      setAlumnos(data);
    } catch (error) {
      setError('Error cargando alumnos');
    }
  };

  const loadMaterias = async () => {
    try {
      const data = await materiaService.getAll();
      setMaterias(data);
    } catch (error) {
      setError('Error cargando materias');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'alumnoId') {
      setFormData({
        ...formData,
        alumno: { id: parseInt(value) },
      });
    } else if (name === 'materiaId') {
      setFormData({
        ...formData,
        materia: { id: parseInt(value) },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validar nota entre 0 y 10
    const valor = parseFloat(formData.valor);
    if (valor < 0 || valor > 10) {
      setError('La nota debe estar entre 0 y 10');
      return;
    }

    try {
      await notaService.create(formData);
      setSuccess('Nota registrada correctamente');
      setFormData({
        alumno: { id: '' },
        materia: { id: '' },
        valor: '',
        fechaRegistro: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      setError(error.response?.data || 'Error al registrar la nota');
    }
  };

  return (
    <div className="nota-form">
      <h2>Registrar Nota</h2>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Alumno:</label>
          <select
            name="alumnoId"
            value={formData.alumno.id || ''}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar alumno</option>
            {alumnos.map((alumno) => (
              <option key={alumno.id} value={alumno.id}>
                {alumno.nombre} {alumno.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Materia:</label>
          <select
            name="materiaId"
            value={formData.materia.id || ''}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar materia</option>
            {materias.map((materia) => (
              <option key={materia.id} value={materia.id}>
                {materia.nombre} ({materia.codigo})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Nota (0-5):</label>
          <input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="10"
            required
          />
        </div>

        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="date"
            name="fechaRegistro"
            value={formData.fechaRegistro}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Registrar Nota</button>
      </form>
    </div>
  );
}

export default NotaForm;