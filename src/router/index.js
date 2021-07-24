import Vue from 'vue'
import Router from 'vue-router'
import { cookies } from '../cookies'
import store from '../store'
import api from "../api"

import Map from '@/pages/Map'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import LostPassword from '@/pages/LostPassword'

import NotFound from '@/pages/NotFound'

import "@/css/main.css"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/lostpassword',
      name: 'LostPassword',
      component: LostPassword
    },
    {
      path: '/:username/map',
      name: 'Map',
      component: Map
    },
    {path: '/:pathMatch(.*)*', name:'NotFound', component: NotFound},
     
  ]
})

const routerGuard = async (to, next) =>
{
  let token = cookies.get('vpmc-token'),
      username = cookies.get('vpmc-username') || 'user' // TODO validate should return username
  if( token === null ) next({name:"Login"})
  else
  {
    try
    {
      await api.User.validate(token)
      await store.dispatch( 'user/login', { username, token } )
      next()
    }
    catch(err)
    {
      next( { name: "Login" } )
      throw err
    }
  }
  
}



router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !store.state.user.isLogin) {
    routerGuard(to, next);
  } else {
    next();
  }
});

export default router