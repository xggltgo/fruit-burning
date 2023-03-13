import { defineStore } from "pinia";
import * as userApi from "../api/receive";

export const useReceiveStore = defineStore("receive", {
  state: () => ({ receiveList: [] }),
  actions: {
    async getAllReceive() {
      const result = await userApi.getAllReceive();
      this.receiveList = result;
      return result;
    },
    async updataReceiveInfo(receiveInfo) {
      if (receiveInfo.isDefault) {
        const item = this.receiveList.find((item) => item.isDefault);
        if (item) {
          item.isDefault = false;
        }
      }
      this.receiveList = this.receiveList.map((item) => {
        if (item.id === receiveInfo.id) {
          return receiveInfo;
        } else {
          return item;
        }
      });
      this.receiveList = this.receiveList.sort(
        (a, b) => b.isDefault - a.isDefault
      );
      const data = { ...receiveInfo };
      delete data.id;
      const result = await userApi.updateReceiveInfo(receiveInfo.id, data);
    },
    async addReceiveInfo(receiveInfo) {
      if (receiveInfo.isDefault) {
        const item = this.receiveList.find((item) => item.isDefault);
        if (item) {
          item.isDefault = false;
        }
      }
      const result = await userApi.addReceive(receiveInfo);
      this.receiveList.push(result);
      this.receiveList = this.receiveList.sort((a, b) => {
        return b.isDefault - a.isDefault;
      });
    },
    async removeReceiveInfo(id) {
      this.receiveList = this.receiveList.filter((item) => item.id !== id);
      const result = await userApi.removeReceive(id);
      return result;
    },
    initStore() {
      this.receiveList = [];
    },
  },
});
