<template>
  <h1>Second Step</h1>
  <form @submit="onSubmit" class="form">
    <input
      v-model="confirmationCode.value"
      :ref="confirmationCode.ref"
      class="input"
    />
    <p v-if="confirmationCode.error">{{ confirmationCode.error.message }}</p>
    <button type="submit">submit</button>
  </form>
</template>

<script>
import { useForm } from "vue-hooks-form";
import handleSignUpConfirmation from "../functions/auth/SignUpSecondStep";

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
      await handleSignUpConfirmation(data);
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
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1;
}
</style>
