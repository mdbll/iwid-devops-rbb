<template>
  <div class="min-h-screen bg-gradient-to-b from-ghibli-light to-ghibli-dark">
    <!-- En-tête inspiré de Ghibli -->
    <header class="relative overflow-hidden py-10 px-6 text-center border-b-2 border-ghibli-accent/20">
      <div class="absolute inset-0 bg-[url('https://i.imgur.com/XtWpyKb.png')] opacity-20 mix-blend-overlay"></div>
      <div class="relative max-w-4xl mx-auto">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPVuFaXkyxD1N5JuWPPd7Z6bx2PgE15pJOHQ&s" alt="Studio Ghibli Logo" class="h-20 mx-auto mb-6">
        <h1 class="text-5xl font-bold text-ghibli-dark mb-4 font-serif tracking-wide">
          Le Monde Enchanté de Ghibli
        </h1>
        <p class="text-xl text-ghibli-dark/90 max-w-2xl mx-auto">
          Découvrez la magie des chefs-d'œuvre d'animation japonais
        </p>
      </div>
    </header>


    <!-- Contenu principal -->
    <main class="container mx-auto py-12 px-4">
      <!-- Section film vedette -->
      <section class="mb-20">
        <div class="relative rounded-3xl overflow-hidden shadow-2xl h-96">
          <img src="https://www.studioghibli.fr/wp-content/uploads/2009/07/spirited_away1-1024x638.png" alt="Le Voyage de Chihiro" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-10 text-white max-w-2xl">
            <span class="inline-block bg-ghibli-accent px-3 py-1 rounded-full text-sm font-medium mb-3">Film vedette</span>
            <h2 class="text-4xl font-bold mb-3">Le Voyage de Chihiro</h2>
            <p class="text-lg mb-4">Découvrez l'aventure onirique de Chihiro dans un monde peuplé de dieux et de créatures mystérieuses.</p>
            <div class="flex space-x-4">
              <button class="bg-ghibli-accent hover:bg-ghibli-accent-dark px-6 py-3 rounded-full font-medium flex items-center space-x-2 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                <span>Voir la bande-annonce</span>
              </button>
              <button class="border-2 border-white hover:bg-white/10 px-6 py-3 rounded-full font-medium transition">
                Plus d'infos
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Section films populaires -->
      <section class="mb-20">
        <h2 class="text-3xl font-bold text-ghibli-dark mb-8 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3 text-ghibli-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          Les Films Cultes
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="film in films" :key="film.id" class="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <div class="aspect-w-3 aspect-h-4">
              <img :src="film.image" :alt="film.titre" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 class="text-white text-xl font-bold mb-1">{{ film.titre }}</h3>
              <div class="flex items-center text-ghibli-accent mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="ml-1">{{ film.note }}</span>
              </div>
              <p class="text-white/80 text-sm line-clamp-2">{{ film.description }}</p>
              <button class="mt-3 self-start bg-ghibli-accent hover:bg-ghibli-accent-dark text-white px-4 py-2 rounded-full text-sm font-medium transition">
                Découvrir
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Section citation -->
      <section class="bg-ghibli-light/50 border-2 border-ghibli-accent/20 rounded-3xl p-10 mb-20 text-center relative overflow-hidden">
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-ghibli-accent/10 rounded-full"></div>
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-ghibli-accent/10 rounded-full"></div>
        <div class="relative max-w-3xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-ghibli-accent mb-6 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <blockquote class="text-2xl font-serif italic text-ghibli-dark mb-6">
            "La vie, c'est comme un train qui va vers l'infini. Il y a des départs et des arrivées, mais ce qui compte vraiment, c'est le voyage."
          </blockquote>
          <p class="text-ghibli-accent font-medium">— Hayao Miyazaki</p>
        </div>
      </section>
    </main>

    <!-- Pied de page -->
    <footer class="bg-ghibli-dark text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src="https://logos-world.net/wp-content/uploads/2024/07/Studio-Ghibli-Logo.png" alt="Studio Ghibli Logo" class="h-12 mb-4">
            <p class="text-ghibli-light/80">Découvrez l'univers magique du studio Ghibli à travers ses films inoubliables.</p>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Explorer</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-ghibli-light/80 hover:text-ghibli-accent transition">Tous les films</a></li>
              <li><a href="#" class="text-ghibli-light/80 hover:text-ghibli-accent transition">Réalisateurs</a></li>
              <li><a href="#" class="text-ghibli-light/80 hover:text-ghibli-accent transition">Personnages</a></li>
              <li><a href="#" class="text-ghibli-light/80 hover:text-ghibli-accent transition">Musiques</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">À propos</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-ghibli-light/80 hover:text-ghibli-accent transition">Studio Ghibli</a></li>
              <li><a href="#" class="text-ghibli-light/80 hover:text-ghibli-accent transition">Hayao Miyazaki</a></li>
              <li><a href="#" class="text-ghibli-light/80 hover:text-ghibli-accent transition">Histoire</a></li>
              <li><a href="#" class="text-ghibli-light/80 hover:text-ghibli-accent transition">Museum Ghibli</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Newsletter</h3>
            <p class="text-ghibli-light/80 mb-4">Recevez les dernières actualités Ghibli directement dans votre boîte mail.</p>
            <div class="flex">
              <input type="email" placeholder="Votre email" class="px-4 py-2 rounded-l-full bg-ghibli-light/20 text-white placeholder-ghibli-light/50 focus:outline-none focus:ring-2 focus:ring-ghibli-accent w-full">
              <button class="bg-ghibli-accent hover:bg-ghibli-accent-dark px-4 py-2 rounded-r-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="border-t border-ghibli-light/20 pt-8 text-center text-ghibli-light/60">
          <p>© 2025 IWID. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      films: [
        {
          id: 1,
          titre: "Mon Voisin Totoro",
          note: "4.9",
          description: "L'histoire de deux sœurs qui découvrent des créatures magiques dans la forêt près de leur nouvelle maison.",
          image: "https://thumb.canalplus.pro/http/unsafe/1440x810/filters:quality(80)/img-hapi.canalplus.pro:80/ServiceImage/ImageID/98794822"
        },
        {
          id: 2,
          titre: "Le Château Ambulant",
          note: "4.8",
          description: "Une jeune fille transformée en vieille femme part à la recherche d'un remède dans un château magique.",
          image: "https://www.studioghibli.fr/wp-content/uploads/2024/09/chateau-ambulant-poster-usa-header-1024x575.jpg"
        },
        {
          id: 3,
          titre: "Princesse Mononoké",
          note: "4.9",
          description: "Un jeune guerrier se retrouve au cœur d'une bataille entre les dieux de la forêt et les humains.",
          image: "https://www.premiersplans.org/storage/medias/2025/film_image_ECO_princesse-monon_1.jpg"
        },
        {
          id: 4,
          titre: "Ponyo sur la Falaise",
          note: "4.7",
          description: "L'amitié entre un petit garçon et un poisson rouge qui rêve de devenir humaine.",
          image: "https://www.studioghibli.fr/wp-content/uploads/2019/03/ponyo.jpg"
        }
      ]
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');

:root {
  --ghibli-light: #f0f7f4;
  --ghibli-dark: #1a3a3f;
  --ghibli-accent: #3a86ff;
  --ghibli-accent-dark: #2667cc;
  --ghibli-light-accent: #a2d2ff;
}

.bg-ghibli-light { background-color: var(--ghibli-light); }
.bg-ghibli-dark { background-color: var(--ghibli-dark); }
.bg-ghibli-accent { background-color: var(--ghibli-accent); }
.bg-ghibli-accent-dark { background-color: var(--ghibli-accent-dark); }
.bg-ghibli-light-accent { background-color: var(--ghibli-light-accent); }

.text-ghibli-light { color: var(--ghibli-light); }
.text-ghibli-dark { color: var(--ghibli-dark); }
.text-ghibli-accent { color: var(--ghibli-accent); }
.text-ghibli-accent-dark { color: var(--ghibli-accent-dark); }
.text-ghibli-light-accent { color: var(--ghibli-light-accent); }

.border-ghibli-accent { border-color: var(--ghibli-accent); }

.font-serif {
  font-family: 'Noto Serif JP', serif;
}
</style>
