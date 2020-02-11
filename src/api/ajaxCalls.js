import axios from "axios";

module.exports = {
  testCall: (id = "") => {
    console.log("ajax:", id);
    return axios.put(`/menu/${id}`).then(response => response.data);
  },
  getAllMenuItems: () => {
    return axios
      .get("/menu")
      .then(response => response.data)
      .catch(err => console.log(err));
  },
  getMenuItems: id => {
    return axios.get(`/menu/${id}`).then(response => response.data);
  }
};
