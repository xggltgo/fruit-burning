import { defineStore } from 'pinia';
import * as cartApi from '../api/cart';

export const useCartStore = defineStore('cart', {
  state: () => ({ cartList: [] }),
  actions: {
    async getAllCart() {
      const result = await cartApi.getAllCart();
      this.cartList = result;
      return result;
    },
    // 删除结算后的购物车记录
    async deteleDoneCart() {
      const ids = this.cartList
        .filter((item) => item.checked === true)
        .map((item) => item.id);
      cartApi.deleteSomeCart(ids);
      // 同步本地仓库
      this.cartList = this.cartList.filter((item) => item.checked === false);
    },
    initStore() {
      this.cartList = [];
    },
  },
});
