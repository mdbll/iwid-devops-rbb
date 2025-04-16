<template>
  <h1>Sign up - First Step</h1>
  <form @submit="onSubmit" class="form">
    <input
      v-model="password.value"
      :ref="password.ref"
      type="password"
      class="input"
      placeholder="Password"
    />
    <p v-if="password.error">{{ password.error.message }}</p>
    <input
      v-model="email.value"
      :ref="email.ref"
      class="input"
      placeholder="E-mail"
    />
    <p v-if="email.error">{{ email.error.message }}</p>
    <input
      v-model="firstname.value"
      :ref="firstname.ref"
      class="input"
      placeholder="Firstname"
    />
    <p v-if="firstname.error">{{ firstname.error.message }}</p>
    <input
      v-model="familyName.value"
      :ref="familyName.ref"
      class="input"
      placeholder="familyName"
    />
    <p v-if="familyName.error">{{ familyName.error.message }}</p>
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
    const email = useField("email", {
      rule: { required: true },
    });
    const firstname = useField("firstname", {
      rule: { required: true },
    });
    const familyName = useField("familyName", {
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
      password,
      firstname,
      familyName,
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
