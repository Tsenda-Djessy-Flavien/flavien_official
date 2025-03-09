<template>
  <div>
    <!-- En-tête de la page -->
    <section class="mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ $t('values.title') }}</h1>
      <p class="text-xl opacity-80 max-w-3xl">
        {{ $t('values.description') }}
      </p>
    </section>

    <!-- Section des valeurs principales avec illustrations -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
      <!-- Sécurité dès la conception -->
      <div
        class="value-card p-6 rounded-lg shadow-lg border transition-transform hover:scale-105"
        :class="{
          'bg-white border-blue-100': !isDarkMode,
          'bg-gray-800 border-blue-900': isDarkMode,
        }"
      >
        <div class="mb-6 text-7xl flex justify-center">🔒</div>
        <h2 class="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          {{ $t('values.security.title') }}
        </h2>
        <p class="mb-4">{{ $t('values.security.description') }}</p>
        <ul class="space-y-2 ml-5 list-disc">
          <li v-for="(point, index) in $t('values.security.points')" :key="index">
            {{ point }}
          </li>
        </ul>
      </div>

      <!-- Automatisation -->
      <div
        class="value-card p-6 rounded-lg shadow-lg border transition-transform hover:scale-105"
        :class="{
          'bg-white border-green-100': !isDarkMode,
          'bg-gray-800 border-green-900': isDarkMode,
        }"
      >
        <div class="mb-6 text-7xl flex justify-center">⚙️</div>
        <h2 class="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
          {{ $t('values.automation.title') }}
        </h2>
        <p class="mb-4">{{ $t('values.automation.description') }}</p>
        <ul class="space-y-2 ml-5 list-disc">
          <li v-for="(point, index) in $t('values.automation.points')" :key="index">
            {{ point }}
          </li>
        </ul>
      </div>

      <!-- Collaboration -->
      <div
        class="value-card p-6 rounded-lg shadow-lg border transition-transform hover:scale-105"
        :class="{
          'bg-white border-purple-100': !isDarkMode,
          'bg-gray-800 border-purple-900': isDarkMode,
        }"
      >
        <div class="mb-6 text-7xl flex justify-center">👥</div>
        <h2 class="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
          {{ $t('values.collaboration.title') }}
        </h2>
        <p class="mb-4">{{ $t('values.collaboration.description') }}</p>
        <ul class="space-y-2 ml-5 list-disc">
          <li v-for="(point, index) in $t('values.collaboration.points')" :key="index">
            {{ point }}
          </li>
        </ul>
      </div>

      <!-- Amélioration continue -->
      <div
        class="value-card p-6 rounded-lg shadow-lg border transition-transform hover:scale-105"
        :class="{
          'bg-white border-orange-100': !isDarkMode,
          'bg-gray-800 border-orange-900': isDarkMode,
        }"
      >
        <div class="mb-6 text-7xl flex justify-center">📈</div>
        <h2 class="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">
          {{ $t('values.continuousImprovement.title') }}
        </h2>
        <p class="mb-4">{{ $t('values.continuousImprovement.description') }}</p>
        <ul class="space-y-2 ml-5 list-disc">
          <li v-for="(point, index) in $t('values.continuousImprovement.points')" :key="index">
            {{ point }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Citation inspirante -->
    <section
      class="mb-16 py-10 px-6 rounded-lg text-center"
      :class="{ 'bg-gray-50': !isDarkMode, 'bg-gray-800': isDarkMode }"
    >
      <blockquote class="text-xl font-medium italic mb-4">
        "{{ $t('values.quote.text') }}"
      </blockquote>
      <cite class="block text-right font-semibold">— {{ $t('values.quote.author') }}</cite>
    </section>

    <!-- Comment j'applique mes valeurs -->
    <section class="mb-16">
      <h2
        class="text-2xl font-bold mb-6 border-b pb-2"
        :class="{ 'border-gray-200': !isDarkMode, 'border-gray-700': isDarkMode }"
      >
        {{ $t('values.application.title') }}
      </h2>

      <div class="space-y-8">
        <div
          v-for="(practice, index) in $t('values.application.practices')"
          :key="index"
          class="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div class="md:col-span-1">
            <div
              class="p-4 rounded-lg flex items-center justify-center text-3xl"
              :class="{
                'bg-blue-100': practice.type === 'security' && !isDarkMode,
                'bg-green-100': practice.type === 'automation' && !isDarkMode,
                'bg-purple-100': practice.type === 'collaboration' && !isDarkMode,
                'bg-orange-100': practice.type === 'improvement' && !isDarkMode,
                'bg-blue-900/20': practice.type === 'security' && isDarkMode,
                'bg-green-900/20': practice.type === 'automation' && isDarkMode,
                'bg-purple-900/20': practice.type === 'collaboration' && isDarkMode,
                'bg-orange-900/20': practice.type === 'improvement' && isDarkMode,
              }"
            >
              {{ practice.icon }}
            </div>
          </div>
          <div class="md:col-span-3">
            <h3
              class="text-xl font-bold mb-2"
              :class="{
                'text-blue-600 dark:text-blue-400': practice.type === 'security',
                'text-green-600 dark:text-green-400': practice.type === 'automation',
                'text-purple-600 dark:text-purple-400': practice.type === 'collaboration',
                'text-orange-600 dark:text-orange-400': practice.type === 'improvement',
              }"
            >
              {{ practice.title }}
            </h3>
            <p class="mb-3">{{ practice.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tag, i) in practice.tags"
                :key="i"
                class="px-2 py-1 text-sm rounded-full"
                :class="{
                  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300':
                    practice.type === 'security',
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300':
                    practice.type === 'automation',
                  'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300':
                    practice.type === 'collaboration',
                  'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300':
                    practice.type === 'improvement',
                }"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Appel à l'action -->
    <section
      class="text-center py-8 px-4 rounded-xl mb-8"
      :class="{ 'bg-blue-50': !isDarkMode, 'bg-blue-900/20': isDarkMode }"
    >
      <h2 class="text-2xl font-bold mb-4">{{ $t('values.cta.title') }}</h2>
      <p class="max-w-2xl mx-auto mb-6">{{ $t('values.cta.description') }}</p>
      <div class="flex justify-center gap-4 flex-wrap">
        <router-link
          to="/projects"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ $t('values.cta.projectsButton') }}
        </router-link>
        <router-link
          to="/about"
          class="px-6 py-3 border border-current rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {{ $t('values.cta.aboutButton') }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/modules/theme'

const themeStore = useThemeStore()
const isDarkMode = computed(() => themeStore.darkMode)
</script>

<style scoped>
.value-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.value-card h2 {
  text-align: center;
}
</style>
