<template>
  <div>
    <h1>{{ data.username }}</h1>
    <button @click="handleSignOut()">SignOut</button>
  </div>
</template>

<script setup>
import { useSignUpStore } from "@/stores/signUpStore";
import handleSignOut from "@/functions/auth/handleSignOut";

const { data } = useSignUpStore();
console.log(data);
</script>
