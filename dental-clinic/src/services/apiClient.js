import { buildApiUrl } from '../config/api';

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(buildApiUrl(endpoint), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (payload && (payload.message || payload.error)) || 'Request failed';
    throw new Error(message);
  }

  return payload;
}
