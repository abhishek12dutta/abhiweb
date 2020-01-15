import Vue from 'vue'
//import VeeValidate from 'vee-validate';
import App from './App.vue';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import VueTelInput from 'vue-tel-input';
import router from './router';
import store from './store/store';
import VeeValidate from 'vee-validate';
import './assets/css/tailwind.css';
import VModal from 'vue-js-modal';
Vue.use(VeeValidate);
Vue.use(VueTelInput);
//Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: false } });
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })
Vue.config.productionTip = false;
//Vue.use(VeeValidate);


 
// Vue.use(VueJsModal, {
//   dynamic: true
// });

// setup fake backend
import { configureFakeBackend } from './helper';
configureFakeBackend();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
