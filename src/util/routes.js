import Overview from '../components/Overview.vue';
import Detail from '../components/Detail.vue';

export default [
    { path: '/', component: Overview, name: 'home'  }, // Path + rendered component + plus give a name
    { path: '/movie/:id', component: Detail, name: 'movie' }, // :id  --> Means it's a parameter
    { path: '*', redirect: { name: 'home' } }  // Catch all path }
];