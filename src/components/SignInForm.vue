<script>
import { useForm } from "vue-hooks-form";
import handleSignIn from "@/functions/auth/SignIn";

export default {
  setup() {
    const { useField, handleSubmit } = useForm({
      defaultValues: {},
    });
    const username = useField("username", {
      rule: {
        required: true,
      },
    });

    const password = useField("password", {
      rule: {
        required: true,
      },
    });

    const onSubmit = async (data) => {
      console.log(data);
      await handleSignIn(data);
    };
    return {
      username,
      password,
      onSubmit: handleSubmit(onSubmit),
    };
  },
};
</script>

<template>
  <h1>Sign in</h1>
  <form @submit="onSubmit" class="form">
    <input
      v-model="username.value"
      :ref="username.ref"
      class="input"
      placeholder="username"
    />
    <p v-if="username.error">{{ username.error.message }}</p>
    <input
      v-model="password.value"
      :ref="password.ref"
      type="password"
      class="input"
      placeholder="Password"
    />
    <p v-if="password.error">{{ password.error.message }}</p>
    <button type="submit">submit</button>
  </form>
</template>

<style>
.input {
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
