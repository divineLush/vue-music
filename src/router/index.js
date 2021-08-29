import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index';

// .vue files will be made into webpack chunks automatically
// reduces the bundle size
const Home = () => import('@/views/Home.vue');
const About = () => import('@/views/About.vue');
const Manage = () => import('@/views/Manage.vue');
const Song = () => import('@/views/Song.vue');

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'manage',
    // an alias is an additional path that renders the same component
    // allows a component to be rendered for a different path
    // alias: '/manage-music',
    path: '/manage',
    meta: {
      requiresAuth: true,
    },
    component: Manage,
    // ROUTE SPECIFIC GUARD
    // beforeEnter: (to, from, next) => {
    //   console.log('/manage route guard', to, from);

    //   next();
    // },
  },
  {
    path: '/manage-music',
    // better use redirects for new routes rather then aliases for SEO reasons
    redirect: { name: 'manage' },
  },
  {
    // using regex to redirect users to home in case of 404
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song,
  },
];

const router = createRouter({
  // the process object is a Node object that is globally available in all modules
  // it contains information about the current server
  // BASE_URL property is created by Vue CLI
  // BASE_URL can be configures in Vue UI
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

// GLOBAL GUARD
// beforeEach() is available after the instance ot the router is created
// allows to run a function before every request
// to is an oobject that containts information where the user is navigating to
// from is vice versa
// next is a function
// router won't render the component until next() is called
router.beforeEach((to, from, next) => {
  console.log('Global Guard', to, from);

  const isAuthRequired = to.matched
    .some((record) => record.meta.requiresAuth);

  const isLoggedIn = store.state.auth.isUserLoggedIn;

  if (isAuthRequired && !isLoggedIn) {
    next({ name: 'home' });
    return;
  }

  next();
});

export default router;
