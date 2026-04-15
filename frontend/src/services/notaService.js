import api from './api';

export const notaService = {
  // Obtener todas las notas
  getAll: async () => {
    const response = await api.get('/notas');
    return response.data;
  },

  // Obtener notas por alumno
  getByAlumno: async (alumnoId) => {
    const response = await api.get(`/notas/alumno/${alumnoId}`);
    return response.data;
  },

  // Obtener notas por alumno y materia
  getByAlumnoMateria: async (alumnoId, materiaId) => {
    const response = await api.get(`/notas/alumno/${alumnoId}/materia/${materiaId}`);
    return response.data;
  },

  // Crear nota
  create: async (nota) => {
    const response = await api.post('/notas', nota);
    return response.data;
  },

  // Eliminar nota
  delete: async (id) => {
    await api.delete(`/notas/${id}`);
  },
};