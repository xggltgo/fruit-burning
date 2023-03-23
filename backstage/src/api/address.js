import request from './request';

export async function getCityList() {
  return await request.get('/api/citylist');
}

