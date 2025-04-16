<template>
  <div>
    <h1 v-if="userData">{{ userData.username }}</h1>
    <button @click="handleSignOut()">SignOut</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { get } from "aws-amplify/api";
import { useSignUpStore } from "@/stores/signUpStore";
import handleSignOut from "@/functions/auth/handleSignOut";

const { data } = useSignUpStore();
console.log(data);

// Déclaration de la donnée reçue de l'API
const userData = ref(null);

// Appel API à /getUser au montage du composant
onMounted(async () => {
  const getUser = async () => {
    try {
      const restOperation = get({
        apiName: "auth",
        path: "/getUser-ryan",
      });
      console.log({ restOperation });
      const res = await restOperation.response;
      console.log({ res });
      const response = await res.body.json();

      console.log("GET call succeeded");
      console.log(response);
    } catch (e) {
      console.log("POST call failed: ", JSON.parse(e.response.body));
    }
  };
  await getUser();
});
</script>
