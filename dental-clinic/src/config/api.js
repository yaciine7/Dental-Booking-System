export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const buildApiUrl = (endpoint = '/') => {
  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};
