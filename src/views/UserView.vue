<template>
  <div>
    <h1 v-if="userData">{{ userData.username }}</h1>
    <button @click="handleSignOut()">SignOut</button>
  </div>
  <div>
    <h1>Add address</h1>
    <form class="form" @submit.prevent="checkForm">
      <input v-model="street" class="input" required />

      <input
        v-model="street_number"
        type="number"
        class="input"
        placeholder="street number"
        required
      />

      <button type="submit">submit</button>
    </form>
  </div>
  <ul>
    <li v-for="(item, index) in addressesData" :key="index">
      <h2 class="line">{{ item.street }}</h2>
      <button @click="deleteAddress({ id: item.id })">Delete</button>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { get } from "aws-amplify/api";
import handleSignOut from "@/functions/auth/handleSignOut";
import addAddress from "@/functions/auth/addAddress";
import getAddresses from "@/functions/auth/getAddresses";
import deleteAddress from "@/functions/auth/deleteAddress";

const userData = ref(null);
const addressesData = ref([]);
const street = ref("");
const street_number = ref(0);

const checkForm = async () => {
  if (street.value?.length && street_number) {
    await addAddress({
      street: street.value,
      street_number: street_number.value,
    });
  }
};

onMounted(async () => {
  try {
    const restOperation = get({
      apiName: "auth",
      path: "/getUser",
    });
    const res = await restOperation.response;
    const response = await res.body.json();
    userData.value = response;
    console.log({ response });

    addressesData.value = await getAddresses();
    console.log(addressesData.value);
  } catch (e) {
    console.log("GET call failed: ", { e });
  }
});
</script>

<style>
.line {
  color: aqua;
}
</style>
