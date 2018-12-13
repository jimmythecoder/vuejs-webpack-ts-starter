import Vue from 'vue';

// import router from './router';
import store from './store';
import './styles/app.scss';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        }
    ]
});


// Bootstrap the VueJS app
let rootApp = new Vue({
    el: "#app-root",
    store,
    router
});
