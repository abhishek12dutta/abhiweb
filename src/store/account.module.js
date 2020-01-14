import router from "../router";
//import { userService } from "../services/user.service";
const axios = require("axios");

const _axios = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 50000,
  headers: { "Content-Type": "application/json" }
});

const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const actions = {
  async login({ dispatch, commit }, payload) {
    //const payload = {'USER_NAME': this.username, 'PASSWORD': this.password};
    const username = payload.USER_NAME;
    const password = payload.PASSWORD;

    commit("MU_LOGIN_REQUEST", { username });

    // userService.login(username, password)
    //     .then(
    //         user => {
    //             commit('MU_LOGIN_SUCCESS', user);
    //             router.push('/');
    //         },
    //         error => {
    //             commit('MU_FAILED_LOGIN', error);
    //             dispatch('alert/error', error, { root: true });
    //         }
    //     );

    _axios
      .post("/auth/signin", {
        usernameOrEmail: username,
        password: password
      })
      .then(function(response) {
        const data = response.data;
        if (response.status == 200) {
          const token = data.accessToken;
          const tokenType = data.tokenType;
          const options = {
            headers: {
              Authorization: tokenType + " " + token
            }
          };
          _axios
            .get("/user/me", options)
            .then(function(response) {
              const userData = response.data;
              localStorage.setItem('user', JSON.stringify(userData));
              localStorage.setItem('token', token);
              commit("MU_LOGIN_SUCCESS", userData);
              router.push("/");
            })
            .catch(function(error) {
              console.log(error.response);
              commit("MU_FAILED_LOGIN", error);
              dispatch("alert/error", error, { root: true });
            });
        }
      })
      .catch(function(error) {
        commit("MU_FAILED_LOGIN", error);
        dispatch("alert/error", error, { root: true });
      });
  },
  async logout({ commit }) {
    //userService.logout();

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    commit("MU_LOGOUT");
  },
  // async register({ dispatch, commit }, registerUser) {
  //     commit('MU_REGISTER_USER');
  //         userService.register(registerUser)
  //             .then(
  //                 data => {
  //                     console.log(registerUser);
  //                     commit('MU_REGISTER_SUCCESS');
  //                     router.push('/login');
  //                     setTimeout(() => {
  //                         // display success message after route change completes
  //                         dispatch('alert/success', data.message, { root: true });
  //                     })
  //                 },
  //                 error => {
  //                     commit('MU_REGISTER_FALIURE', error);
  //                     dispatch('alert/error', error, { root: true });
  //                 }
  //             );
  //     }
  async register({ dispatch, commit }, user) {
    commit("MU_REGISTER_USER");
    _axios
      .post("/auth/signup", {
        name: user.fullname,
        username: user.username,
        email: user.email,
        password: user.password,
        personalDetails: {
          country: user.countrycode,
          pincode: "723133",
          phnextn: parseInt(user.phnext),
          phnno: parseInt(user.phnno)
        }
      })
      .then(function(response) {
        const data = response.data;
        console.log(response);
        if (response.status == 201) {
          commit("MU_REGISTER_SUCCESS");
          router.push("/login");
          setTimeout(() => {
            // display success message after route change completes
            dispatch("alert/success", data.message, { root: true });
          });
        } else {
          const error = (data && data.message) || response.statusText;
          commit("MU_REGISTER_FALIURE", error);
          dispatch("alert/error", error, { root: true });
        }
      })
      .catch(function(err) {
        const error = err.response.data.message || err;
        commit("MU_REGISTER_FALIURE", error);
        dispatch("alert/error", error, { root: true });
      });
  },
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