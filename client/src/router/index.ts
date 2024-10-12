import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DishesView from '../views/DishesView.vue'
import DishView from '../views/DishView.vue'
// import SignupView from '../views/SignupView.vue'
// import loginView from '../views/loginView.vue'
import profileView from '../views/profileView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dishes',
      name: 'dishes',
      component: DishesView,
    },
    {
      path: '/dishes/:id',
      name: 'dish',
      component: DishView
    },
    // {
    //   path: '/signup',
    //   name: 'signup',
    //   component: SignupView
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: loginView
    // },
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   component: profileView
    // },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  ]
})

export default router
