<template>
  <div>
    <h1 v-if="userData">{{ userData.username }}</h1>
    <button @click="handleSignOut()">SignOut</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { get } from "aws-amplify/api";
import handleSignOut from "@/functions/auth/handleSignOut";

const userData = ref(null);

onMounted(async () => {
  const getUser = async () => {
    try {
      const restOperation = get({
        apiName: "auth",
        path: "/getUser",
      });
      const res = await restOperation.response;
      const response = await res.body.json();
      console.log({ response });
    } catch (e) {
      console.log("GET call failed: ", { e });
    }
  };
  await getUser();
});
</script>
