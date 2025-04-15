<template>
  <h1>Sign up - Second Step</h1>
  <form @submit="onSubmit" class="form">
    <input
      v-model="confirmationCode.value"
      :ref="confirmationCode.ref"
      class="input"
      placeholder="Confirmation code"
    />
    <p v-if="confirmationCode.error">{{ confirmationCode.error.message }}</p>
    <button type="submit">submit</button>
  </form>
</template>

<script>
import { useForm } from "vue-hooks-form";
import handleSignUpConfirmation from "../functions/auth/SignUpSecondStep";
import router from "@/router";

export default {
  setup() {
    const { useField, handleSubmit } = useForm({
      defaultValues: {},
    });
    const confirmationCode = useField("confirmationCode", {
      rule: {
        required: true,
        len: 6,
      },
    });
    const onSubmit = async (data) => {
      console.log(data);
      const isSignUpComplete = await handleSignUpConfirmation(data);
      if (isSignUpComplete) router.push({ path: "/user" });
    };
    return {
      confirmationCode,
      onSubmit: handleSubmit(onSubmit),
    };
  },
};
</script>

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
