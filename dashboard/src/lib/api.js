const API_BASE = 'http://localhost:5000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body.message || body.error || message;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }
  return res.json();
}

export const api = {
  // Appointments
  listAppointments: () => request('/appointments'),
  updateAppointment: (id, data) =>
    request(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAppointment: (id) => request(`/appointments/${id}`, { method: 'DELETE' }),

  // Contact messages
  listMessages: () => request('/contact'),
  deleteMessage: (id) => request(`/contact/${id}`, { method: 'DELETE' }),
};
