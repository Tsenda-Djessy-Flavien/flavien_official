<template>
  <div
    class="min-h-screen transition-colors duration-300"
    :class="{
      dark: isDarkMode,
      'bg-gray-100 text-gray-900': !isDarkMode,
      'bg-gray-900 text-white': isDarkMode,
    }"
  >
    <!-- Header avec navigation et contrôles -->
    <header
      class="sticky top-0 z-10 backdrop-blur-md"
      :class="{ 'bg-white/90': !isDarkMode, 'bg-gray-800/90': isDarkMode }"
    >
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <!-- Logo à gauche -->
        <div class="font-bold text-xl">
          <router-link to="/" class="hover:opacity-80 transition-opacity">
            <span class="text-blue-500">Dev</span><span class="text-green-500">Sec</span
            ><span class="text-purple-500">Ops</span>
          </router-link>
        </div>

        <!-- Navigation et contrôles à droite -->
        <div class="flex items-center gap-4">
          <!-- Navigation -->
          <nav class="hidden md:block">
            <ul class="flex gap-6">
              <li v-for="item in menuItems" :key="item.route">
                <router-link
                  :to="item.route"
                  class="hover:text-blue-500 transition-colors"
                  active-class="text-blue-500 font-medium"
                >
                  {{ $t(`nav.${item.key}`) }}
                </router-link>
              </li>
            </ul>
          </nav>

          <!-- Séparateur vertical -->
          <div class="hidden md:block h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>

          <!-- Controls: Theme & Language -->
          <div class="flex gap-4 items-center">
            <button
              @click="toggleTheme"
              class="p-2 rounded-full transition-colors"
              :class="{ 'hover:bg-gray-200': !isDarkMode, 'hover:bg-gray-700': isDarkMode }"
              :title="$t(isDarkMode ? 'theme.light' : 'theme.dark')"
            >
              <span v-if="isDarkMode">🌞</span>
              <span v-else>🌙</span>
            </button>

            <button
              @click="toggleLocale"
              class="p-2 rounded transition-colors"
              :class="{ 'hover:bg-gray-200': !isDarkMode, 'hover:bg-gray-700': isDarkMode }"
              :title="$t(`lang.${locale === 'fr' ? 'en' : 'fr'}`)"
            >
              {{ locale === 'fr' ? 'EN' : 'FR' }}
            </button>
          </div>

          <!-- Bouton menu mobile -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 md:hidden rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <span v-if="!isMobileMenuOpen">☰</span>
            <span v-else>✕</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Menu mobile -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden py-2 px-4"
      :class="{ 'bg-white': !isDarkMode, 'bg-gray-800': isDarkMode }"
    >
      <nav>
        <ul class="space-y-3 py-2">
          <li v-for="item in menuItems" :key="item.route">
            <router-link
              :to="item.route"
              class="block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              active-class="text-blue-500 font-medium"
              @click="isMobileMenuOpen = false"
            >
              {{ $t(`nav.${item.key}`) }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="mt-16 py-6" :class="{ 'bg-gray-200': !isDarkMode, 'bg-gray-800': isDarkMode }">
      <div class="container mx-auto px-4 text-center">
        <p>{{ $t('footer.copyright') }} <span class="font-medium">Flavien</span></p>
        <div class="flex justify-center gap-4 mt-4">
          <a
            href="https://github.com/votre-compte"
            target="_blank"
            class="hover:text-blue-500 transition-colors"
            >GitHub</a
          >
          <a
            href="https://linkedin.com/in/votre-compte"
            target="_blank"
            class="hover:text-blue-500 transition-colors"
            >LinkedIn</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useThemeStore } from '@/stores/modules/theme'
import { useLocaleStore } from '@/stores/modules/locale'
import { useI18n } from 'vue-i18n'

const themeStore = useThemeStore()
const localeStore = useLocaleStore()
const { locale } = useI18n()

const isDarkMode = computed(() => themeStore.darkMode)
const isMobileMenuOpen = ref(false)

const menuItems = [
  { key: 'home', route: '/' },
  { key: 'about', route: '/about' },
  { key: 'values', route: '/values' },
  { key: 'projects', route: '/projects' },
]

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const toggleLocale = () => {
  const newLocale = locale.value === 'fr' ? 'en' : 'fr'
  localeStore.setLocale(newLocale)
}

// Initialiser le thème et la langue
themeStore.initTheme()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
