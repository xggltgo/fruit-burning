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
