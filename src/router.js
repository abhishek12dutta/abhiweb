import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/views/Home';
import Login from './components/views/Login';
import SignUp from './components/views/SignUp';
import MyTodos from './components/views/todos/MyTodos';
import NextGenTodos from './components/views/todos/NextGenTodos';
import ViewPurgedTodos from './components/views/todos/ViewPurgedTodos';

Vue.use(Router);

let router = new Router({
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
      component: Login,
      meta: { 
        guest: true
      }
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
        meta: { 
          guest: true
        }
      },
      {
        path: '/myTodos',
        name: 'MyTodos',
        component: MyTodos,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/nextGenTodos',
        name: 'nextGenTodos',
        component: NextGenTodos,
        meta: { 
          requiresAuth: true
         // guest: true
        }
      },
      {
        path: '/viewPurgedTodos',
        name: 'viewPurgedTodos',
        component: ViewPurgedTodos,
        meta: { 
          requiresAuth: true
         // guest: true
        }
      }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
        query: { redirect: true }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router