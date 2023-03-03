import request from './request';

export async function login(data) {
  return await request.post('/api/user/login', data);
}

export async function whoAmI() {
  return await request.get('/api/user/whoami');
}

export async function updateUserInfo(data) {
  return await request.put('/api/user', data);
}

// 判断账号是否存在
export async function exist(loginId) {
  return await request.get('/api/user', {
    params: {
      loginId,
    },
  });
}

// 注册
export async function register(data) {
  return await request.post('/api/user/register', data);
}
