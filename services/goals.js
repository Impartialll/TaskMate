import axios from "axios";
const baseUrl = "http://192.168.0.111:3001/goals";

const getTest = () => {
  axios
    .get(baseUrl)
    .then((response) => {
      // Обробка успішної відповіді
      console.log(response.data);
    })
    .catch((error) => {
      // Обробка помилки
      if (error.response) {
        // Відповідь прийшла, але її статус не в межах 2xx
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // Запит був відправлений, але не отримано відповідь
        console.error("No response received:", error.request);
      } else {
        // Виникла помилка при налаштуванні запиту
        console.error("Request setup error:", error.message);
      }
    });
};

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deleteObject = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const getByCategory = (category) => {
  return axios.get(`${baseUrl}?category=${category}`);
};

export default {
  getTest: getTest,
  getAll: getAll,
  create: create,
  update: update,
  deleteObject: deleteObject,
  getByCategory: getByCategory,
};
