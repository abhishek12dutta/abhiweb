import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/views/Home';
import Login from './components/views/Login';
import SignUp from './components/views/SignUp';
import MyTodos from './components/views/todos/MyTodos';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
      },
      {
        path: '/myTodos',
        name: 'MyTodos',
        component: MyTodos
      },
      
  ]
})