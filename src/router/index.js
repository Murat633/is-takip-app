import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import SignUp from '../views/auth/SignUp.vue'
import IsOlustur from '../views/isler/IsOlustur.vue'
import IsDetay from '../views/isler/IsDetay.vue'
import { authRef } from '../firebase/config'

const authGiris = (to,from,next) => {
  let kullanici = authRef.currentUser
  
  if(!kullanici){
    next({name:'login'})
  }else{
    next()
  }
}

const oturumKontrol = (to,from,next) => {
  let kullanici = authRef.currentUser
  
  if(kullanici){
    next({name:'home'})
  }else{
    next()
  }
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter:authGiris
    },
    // Auth
    {
      path:'/login',
      name:'login',
      component: Login,
      beforeEnter:oturumKontrol

    },
    {
      path:'/register',
      name:'register',
      component:SignUp
    },
    // İşler
    {
      path:'/is-olustur',
      name:'isolustur',
      component: IsOlustur,
      beforeEnter:authGiris
    },
    {
      path:'/isler/:id',
      name:'isdetay',
      component: IsDetay,
      beforeEnter:authGiris,
      props:true
    }
    
  ]
})

export default router