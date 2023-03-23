import request from './request';

export async function getAllOrder({ page = 1, limit = 10 }) {
  return await request.get('/api/order', {
    params: {
      page,
      limit,
    },
  });
}

export async function getOrderById(id) {
  return await request.get(`/api/order/${id}`);
}

export async function updateOrder(id, data) {
  return await request.put(`/api/order/${id}`, data);
}

export async function addOrder(data) {
  return await request.post('/api/order', data);
}

export async function removeOrder(id) {
  return await request.delete(`/api/order/${id}`);
}
