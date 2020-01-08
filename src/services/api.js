import axios from 'axios';

// export const api = {
//   fetchTodoById
// };  




export const fetchTodoById = id => {
  const _axios = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 50000,
    headers: { "Content-Type": "application/json" }
  });

  const URL = `/todo/mytodo/${id}`;
  const token = localStorage.getItem('token');
  const options = {
      headers: {
        Authorization: 'Bearer '+token
      }
    };
    return _axios.get(URL, options)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
