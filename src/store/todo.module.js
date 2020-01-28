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

        // const token = localStorage.getItem('token');
        // const options = {
        //     headers: {
        //       Authorization: 'Bearer '+token
        //     }
        //   };

        // _axios
        // .post(`/todo/create`,todo,options)
        // .then(function(response) {
        //     commit('MU_ADD_TODO', response.data);
        // })
        // .catch(function(error) {
        //     dispatch("alert/error", error, { root: true });
        // });

       
            commit('MU_ADD_TODO', todo);
        
        


        
    },
    action_delete_todo({ dispatch, commit }, id) {
        const token = localStorage.getItem('token');
        const options = {
            headers: {
              Authorization: 'Bearer '+token
            }
          };
        _axios
        .delete(`/todo/mytodo/delete/${id}`,options)
        .then(function() {
            commit('MU_DELETE_TODO', id);
        })
        .catch(function(error) {
            dispatch("alert/error", error, { root: true });
        });
        
    },
    action_toggle_completed_todo({dispatch,commit }, payload) {
        const token = localStorage.getItem('token');
        const options = {
            headers: {
              Authorization: 'Bearer '+token
            }
          };

        _axios
        .put(`/todo/mytodo/togglestatus?todoId=${payload.id}&completionStatus=${payload.completionstatus}`,null,options)
        .then(function() {
            commit('MU_TOGGLE_COMPLETED_STATUS', payload);
        })
        .catch(function(error) {
            dispatch("alert/error", error, { root: true });
        });
        
    },
    action_edit_todo({ commit }, todo) {

        // const token = localStorage.getItem('token');
        // const options = {
        //     headers: {
        //       Authorization: 'Bearer '+token
        //     }
        //   };

        // _axios
        // .put(`/todo/mytodo/update/${todo.id}`,todo,options)
        // .then(function() {
        //     commit('MU_EDIT_TODO', todo);
        // })
        // .catch(function(error) {
        //     dispatch("alert/error", error, { root: true });
        // });
        commit('MU_EDIT_TODO', todo);
        
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
        let index = state.todos.findIndex(todo => todo.id == id);
        if(index >=0){
            console.log('deleteing todo is: ' + state.todos[index].id);
            state.todos.splice(index, 1);
        }
    },
    MU_TOGGLE_COMPLETED_STATUS(state, payload) {
        console.log('toggle id is: ' + payload.id);
        console.log('completionstats id is: ' + payload.completionstatus);
        console.log("TODOS" + JSON.stringify(state.todos));
        let index = state.todos.findIndex(todo => todo.id == payload.id);
        console.log('index  is: ' + index);
        if(index >=0){
            state.todos[index].completionStatus=payload.completionstatus;
        }
    },
    MU_EDIT_TODO(state, newtodo) {
        console.log("After edit todo object is " + JSON.stringify(newtodo));
        let index = state.todos.findIndex(todo => todo.id == newtodo.id);
        console.log('index  is: ' + index);
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
        return state.todos.filter(todo => todo.completionStatus=='C')
    },
    incompletedTodos: state => {
        return state.todos.filter(todo => todo.completionStatus == 'O')
    },
    inprogessTodos: state => {
        return state.todos.filter(todo => todo.completionStatus == 'I')
    }
    

};

export const todo = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
