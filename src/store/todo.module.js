const state = {
    //todos: [],
    todos: [
        {
            id:1,
            title: "Todo Item 1, compled todo functionality",
			priority:"High",
            desc: "This is First ToDO item",
            completed: false,
            date: "22/11/2019",
			tags:["abc","def","fgh"]
        },
        {
            id:2,
            title: "Todo Item 2, compled todo functionality",
			priority:"High",
            desc: "This is First ToDO item",
            completed: false,
            date: "23/11/2019",
			tags:["abc","def","fgh"]
        },
        {
            id:3,
            title: "Todo Item 3, compled todo functionality",
			priority:"High",
            desc: "This is First ToDO item",
            completed: true,
            date: "24/11/2019",
			tags:["abc","def","fgh"]
        },
        {
            id:4,
            title: "Todo Item 4, compled todo functionality",
			priority:"High",
            desc: "This is First ToDO item",
            completed: false,
            date: "11/11/2019",
			tags:["abc","def","fgh"]
        },
        {
            id:5,
            title: "Todo Item 5, compled todo functionality",
			priority:"High",
            desc: "This is First ToDO item",
            completed: false,
            date: "10/11/2019",
			tags:["abc","def","fgh"]
        },
        {
            id:6,
            title: "Todo Item 6, compled todo functionality",
			priority:"High",
            desc: "This is First ToDO item",
            completed: true,
            date: "22/11/2019",
			tags:["abc","def","fgh"]
        }
    ],
    todo: null
};

const actions = {
    action_add_todo({ commit }, todo) {
        commit('MU_ADD_TODO', todo);
    },
    action_delete_todo({ commit }, id) {
        commit('MU_DELETE_TODO', id);
    },
    action_toggle_completed_todo({ commit }, id) {
        commit('MU_TOGGLE_COMPLETED_STATUS', id);
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
