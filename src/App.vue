<template>
  <div>
    <Navbar v-if="route.path === '/user'" />

    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()
</script>
