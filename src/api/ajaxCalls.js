import axios from "axios";

module.exports = {
  getAllMenuItems: () => {
    return axios.get("/menu").then(response => response.data);
  },
  getMenuItems: id => {
    return axios.get(`/menu/${id}`).then(response => response.data);
  }
};
