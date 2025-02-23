import request from "./request";

export default {
  getTableData() {
    return request({
      url: "/home/getTableData",
    });
  },
  getCountData() {
    return request({
      url: "/home/getCountData",
    });
  },
  getChartData() {
    return request({
      url: "/home/getChartData",
    });
  },
  getUserData(data) {
    return request({
      url: "/home/getUserData",
      data,
    });
  },
  deleteUser(data) {
    return request({
      url: "/user/deleteUser",
      data,
    });
  },
  addUser(data) {
    return request({
      url: "/user/addUser",
      method: "post",
      data,
    });
  },
  editUser(data) {
    return request({
      url: "/user/editUser",
      method: "post",
      data,
    });
  },
  getMenu(params) {
    return request({
      url: "/permission/getMenu",
      method: "post",
      data: params,
    });
  },
};
