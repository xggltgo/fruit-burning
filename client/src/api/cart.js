import request from './request';

export async function getAllCart() {
  return await request.get('/api/cart');
}

export async function updateCartInfo(id, data) {
  return await request.put(`/api/cart/${id}`, data);
}

export async function deleteOneCart(id) {
  return await request.delete(`/api/cart/${id}`);
}

export async function deleteSomeCart(ids) {
  return await request.delete(`/api/cart`, {
    data: {
      ids,
    },
  });
}

export async function addOneCart(data) {
  return await request.post(`/api/cart`, data);
}
