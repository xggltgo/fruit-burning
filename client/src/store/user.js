import { defineStore } from 'pinia';
import { useCartStore } from '@/store/cart';
import { useReceiveStore } from '@/store/receive';
import * as userApi from '../api/user';

export const useUserStore = defineStore('user', {
  state: () => ({ userInfo: null }),
  actions: {
    async login(data) {
      const result = await userApi.login(data);
      this.userInfo = result;
      if (result) {
        // 一并初始化购物车和收货地址仓库
        useCartStore().getAllCart();
        useReceiveStore().getAllReceive();
      }
      return result;
    },
    async whoAmI() {
      const result = await userApi.whoAmI();
      this.userInfo = result;
      if (result) {
        // 一并初始化购物车和收货地址仓库
        useCartStore().getAllCart();
        useReceiveStore().getAllReceive();
      }
    },
    async loginOut() {
      localStorage.removeItem('token');
      this.userInfo = null;
      // 一并移除始化购物车和收货地址仓库
      useCartStore().initStore();
      useReceiveStore().initStore();
    },
    async update(data) {
      const result = await userApi.updateUserInfo(data);
      this.userInfo = result;
    },
  },
});
