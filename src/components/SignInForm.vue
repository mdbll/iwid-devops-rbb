<template>
  <div
      class="px-6 h-screen py-20 md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,var(--p-primary-500),var(--p-primary-700)_48%,var(--p-primary-800))] dark:bg-[linear-gradient(-225deg,var(--p-primary-400),var(--p-primary-600)_48%,var(--p-primary-800))]"
  >
      <div class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-[rgba(255,255,255,0.1)]">
          <div class="text-4xl font-medium mb-12 text-primary-contrast">Bienvenue</div>
          <InputText
              type="email"
              class="!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
              placeholder="Email"
              required
              v-model="email"
          />
          
          <InputText
              type="password"
              class="!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-xl !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
              placeholder="Password"
              required
              v-model="password"
          />
          <button
          @click="onSubmit"
              type="button"
              class="max-w-40 w-full rounded-full appearance-none border-0 p-4 outline-0 text-xl mb-6 font-medium bg-white/30 hover:bg-white/40 active:bg-white/20 text-primary-contrast/80 cursor-pointer transition-colors duration-150"
          >
              Sign In
          </button>
          <a class="cursor-pointer font-medium block text-center text-primary-contrast" @click="goToRegister">Register</a>
      </div>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useRouter } from "vue-router";
import handleSignIn from "@/functions/auth/SignIn";
import {ref} from "vue";

const router = useRouter();

const email = ref('');;
const password = ref('');


const goToRegister = () => {
  router.push({ name: 'signup' });
}; 

const onSubmit = async () => {
  const data = {
      username: email.value,
      password: password.value,
  };
    await handleSignIn(data);
};

</script>


<style>
</style>