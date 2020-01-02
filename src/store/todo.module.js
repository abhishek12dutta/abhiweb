const state = {
    //todos: [],
    todos: [
        {
            id:1,
            title: "Todo Item 1...",
            desc: "This is First ToDO item",
            completed: false,
            date: "22/11/2019"
        },
        {
            id:2,
            title: "Todo Item 2",
            desc: "This is First ToDO item",
            completed: false,
            date: "22/11/2019"
        },
        {
            id:3,
            title: "Todo Item 3",
            desc: "This is First ToDO item",
            completed: true,
            date: "22/11/2019"
        },
        {
            id:4,
            title: "Todo Item 4",
            desc: "This is First ToDO item",
            completed: false,
            date: "22/11/2019"
        },
        {
            id:5,
            title: "Todo Item 5",
            desc: "This is First ToDO item",
            completed: false,
            date: "22/11/2019"
        },
        {
            id:6,
            title: "Todo Item 6",
            desc: "This is First ToDO item",
            completed: true,
            date: "22/11/2019"
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
