import { apiRequest } from './apiClient';

export const contactService = {
  async sendMessage(payload) {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async getMessages() {
    return apiRequest('/contact');
  },
};
