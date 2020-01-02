import router from '../router';
import { userService } from '../services/user.service';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    async login({ dispatch, commit }, payload) {

        //const payload = {'USER_NAME': this.username, 'PASSWORD': this.password};
        const username = payload.USER_NAME;
        const password = payload.PASSWORD;

        commit('MU_LOGIN_REQUEST', { username });
    
        userService.login(username, password)
            .then(
                user => {
                    commit('MU_LOGIN_SUCCESS', user);
                    router.push('/');
                },
                error => {
                    commit('MU_FAILED_LOGIN', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    async logout({ commit }) {
        userService.logout();
        commit('MU_LOGOUT');
    },
    async register({ dispatch, commit }, registerUser) {
        console.log(registerUser);
        commit('MU_REGISTER_USER');
        
            userService.register(registerUser)
                .then(
                    registerUser => {
                        console.log(registerUser);
                        commit('MU_REGISTER_SUCCESS');
                        router.push('/login');
                        setTimeout(() => {
                            // display success message after route change completes
                            dispatch('alert/success', 'Registration successful', { root: true });
                        })
                    },
                    error => {
                        commit('MU_REGISTER_FALIURE', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        }
    };

    const mutations = {
        MU_LOGIN_REQUEST(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        MU_LOGIN_SUCCESS(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        MU_FAILED_LOGIN(state) {
            state.status = {};
            state.user = null;
        },
        MU_LOGOUT(state) {
            state.status = {};
            state.user = null;
        },
        MU_REGISTER_USER(state) {
            state.status = { registering: true };
        },
        MU_REGISTER_SUCCESS(state) {
            state.status = {};
        },
        MU_REGISTER_FALIURE(state, error) {
            console.log(error);
            state.status = {};
        }
    };

    export const account = {
        namespaced: true,
        state,
        actions,
        mutations
    };