import { defineStore } from 'pinia';
import * as userApi from '../api/admin';

export const useAdminStore = defineStore('admin', {
  state: () => ({ adminInfo: null }),
  actions: {
    async login(data) {
      const result = await userApi.login(data);
      this.adminInfo = result;
      return result;
    },
    async whoAmI() {
      const result = await userApi.whoAmI();
      this.adminInfo = result;
      return result;
    },
    async loginOut() {
      localStorage.removeItem('token');
      this.adminInfo = null;
    },
    async update(data) {
      const result = await userApi.updateAdminInfo(data);
      this.adminInfo = result;
      return result;
    },
  },
});
