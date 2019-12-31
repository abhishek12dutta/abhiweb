import router from '../router';
import { userService } from '../services/user.service';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, payload) {

        //const payload = {'USER_NAME': this.username, 'PASSWORD': this.password};
        const username = payload.USER_NAME;
        const password = payload.PASSWORD;

        commit('loginRequest', { username });
    
        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, registerUser) {
        console.log(registerUser);
        commit('registerRequest');
        
            userService.register(registerUser)
                .then(
                    registerUser => {
                        console.log(registerUser);
                        commit('registerSuccess');
                        router.push('/login');
                        setTimeout(() => {
                            // display success message after route change completes
                            dispatch('alert/success', 'Registration successful', { root: true });
                        })
                    },
                    error => {
                        commit('registerFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        }
    };

    const mutations = {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        },
        registerRequest(state) {
            state.status = { registering: true };
        },
        registerSuccess(state) {
            state.status = {};
        },
        registerFailure(state, error) {
            alert(error);
            state.status = {};
        }
    };

    export const account = {
        namespaced: true,
        state,
        actions,
        mutations
    };