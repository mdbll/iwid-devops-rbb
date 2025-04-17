<template>
    <Menubar :model="items" class="shadow-2">
        <template #end>
        <!-- Avatar bouton -->
        <button
            @click="goToProfile"
            class="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-primary-500 transition duration-300"
        >
            <img v-if="profileImage" :src="profileImage" alt="Profil" class="w-full h-full object-cover" />
        </button>
        </template>
    </Menubar>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { ref, onMounted } from 'vue'
    import Menubar from 'primevue/menubar'
    import { loadImageIfExists } from '@/functions/s3/getProfilePicture'

    const router = useRouter()

    const items = ref([
    {
        label: 'Home',
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
  