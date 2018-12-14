import Vue from 'vue';

import router from './router';
import store from './store';
import './styles/app.scss';

// Bootstrap the VueJS app
let rootApp = new Vue({
    el: "#app-root",
    store,
    router
});
