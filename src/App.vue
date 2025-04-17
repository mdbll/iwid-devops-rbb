<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/sign-up">Sign-up</RouterLink>
        <RouterLink to="/sign-in">Sign-in</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
</style>
