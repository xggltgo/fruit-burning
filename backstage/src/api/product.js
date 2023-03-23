import request from './request';

export async function getProductByPage({
  page = 1,
  limit = 20,
  categoryid = -1,
  status,
  keyword,
}) {
  return await request.get('/api/product', {
    params: {
      page,
      limit,
      status,
      categoryid,
      keyword,
    },
  });
}

export async function getProductById(id) {
  return await request.get(`/api/product/${id}`);
}

export async function deleteProductById(id) {
  return await request.delete(`/api/product/${id}`);
}

// 修改商品信息
export async function updateProductInfo(id, data) {
  return await request.put(`/api/product/${id}`, data);
}

export async function addOneProduct(data) {
  return await request.post('/api/product', data);
}
