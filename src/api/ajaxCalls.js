import axios from "axios";

export default {
  getAllMenuItems() {
    return axios.get("/menu").then(response => console.log(response));
  }
};
