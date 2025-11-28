// src/services/api.ts
const BASE_URL = "http://localhost:8082/api";

export async function login(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
}
export const API_BASE = 'http://localhost:8082/api';

async function request(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  try { return await res.json(); } catch { return null; }
}

export const Api = {
  getProperties: async () => request('/properties'),
  getProperty: async (id: string | number) => request(`/properties/${id}`),
  addProperty: async (landlordId: string | number, payload: any) => request(`/add-property?landlordId=${landlordId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
  getLeases: async (userId: any) => request(`/leases?userId=${userId}`),
  createLease: async (payload: any) => request('/leases', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
  getPayments: async (userId?: any) => request(`/payments${userId ? `?userId=${userId}` : ''}`),
  createPayment: async (payload: any) => request('/payments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
  getMessages: async (conversationId: any) => request(`/messages?conversationId=${conversationId}`),
  sendMessage: async (payload: any) => request('/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
  updateProperty: async (id: any, payload: any) => request(`/properties/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
};

export default Api;
