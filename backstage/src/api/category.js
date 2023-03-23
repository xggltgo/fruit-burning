import request from './request';

export async function getAllCategories() {
  return await request.get('/api/category');
}

export async function getCategoryInfoById(id) {
  return await request.get(`/api/category/${id}`);
}

export async function deleteCategoryInfoById(id) {
  return await request.delete(`/api/category/${id}`);
}

export async function UpdateCategoryInfoById(id, data) {
  return await request.put(`/api/category/${id}`, data);
}

export async function addOneCategory(data) {
  return await request.post('/api/category', data);
}
