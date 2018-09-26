import './modernizr-custom.js';

import Vue from 'vue';
import AppComponent from './components/AppComponent.vue';

import Config from './config';

import './styles/app.scss';

// Bootstrap the VueJS app
let rootApp = new Vue({
    el: "#app-root",
    components: {
        AppComponent
    }
});
