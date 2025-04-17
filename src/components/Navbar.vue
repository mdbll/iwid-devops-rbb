<template>
    <Menubar :model="items" class="">
        <template #start>
      <div class="pl-4">
        <span class="text-xl font-semibold tracking-wide font-logo">iwid</span>
      </div>
    </template>

      <template #end>
        <div class="flex items-center gap-3 pr-4">
          <!-- Bouton Sign Out -->
          <button
            @click="onSignOut"
            class="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-200"
          >
            Se déconnecter
          </button>
  
          <!-- Avatar bouton -->
          <button
            @click="goToProfile"
            class="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-primary-500 transition duration-300"
          >
            <img
              v-if="profileImage"
              :src="profileImage"
              alt="Profil"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </template>
    </Menubar>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import Menubar from 'primevue/menubar'
  import { loadImageIfExists } from '@/functions/s3/getProfilePicture'
  import handleSignOut from '@/functions/auth/handleSignOut'
  
  const router = useRouter()
  
  const items = ref([
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      command: () => {
        router.push('/')
      }
    }
  ])
  
  const profileImage = ref('')
  
  const goToProfile = () => {
    router.push('/profile')
  }

  async function onSignOut() {
    await handleSignOut()
    router.push("/sign-in")
  }
  
  onMounted(async () => {
    console.log('onMounted Navbar')
    const url = await loadImageIfExists()
    if (url) {
      profileImage.value = url
      console.log('Image de profil trouvée :', url)
    }
  })
  </script>
  
  <style scoped>
  </style>
  