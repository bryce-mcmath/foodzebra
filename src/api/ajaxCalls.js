import axios from "axios";

export default {
  getAllMenuItems() {
    return axios.get("/menu").then(response => response);
  }
};
