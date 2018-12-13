<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';

export default Vue.extend({
    data: {

    },
    components: {
        
    },
    computed: {
        ...mapState(['user'])
    }
});
</script>

<style lang="scss" scoped>
    @import '../../styles/settings';
    
</style>

<template>
    <h1>A VueJS + TypeScript + Webpack starter base project</h1>
</template>
