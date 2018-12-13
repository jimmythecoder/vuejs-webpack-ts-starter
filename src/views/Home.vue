<template>
<div>
    <h1>Home page</h1>
    <dashboard></dashboard>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Dashboard from '../components/home/Dashboard.vue';

export default Vue.extend({
    data:{

    },
    components: {
        Dashboard
    }
})
</script>
