<template>
  <div class="container p-4">
    <h1 class="text-2xl font-bold mb-4">Home</h1>
    <p class="mb-4">Welcome to the home page!</p>

    <div v-if="films.length">
      <h2 class="text-xl font-semibold mb-2">Films</h2>
      <ul class="list-disc pl-4">
        <li v-for="film in films" :key="film.id">
          {{ film.original_title}} - {{ film.original_title_romanised }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p v-if="isAuthenticated()">Aucun film trouvé.</p>
      <p v-else>Vous devez être connecté pour voir les films.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import getFilms from "@/functions/auth/getFilms";
import { isAuthenticated } from "@/utils/auth";


interface Film {
  id: string;
  title: string;
  [key: string]: any;
}

const films = ref<Film[]>([]);
const authenticated = ref(false);

onMounted(async () => {
  authenticated.value = isAuthenticated();
  if (authenticated.value) {
    const data = await getFilms();
    if (data) {
      films.value = data;
    }
  }
});
</script>
