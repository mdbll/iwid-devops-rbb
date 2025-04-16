<template>
  <div>
    <SignUpFirstStep v-if="signUpSteps?.data?.nextStep === ''" />
    <SignUpSecondStep
      v-else-if="signUpSteps?.data?.nextStep === 'CONFIRM_SIGN_UP'"
    />
  </div>
</template>

<script setup>
import SignUpFirstStep from "@/components/SignUpFirstStep.vue";
import SignUpSecondStep from "@/components/SignUpSecondStep.vue";
import { useSignUpStore } from "@/stores/signUpStore";

const signUpSteps = useSignUpStore();
console.log(signUpSteps?.data);
</script>
