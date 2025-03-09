<template>
  <div>
    <!-- En-tête de la page -->
    <section class="mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ $t('about.title') }}</h1>
      <p class="text-xl opacity-80 max-w-3xl">{{ $t('about.description') }}</p>
    </section>

    <!-- Section principale avec photo/avatar et présentation -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div class="md:col-span-1">
        <div class="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden aspect-square">
          <div class="w-full h-full flex items-center justify-center text-4xl">
            <img
              src="@/assets/images/me.jpg"
              alt="Photo de profil"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div class="md:col-span-2 space-y-4">
        <h2 class="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {{ $t('about.whoAmI') }}
        </h2>

        <p>{{ $t('about.bio.part1') }}</p>
        <p>{{ $t('about.bio.part2') }}</p>

        <div class="flex flex-wrap gap-2 pt-4">
          <span
            v-for="(tag, index) in $t('about.tags')"
            :key="index"
            class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </section>

    <!-- Section d'expérience professionnelle -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
        {{ $t('about.experience') }}
      </h2>

      <div class="space-y-8">
        <div v-for="(job, index) in $t('about.jobs')" :key="index" class="timeline-item">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="md:col-span-1">
              <div class="font-semibold text-blue-600 dark:text-blue-400">{{ job.period }}</div>
              <div class="text-sm opacity-70">{{ job.location }}</div>
            </div>
            <div class="md:col-span-3">
              <h3 class="text-xl font-bold">{{ job.title }}</h3>
              <h4 class="text-lg mb-2">{{ job.company }}</h4>
              <p class="mb-2">{{ job.description }}</p>
              <ul class="list-disc pl-5 space-y-1">
                <li v-for="(achievement, i) in job.achievements" :key="i">
                  {{ achievement }}
                </li>
              </ul>
              <div class="flex flex-wrap gap-2 mt-3">
                <span
                  v-for="(tech, i) in job.technologies"
                  :key="i"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section de formation -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
        {{ $t('about.education') }}
      </h2>

      <div class="space-y-6">
        <div v-for="(edu, index) in $t('about.educations')" :key="index">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="md:col-span-1">
              <div class="font-semibold text-blue-600 dark:text-blue-400">{{ edu.period }}</div>
              <div class="text-sm opacity-70">{{ edu.location }}</div>
            </div>
            <div class="md:col-span-3">
              <h3 class="text-xl font-bold">{{ edu.degree }}</h3>
              <h4 class="text-lg mb-2">{{ edu.institution }}</h4>
              <p>{{ edu.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section de certifications -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
        {{ $t('about.certifications') }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(cert, index) in $t('about.certificationList')"
          :key="index"
          class="p-4 border rounded-lg transition-transform hover:scale-105"
          :class="{
            'border-gray-200 bg-white': !isDarkMode,
            'border-gray-700 bg-gray-800': isDarkMode,
          }"
        >
          <div class="text-3xl mb-3">{{ cert.icon }}</div>
          <h3 class="text-lg font-bold">{{ cert.name }}</h3>
          <div class="text-sm opacity-70 mb-2">{{ cert.issuer }} • {{ cert.date }}</div>
          <p class="text-sm">{{ cert.description }}</p>
        </div>
      </div>
    </section>

    <!-- Section de compétences -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
        {{ $t('about.skillsTitle') }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="skill-category">
          <h3 class="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            {{ $t('about.skillCategories.development.title') }}
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(skill, index) in $t('about.skillCategories.development.skills')"
              :key="index"
              class="flex items-center"
            >
              <div class="w-1/2">{{ skill.name }}</div>
              <div class="w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  class="bg-blue-600 h-2.5 rounded-full"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
            </li>
          </ul>
        </div>

        <div class="skill-category">
          <h3 class="text-xl font-bold mb-4 text-red-600 dark:text-red-400">
            {{ $t('about.skillCategories.security.title') }}
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(skill, index) in $t('about.skillCategories.security.skills')"
              :key="index"
              class="flex items-center"
            >
              <div class="w-1/2">{{ skill.name }}</div>
              <div class="w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  class="bg-red-600 h-2.5 rounded-full"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
            </li>
          </ul>
        </div>

        <div class="skill-category">
          <h3 class="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">
            {{ $t('about.skillCategories.operations.title') }}
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(skill, index) in $t('about.skillCategories.operations.skills')"
              :key="index"
              class="flex items-center"
            >
              <div class="w-1/2">{{ skill.name }}</div>
              <div class="w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  class="bg-purple-600 h-2.5 rounded-full"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Appel à l'action -->
    <section
      class="text-center py-8 px-4 rounded-xl mb-8"
      :class="{ 'bg-blue-50': !isDarkMode, 'bg-blue-900/20': isDarkMode }"
    >
      <h2 class="text-2xl font-bold mb-4">{{ $t('about.contact.title') }}</h2>
      <p class="max-w-2xl mx-auto mb-6">{{ $t('about.contact.description') }}</p>
      <a
        href="mailto:djesstsenda@gmail.com"
        class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {{ $t('about.contact.cta') }}
      </a>
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
.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 1.5rem;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: rgb(229, 231, 235);
}

.dark .timeline-item:not(:last-child)::after {
  background-color: rgb(55, 65, 81);
}

@media (min-width: 768px) {
  .timeline-item:not(:last-child)::after {
    left: 25%;
  }
}
</style>
