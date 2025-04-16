<template>
  <h1>First Step</h1>
  <form @submit="onSubmit" class="form">
    <input v-model="username.value" :ref="username.ref" class="input" />
    <p v-if="username.error">{{ username.error.message }}</p>
    <input
      v-model="password.value"
      :ref="password.ref"
      type="password"
      class="input"
    />
    <p v-if="password.error">{{ password.error.message }}</p>
    <input v-model="email.value" :ref="email.ref" class="input" />
    <p v-if="email.error">{{ email.error.message }}</p>
    <button type="submit">submit</button>
  </form>
</template>

<script>
import { useForm } from "vue-hooks-form";
import handleSignUp from "../functions/auth/SignUp";

export default {
  setup() {
    const { useField, handleSubmit } = useForm({
      defaultValues: {},
    });
    const username = useField("username", {
      rule: { required: true },
    });
    const email = useField("email", {
      rule: { required: true },
    });
    const password = useField("password", {
      rule: {
        required: true,
        min: 6,
        max: 10,
      },
    });
    const onSubmit = async (data) => {
      console.log(data);
      await handleSignUp(data);
    };
    return {
      username,
      password,
      email,
      onSubmit: handleSubmit(onSubmit),
    };
  },
};
</script>

<style>
.input {
  padding: 0.25rem 0.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1;
}
</style>
