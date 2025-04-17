<template>
  <div class="min-h-screen px-6 py-10 md:px-12 lg:px-20 flex items-center justify-center bg-white">
    <div class="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">

      <!-- Bloc Image -->
      <div class="w-full lg:w-1/2 p-8 flex flex-col items-center justify-center bg-gray-50">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Photo de profil</h2>

        <!-- Loader pendant le chargement -->
        <div v-if="isLoadingImage" class="w-40 h-40 flex items-center justify-center mb-4">
          <div class="animate-spin h-8 w-8 border-4 border-gray-400 border-t-transparent rounded-full"></div>
        </div>

        <!-- Image -->
        <img
            v-if="!isLoadingImage && imageUrl"
            :src="imageUrl"
            alt="Image de profil"
            class="mb-4 w-40 h-40 rounded-full object-cover border border-gray-300 cursor-pointer"
            @click="triggerFileInput"
        />

        <!-- Input file caché -->
        <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            class="mb-4 hidden"
        />

        <button
            @click="uploadImage"
            class="rounded-full px-6 py-2 font-medium bg-primary-600 text-black hover:bg-primary-700 hover:text-black transition-all"
            :disabled="isUploading"
        >
          <span v-if="isUploading">📤 Upload...</span>
          <span v-else>Charger l'image</span>
        </button>
        <p v-if="message" class="mt-2 text-green-600 text-sm">{{ message }}</p>
      </div>

      <!-- Bloc Adresses -->
      <div class="w-full lg:w-1/2 p-8">
        <h1 class="text-3xl font-bold mb-6 text-gray-800">{{ userData?.username }}</h1>

        <!-- Formulaire d'ajout d'adresse -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Ajouter une adresse</h2>
          <form class="flex flex-col md:flex-row gap-4" @submit.prevent="checkForm">
            <input
                v-model="street_number"
                type="number"
                class="rounded-md px-4 py-2 bg-gray-100 placeholder:text-gray-400 text-gray-800 w-full outline-none"
                placeholder="Numéro"
                required
            />
            <input
                v-model="street"
                class="rounded-md px-4 py-2 bg-gray-100 placeholder:text-gray-400 text-gray-800 w-full outline-none"
                placeholder="Rue"
                required
            />
            <button
                type="submit"
                class="rounded-md px-6 py-2 font-medium bg-primary-600 text-black hover:bg-primary-700 hover:text-black transition-all"
                :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">⏳</span>
              <span v-else>Ajouter</span>
            </button>
          </form>
        </div>

        <!-- Liste des adresses -->
        <div>
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Adresses</h2>
          <p v-if="addressesData.length === 0" class="text-gray-400 italic mb-4">Aucune adresse enregistrée.</p>
          <ul class="space-y-3">
            <li
                v-for="(item, index) in addressesData"
                :key="index"
                class="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-md"
            >
              <span class="text-gray-800">{{ item.street_number }} {{ item.street }}</span>
              <button
                  @click="deleteAddressWithLoading(item.id, index)"
                  class="text-sm text-red-600 hover:text-red-800 font-semibold flex items-center gap-2"
                  :disabled="loadingDeleteIndex === index"
              >
                <span
                    v-if="loadingDeleteIndex === index"
                    class="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full"
                ></span>
                <span v-else>Supprimer</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
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

const userData = ref(null);
const addressesData = ref([]);
const street = ref("");
const street_number = ref(0);

// Image
const file = ref(null);
const imageUrl = ref("");
const message = ref("");
const isUploading = ref(false);
const isSubmitting = ref(false);
const loadingDeleteIndex = ref(null);
const isLoadingImage = ref(true);
const fileInput = ref(null);

// Déclencher le champ file au clic sur l’image
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Charger image existante
const loadImageIfExists = async () => {
  isLoadingImage.value = true;
  try {
    const user = await getCurrentUser();
    const fileName = `profile-pictures/${user.username}.jpg`;
    const { url } = await getUrl({ key: fileName, options: { accessLevel: 'protected' } });
    imageUrl.value = url.href;
  } catch (err) {
    console.log("Aucune image de profil trouvée.");
  } finally {
    isLoadingImage.value = false;
  }
};

// Gérer fichiers
const handleFileChange = (event) => {
  file.value = event.target.files[0];
};

// Upload
const uploadImage = async () => {
  if (!file.value) {
    message.value = "Aucun fichier sélectionné.";
    return;
  }
  isUploading.value = true;
  try {
    const user = await getCurrentUser();
    const fileName = `profile-pictures/${user.username}.jpg`;
    await uploadData({
      key: fileName,
      data: file.value,
      options: {
        contentType: file.value.type,
        accessLevel: 'protected',
      },
    }).result;
    message.value = "Image uploadée avec succès !";
    const { url } = await getUrl({ key: fileName, options: { accessLevel: 'protected' } });
    imageUrl.value = url.href;
  } catch (err) {
    message.value = `Erreur lors de l'upload : ${err.message}`;
  } finally {
    isUploading.value = false;
  }
};

// Charger infos utilisateur
const fetchUserData = async () => {
  try {
    const restOperation = get({ apiName: "auth", path: "/getUser" });
    const res = await restOperation.response;
    const response = await res.body.json();
    userData.value = response;
  } catch (e) {
    console.log("Erreur chargement utilisateur", e);
  }
};

const fetchAddresses = async () => {
  try {
    addressesData.value = await getAddresses();
  } catch (e) {
    console.log("Erreur chargement adresses", e);
  }
};

onMounted(async () => {
  await fetchUserData();
  await fetchAddresses();
  await loadImageIfExists();
});

// Ajouter une adresse
const checkForm = async () => {
  if (street.value?.length && street_number.value) {
    isSubmitting.value = true;
    await addAddress({
      street: street.value,
      street_number: street_number.value,
    });
    street.value = "";
    street_number.value = 0;
    await fetchAddresses();
    isSubmitting.value = false;
  }
};

// Supprimer une adresse avec loader
const deleteAddressWithLoading = async (id, index) => {
  loadingDeleteIndex.value = index;
  await deleteAddress({ id });
  await fetchAddresses();
  loadingDeleteIndex.value = null;
};
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
