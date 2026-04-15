import api from './api';

export const materiaService = {
  getAll: async () => {
    const response = await api.get('/materias');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/materias/${id}`);
    return response.data;
  },

  create: async (materia) => {
    const response = await api.post('/materias', materia);
    return response.data;
  },

  update: async (id, materia) => {
    const response = await api.put(`/materias/${id}`, materia);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/materias/${id}`);
  },
};