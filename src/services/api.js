import axios from 'axios';

// export const api = {
//   fetchTodoById
// };  

const _axios = axios.create({
  baseURL: "http://192.168.0.103:8080/api",
  timeout: 50000,
  headers: { "Content-Type": "application/json" }
});


export const fetchTodoById = id => {
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

export const createNewTODO = todo => {
  const URL = `/todo/create`;
  const token = localStorage.getItem('token');
  const options = {
      headers: {
        Authorization: 'Bearer '+token
      }
    };
    return _axios
        .post(URL,todo,options)
        .then(response => response.data)
        .catch(function(error) {
          throw error;
        });
};

export const editTodo = todo => {
  const URL = `/todo/mytodo/update/${todo.id}`;
  const token = localStorage.getItem('token');
  const options = {
      headers: {
        Authorization: 'Bearer '+token
      }
    };
    return  _axios
    .put(URL,todo,options)
    .then(response => response.data)
    .catch(function(error) {
      throw error;
    });
};