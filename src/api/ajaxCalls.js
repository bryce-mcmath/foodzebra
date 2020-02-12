import axios from "axios";

module.exports = {
  getAllMenuItems: () => {
    return axios
      .get("/menu")
      .then(response => response.data)
      .catch(err => {
        console.log("ajaxCalls error", err);
        return [];
      });
  },
  getMenuItems: id => {
    return axios
      .get(`/menu/${id}`)
      .then(response => response.data)
      .catch(err => {
        console.log("ajaxCalls error", err);
        return [];
      });
  },
  loginAjaxCall: (email = "", password = "") => {
    return axios
      .post(`/login`, { email, password })
      .then(response => {
        return response;
      })
      .catch(err => {
        if (err.response.status !== 401) {
          console.log("ajaxCalls error", err);
        }
        return err.response;
      });
  }
};
