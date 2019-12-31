import Vue from 'vue'
//import VeeValidate from 'vee-validate';
import App from './App.vue';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import router from './router';
import store from './store/store';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

Vue.config.productionTip = false;
//Vue.use(VeeValidate);

// setup fake backend
import { configureFakeBackend } from './helper';
configureFakeBackend();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
