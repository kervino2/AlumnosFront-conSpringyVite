import api from './api';

export const alumnoService = {
  // Obtener todos los alumnos
  getAll: async () => {
    const response = await api.get('/alumnos');
    return response.data;
  },

  // Obtener alumno por ID
  getById: async (id) => {
    const response = await api.get(`/alumnos/${id}`);
    return response.data;
  },

  // Crear alumno
  create: async (alumno) => {
    const response = await api.post('/alumnos', alumno);
    return response.data;
  },

  // Actualizar alumno
  update: async (id, alumno) => {
    const response = await api.put(`/alumnos/${id}`, alumno);
    return response.data;
  },

  // Eliminar alumno
  delete: async (id) => {
    await api.delete(`/alumnos/${id}`);
  },
};