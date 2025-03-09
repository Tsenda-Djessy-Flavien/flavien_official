<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 flex flex-col md:flex-row items-center gap-10">
      <!-- Photo/Avatar à gauche -->
      <div class="w-full md:w-2/5 flex justify-center">
        <div class="w-64 h-64 rounded-full overflow-hidden">
          <!-- Votre photo -->
          <img
            src="@/assets/images/me.jpg"
            alt="Photo de profil"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Texte d'intro à droite -->
      <div class="w-full md:w-3/5 text-center md:text-left space-y-6">
        <h1 class="text-4xl md:text-6xl font-bold">
          <span class="block">{{ $t('home.hero.title1') }}</span>
          <span class="block mt-2 gradient-text">Flavien Tsenda</span>
        </h1>
        <p class="text-xl md:text-2xl opacity-80">{{ $t('home.hero.subtitle') }}</p>
        <div class="flex flex-wrap gap-4 justify-center md:justify-start">
          <router-link
            to="/projects"
            class="px-6 py-3 rounded-lg gradient-btn text-white hover:opacity-90 transition-all"
          >
            {{ $t('home.hero.cta1') }}
          </router-link>
          <router-link
            to="/about"
            class="px-6 py-3 rounded-lg text-white bg-gray-800/60 hover:bg-gray-700/80 transition-colors"
          >
            {{ $t('home.hero.cta2') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-16 rounded-xl bg-gray-800/40">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ $t('home.skills.title') }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Dev Skills -->
          <div class="p-6 rounded-lg shadow-md bg-gray-800/60 backdrop-blur-sm">
            <div class="text-blue-400 text-4xl mb-4 flex justify-center">
              <span>👨‍💻</span>
            </div>
            <h3 class="text-xl font-bold text-center mb-4">{{ $t('home.skills.dev.title') }}</h3>
            <ul class="space-y-2">
              <li
                v-for="(skill, index) in $t('home.skills.dev.items')"
                :key="index"
                class="flex items-center"
              >
                <span class="text-green-500 mr-2">✓</span>
                {{ skill }}
              </li>
            </ul>
          </div>

          <!-- Sec Skills -->
          <div class="p-6 rounded-lg shadow-md bg-gray-800/60 backdrop-blur-sm">
            <div class="text-red-400 text-4xl mb-4 flex justify-center">
              <span>🔐</span>
            </div>
            <h3 class="text-xl font-bold text-center mb-4">{{ $t('home.skills.sec.title') }}</h3>
            <ul class="space-y-2">
              <li
                v-for="(skill, index) in $t('home.skills.sec.items')"
                :key="index"
                class="flex items-center"
              >
                <span class="text-green-500 mr-2">✓</span>
                {{ skill }}
              </li>
            </ul>
          </div>

          <!-- Ops Skills -->
          <div class="p-6 rounded-lg shadow-md bg-gray-800/60 backdrop-blur-sm">
            <div class="text-purple-400 text-4xl mb-4 flex justify-center">
              <span>☁️</span>
            </div>
            <h3 class="text-xl font-bold text-center mb-4">{{ $t('home.skills.ops.title') }}</h3>
            <ul class="space-y-2">
              <li
                v-for="(skill, index) in $t('home.skills.ops.items')"
                :key="index"
                class="flex items-center"
              >
                <span class="text-green-500 mr-2">✓</span>
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ $t('home.projects.title') }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="i in 2"
            :key="i"
            class="overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
          >
            <div class="h-48 bg-gray-800/60 flex items-center justify-center text-4xl">
              {{ i === 1 ? '🔒' : '☁️' }}
            </div>
            <div class="p-6 bg-gray-800/40">
              <h3 class="text-xl font-bold mb-2">
                {{ $t(`projects.projectsList.project${i}.title`) }}
              </h3>
              <p class="mb-4 opacity-80">
                {{ $t(`projects.projectsList.project${i}.description`) }}
              </p>
              <div class="flex gap-2 flex-wrap mb-4">
                <span
                  v-for="(tech, index) in i === 1
                    ? ['CI/CD', 'OWASP', 'Docker']
                    : ['Terraform', 'AWS', 'Ansible']"
                  :key="index"
                  class="px-2 py-1 text-sm rounded bg-gray-700/70 text-blue-300"
                >
                  {{ tech }}
                </span>
              </div>
              <router-link :to="`/projects`" class="gradient-text hover:underline">
                {{ $t('home.projects.viewProject') }} →
              </router-link>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <router-link
            to="/projects"
            class="inline-block px-6 py-3 rounded-lg gradient-btn text-white hover:opacity-90 transition-all"
          >
            {{ $t('home.projects.viewAll') }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/modules/theme'

const themeStore = useThemeStore()
// eslint-disable-next-line no-unused-vars
const isDarkMode = computed(() => themeStore.darkMode)
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #3db16e 0%, #4dcfb8 50%, #4d8fd6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
}

.gradient-btn {
  background: linear-gradient(90deg, #3db16e 0%, #4dcfb8 50%, #4d8fd6 100%);
  transition: all 0.3s ease;
}

.gradient-btn:hover {
  background: linear-gradient(90deg, #3db16e 0%, #4dcfb8 50%, #4d8fd6 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(94, 234, 212, 0.3);
}
</style>
