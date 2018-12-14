import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                title: 'Dashboard: Vue power'
            },
            component: () => import('./views/Home.vue')
        }
    ]
});