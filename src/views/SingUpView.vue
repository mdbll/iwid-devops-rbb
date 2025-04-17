<template>
  <div>
    <SignUpFirstStep/>
  </div>
</template>

<script setup lang="ts">
import SignUpFirstStep from "@/components/SignUpFirstStep.vue";
import { useSignUpStore } from "@/stores/signUpStore";

const signUpSteps = useSignUpStore();
console.log(signUpSteps?.data);
</script>