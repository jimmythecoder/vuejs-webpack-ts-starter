import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            name: 'Vuex Example User Name'
        }
    },
    mutations: {},
    actions: {}
});