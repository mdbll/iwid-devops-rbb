<template>
  <div
      class="px-6 h-screen py-20 md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,var(--p-primary-500),var(--p-primary-700)_48%,var(--p-primary-800))] dark:bg-[linear-gradient(-225deg,var(--p-primary-400),var(--p-primary-600)_48%,var(--p-primary-800))]"
  >
      <div class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-[rgba(255,255,255,0.1)]">
          <div class="text-4xl font-medium mb-12 text-primary-contrast">Confirmez l'email</div>
          <InputOtp v-model="otp" :length="6" :integerOnly="true" class="! mb-12"/>
          <button
          @click="onSubmit"
              type="button"
              class="max-w-40 w-full rounded-full appearance-none border-0 p-4 outline-0 text-xl mb-6 font-medium bg-white/30 hover:bg-white/40 active:bg-white/20 text-primary-contrast/80 cursor-pointer transition-colors duration-150"
          >
              Valider
          </button>
      </div>
  </div>
</template>

<script setup lang="ts">
import InputOtp from 'primevue/inputotp'
import { useRouter } from "vue-router";
import {ref} from "vue";
import handleSignUpConfirmation from "../functions/auth/SignUpSecondStep";
import { type ConfirmSignUpInput } from "aws-amplify/auth";


const router = useRouter();

const otp = ref('');

const onSubmit = async () => {
    const data = {
        confirmationCode: otp.value,
    } as ConfirmSignUpInput;
      const isSignUpComplete = await handleSignUpConfirmation(data);
      if (isSignUpComplete) router.push({ path: "/user" });
    };


</script>


<style>
</style>
