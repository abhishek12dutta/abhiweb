const state = {
    type: null,
    message: null
};

const actions = {
    success({ commit }, message) {
        commit('MU_SUCCESS_MSG', message);
    },
    error({ commit }, message) {
        commit('MU_ERROR_MSG', message);
    },
    clear({ commit }, message) {
        commit('MU_SUCCESS_MSG', message);
    }
};

const mutations = {
    MU_SUCCESS_MSG(state, message) {
        state.type = 'alert-success';
        state.message = message;
    },
    MU_ERROR_MSG(state, message) {
        state.type = 'alert-danger';
        state.message = message;
    },
    MU_CLEAR_MSG(state) {
        state.type = null;
        state.message = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};
