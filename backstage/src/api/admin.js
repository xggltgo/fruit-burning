import request from './request';

export async function login(data) {
  return await request.post('/api/admin/login', data);
}

export async function whoAmI() {
  return await request.get('/api/admin/whoami');
}

export async function updateAdminInfo(data) {
  return await request.put('/api/admin', data);
}
