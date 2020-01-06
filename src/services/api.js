const axios = require("axios");

export const api = {
  fetchTodoById
};  

const _axios = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 50000,
  headers: { "Content-Type": "application/json" }
});
  
function fetchTodoById(id) {
  var todo;
  getSrc(id).then(function (response) {
    todo=response.data; // now the data is accessable from here.
    console.log(todo);
  }).catch(function (response) {
    console.log(response);
  });
  return todo;
}

function getSrc(id) {   
  const token = localStorage.getItem('token');
  const options = {
      headers: {
        Authorization: 'Bearer '+token
      }
    };

  return _axios
  .get('/todo/mytodo/'+id, options)
}

