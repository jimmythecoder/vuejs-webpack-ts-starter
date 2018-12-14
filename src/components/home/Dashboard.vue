<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';

export default Vue.extend({
    components: {
        
    },
    computed: {
        ...mapState(['user'])
    }
});
</script>

<template>
<div>
    <h1>Dashboard: A VueJS + TypeScript + Webpack starter base project.</h1>
    <p>{{user.name}}</p>
</div>
</template>

<style lang="scss" scoped>
    @import '../../styles/settings';
    
</style>