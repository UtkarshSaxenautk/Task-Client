import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const createList = (name , userId) => {
  return axios.post(API_URL + "list", {
      name,
      userId
  });
};


export default {
  createList
};
