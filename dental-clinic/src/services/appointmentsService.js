import { apiRequest } from './apiClient';

export const appointmentsService = {
  async getAll() {
    return apiRequest('/appointments');
  },

  async getById(id) {
    return apiRequest(`/appointments/${id}`);
  },

  async create(payload) {
    return apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async update(id, payload) {
    return apiRequest(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async remove(id) {
    return apiRequest(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },
};
