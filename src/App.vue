<template>
  <div class="bg-white text-black min-h-screen">
    <Navbar v-if="showNavbar" />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'

const route = useRoute()

const routesWithNavbar = ['/', '/user', '/profile']

const showNavbar = computed(() => routesWithNavbar.includes(route.path))
</script>
