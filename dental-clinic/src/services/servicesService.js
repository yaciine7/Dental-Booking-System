import { apiRequest } from './apiClient';

export const servicesService = {
  async getAll() {
    return apiRequest('/services');
  },

  async getById(id) {
    return apiRequest(`/services/${id}`);
  },

  async create(payload) {
    return apiRequest('/services', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async update(id, payload) {
    return apiRequest(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async remove(id) {
    return apiRequest(`/services/${id}`, {
      method: 'DELETE',
    });
  },
};
