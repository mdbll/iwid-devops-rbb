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

  <!-- Section photo de profil -->
  <div class="profile-container">
    <h2>Photo de profil</h2>

    <img v-if="imageUrl" :src="imageUrl" alt="Image de profil" class="profile-img" />

    <input type="file" @change="handleFileChange" />
    <button @click="uploadImage">Uploader</button>

    <p v-if="message" class="feedback">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { get } from "aws-amplify/api";
import handleSignOut from "@/functions/auth/handleSignOut";
import addAddress from "@/functions/auth/addAddress";
import getAddresses from "@/functions/auth/getAddresses";
import deleteAddress from "@/functions/auth/deleteAddress";
import { uploadData, getUrl } from '@aws-amplify/storage';
import { getCurrentUser } from '@aws-amplify/auth';

// Données utilisateur + adresses
const userData = ref(null);
const addressesData = ref([]);
const street = ref("");
const street_number = ref(0);

// ✅ Données pour la photo de profil
const file = ref(null);
const imageUrl = ref("");
const message = ref("");

// 📤 Handle file input
const handleFileChange = (event) => {
  file.value = event.target.files[0];
};

// 📤 Upload image vers S3
const uploadImage = async () => {
  if (!file.value) {
    message.value = "Aucun fichier sélectionné.";
    return;
  }

  try {
    const user = await getCurrentUser();
    const fileName = `profile-pictures/${user.username}.jpg`;

    await uploadData({
      key: fileName,
      data: file.value,
      options: {
        contentType: file.value.type,
        accessLevel: 'protected',
      }
    }).result;

    message.value = "Image uploadée avec succès !";

    const { url } = await getUrl({ key: fileName, options: { accessLevel: 'protected' } });
    imageUrl.value = url.href;

  } catch (err) {
    message.value = `Erreur lors de l'upload : ${err.message}`;
    console.error(err);
  }
};

// 🔁 Charger image existante (si dispo)
const loadImageIfExists = async () => {
  try {
    const user = await getCurrentUser();
    const fileName = `profile-pictures/${user.username}.jpg`;

    const { url } = await getUrl({ key: fileName, options: { accessLevel: 'protected' } });
    imageUrl.value = url.href;
  } catch (err) {
    console.log("Aucune image de profil trouvée.");
  }
};

// 🔁 Chargement des infos + image
onMounted(async () => {
  try {
    const restOperation = get({
      apiName: "auth",
      path: "/getUser",
    });
    const res = await restOperation.response;
    const response = await res.body.json();
    userData.value = response;

    addressesData.value = await getAddresses();

    await loadImageIfExists();
  } catch (e) {
    console.log("GET call failed: ", { e });
  }
});

// ✅ Formulaire d'adresse
const checkForm = async () => {
  if (street.value?.length && street_number.value) {
    await addAddress({
      street: street.value,
      street_number: street_number.value,
    });
  }
};
</script>

<style scoped>
.line {
  color: aqua;
}
.profile-container {
  margin-top: 2rem;
  text-align: center;
}
.profile-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
}
.feedback {
  color: #3c763d;
  margin-top: 0.5rem;
}
</style>
