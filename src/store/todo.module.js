const axios = require("axios");

const _axios = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 50000,
  headers: { "Content-Type": "application/json" }
});

const state = {
    todos: [],
    // todos: [
    //     {
    //         id:1,
    //         title: "Todo Item 1, compled todo functionality",
	// 		priority:"High",
    //         desc: "This is First ToDO item",
    //         completed: true,
    //         date: "12/01/2019",
	// 		tags:["abc","def","fgh"]
    //     },
    //     {
    //         id:2,
    //         title: "Todo Item 2, compled todo functionality",
	// 		priority:"High",
    //         desc: "This is First ToDO item",
    //         completed: false,
    //         date: "25/01/2020",
	// 		tags:["abc","def","fgh"]
    //     },
    //     {
    //         id:3,
    //         title: "Todo Item 3, compled todo functionality",
	// 		priority:"High",
    //         desc: "This is First ToDO item",
    //         completed: true,
    //         date: "24/11/2019",
	// 		tags:["abc","def","fgh"]
    //     },
    //     {
    //         id:4,
    //         title: "Todo Item 4, compled todo functionality",
	// 		priority:"High",
    //         desc: "This is First ToDO item",
    //         completed: false,
    //         date: "01/25/2020",
	// 		tags:["abc","def","fgh"]
    //     },
    //     {
    //         id:5,
    //         title: "Todo Item 5, compled todo functionality",
	// 		priority:"High",
    //         desc: "This is First ToDO item",
    //         completed: false,
    //         date: "10/11/2019",
	// 		tags:["abc","def","fgh"]
    //     },
    //     {
    //         id:6,
    //         title: "Todo Item 6, compled todo functionality",
	// 		priority:"High",
    //         desc: "This is First ToDO item",
    //         completed: true,
    //         date: "22/11/2019",
	// 		tags:["abc","def","fgh"]
    //     }
    // ],
    todo: null
};

const actions = {
    action_add_todo({ commit }, todo) {
        commit('MU_ADD_TODO', todo);
    },
    action_delete_todo({ commit }, id) {
        commit('MU_DELETE_TODO', id);
    },
    action_toggle_completed_todo({dispatch,commit }, id) {
        const token = localStorage.getItem('token');
        const options = {
            headers: {
              Authorization: 'Bearer '+token
            }
          };

        _axios
        .put(`/todo/mytodo/togglestatus/${id}`,null,options)
        .then(function() {
            commit('MU_TOGGLE_COMPLETED_STATUS', id);
        })
        .catch(function(error) {
            dispatch("alert/error", error, { root: true });
        });
        
    },
    action_edit_todo({ dispatch, commit }, todo) {

        const token = localStorage.getItem('token');
        const options = {
            headers: {
              Authorization: 'Bearer '+token
            }
          };

        _axios
        .put(`/todo/mytodo/update/${todo.id}`,todo,options)
        .then(function() {
            commit('MU_EDIT_TODO', todo);
        })
        .catch(function(error) {
            dispatch("alert/error", error, { root: true });
        });

        
    },
    action_feth_my_todos({ commit }) {
        commit('MU_FETCH_MY_TODOS');
    }
};

const mutations = {
    MU_ADD_TODO(state, todo) {
        state.todos = [...state.todos,todo];
    },

    MU_DELETE_TODO(state, id) {
        console.log('deleteing id is: ' + id);
        let index = state.todos.findIndex(todo => todo.id === id);
        if(index >=0){
            console.log('deleteing todo is: ' + state.todos[index].id);
            state.todos.splice(index, 1);
        }
    },
    MU_TOGGLE_COMPLETED_STATUS(state, id) {
        console.log('toggle id is: ' + id);
        let index = state.todos.findIndex(todo => todo.id === id);
        console.log('index  is: ' + index);
        if(index >=0){
            state.todos[index].completed=!state.todos[index].completed;
        }
    },
    MU_EDIT_TODO(state, newtodo) {

        let index = state.todos.findIndex(todo => todo.id === newtodo.id);
        if(index >=0){
            state.todos.splice(index,1,newtodo);
        }
    },
    MU_FETCH_MY_TODOS(state){
        const token = localStorage.getItem('token');
        const options = {
            headers: {
              Authorization: 'Bearer '+token
            }
          };

        _axios
        .get("/todo/mytodos", options)
        .then(function(response) {
            state.todos=response.data;
        })
        .catch(function(error) {
          console.log(error.response);
        });
        
    }

};

const getters = {
    completedTodos: state => {
        return state.todos.filter(todo => todo.completed)
    },
    incompletedTodos: state => {
        return state.todos.filter(todo => !todo.completed)
    }


};

export const todo = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
