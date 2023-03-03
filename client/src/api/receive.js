import request from './request';

export async function getAllReceive() {
  return await request.get('/api/receive');
}

export async function updateReceiveInfo(id, data) {
  return await request.put(`/api/receive/${id}`, data);
}

export async function getReceiveById(id) {
  return await request.get(`/api/receive/${id}`);
}

export async function addReceive(data) {
  return await request.post(`/api/receive`, data);
}

export async function removeReceive(id) {
  return await request.delete(`/api/receive/${id}`);
}
