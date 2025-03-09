<template>
  <div>
    <!-- En-tête de la page -->
    <section class="mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ $t('projects.title') }}</h1>
      <p class="text-xl opacity-80 max-w-3xl">
        {{ $t('projects.description') }}
      </p>
    </section>

    <!-- Filtres de projets -->
    <section class="mb-8">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="px-4 py-2 rounded-lg transition-colors"
          :class="{
            'bg-blue-600 text-white': activeFilter === filter.value,
            'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700':
              activeFilter !== filter.value,
          }"
        >
          {{ $t(`projects.filters.${filter.key}`) }}
        </button>
      </div>
    </section>

    <!-- Liste des projets -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-card overflow-hidden rounded-lg shadow-lg border transition-all hover:shadow-xl"
        :class="{
          'border-gray-200 bg-white': !isDarkMode,
          'border-gray-700 bg-gray-800': isDarkMode,
        }"
      >
        <!-- Image du projet -->
        <div class="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
          <div class="absolute inset-0 flex items-center justify-center text-4xl">
            {{ project.icon }}
          </div>
        </div>

        <!-- Contenu du projet -->
        <div class="p-5">
          <div class="flex justify-between items-start mb-3">
            <h3 class="text-xl font-bold">{{ project.title }}</h3>
            <span
              class="text-sm font-medium px-2 py-1 rounded-full"
              :class="{
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300':
                  project.category === 'dev',
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300':
                  project.category === 'sec',
                'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300':
                  project.category === 'ops',
              }"
            >
              {{ $t(`projects.categories.${project.category}`) }}
            </span>
          </div>

          <p class="mb-4">{{ project.description }}</p>

          <!-- Technologies utilisées -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="(tech, index) in project.technologies"
              :key="index"
              class="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex justify-between items-center mt-4">
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ $t('projects.viewDemo') }}
            </a>
            <a
              v-if="project.codeUrl"
              :href="project.codeUrl"
              target="_blank"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ $t('projects.viewCode') }}
            </a>
            <button
              @click="openProjectDetails(project)"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ $t('projects.details') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal pour les détails du projet -->
    <div
      v-if="selectedProject"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <div
        class="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl"
        :class="{ 'bg-white': !isDarkMode, 'bg-gray-800': isDarkMode }"
      >
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-bold">{{ selectedProject.title }}</h2>
            <button
              @click="selectedProject = null"
              class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div class="space-y-6">
            <p>{{ selectedProject.fullDescription || selectedProject.description }}</p>

            <!-- Objectifs du projet -->
            <div>
              <h3 class="text-xl font-bold mb-2">{{ $t('projects.detailsModal.objectives') }}</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li v-for="(objective, index) in selectedProject.objectives" :key="index">
                  {{ objective }}
                </li>
              </ul>
            </div>

            <!-- Défis rencontrés -->
            <div>
              <h3 class="text-xl font-bold mb-2">{{ $t('projects.detailsModal.challenges') }}</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li v-for="(challenge, index) in selectedProject.challenges" :key="index">
                  {{ challenge }}
                </li>
              </ul>
            </div>

            <!-- Solutions apportées -->
            <div>
              <h3 class="text-xl font-bold mb-2">{{ $t('projects.detailsModal.solutions') }}</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li v-for="(solution, index) in selectedProject.solutions" :key="index">
                  {{ solution }}
                </li>
              </ul>
            </div>

            <!-- Technologies utilisées (détaillées) -->
            <div>
              <h3 class="text-xl font-bold mb-2">{{ $t('projects.detailsModal.technologies') }}</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(tech, index) in selectedProject.technologies"
                  :key="index"
                  class="px-2 py-1 rounded"
                  :class="{
                    'bg-gray-100 dark:bg-gray-700': true,
                  }"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end gap-4 pt-4">
              <a
                v-if="selectedProject.demoUrl"
                :href="selectedProject.demoUrl"
                target="_blank"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {{ $t('projects.viewDemo') }}
              </a>
              <a
                v-if="selectedProject.codeUrl"
                :href="selectedProject.codeUrl"
                target="_blank"
                class="px-4 py-2 border border-current rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {{ $t('projects.viewCode') }}
              </a>
              <button
                @click="selectedProject = null"
                class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {{ $t('projects.close') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Appel à l'action pour d'autres projets -->
    <section
      class="text-center py-8 px-4 rounded-xl mb-8"
      :class="{ 'bg-blue-50': !isDarkMode, 'bg-blue-900/20': isDarkMode }"
    >
      <h2 class="text-2xl font-bold mb-4">{{ $t('projects.cta.title') }}</h2>
      <p class="max-w-2xl mx-auto mb-6">{{ $t('projects.cta.description') }}</p>
      <a
        href="https://github.com/votre-compte"
        target="_blank"
        class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {{ $t('projects.cta.button') }}
      </a>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useThemeStore } from '@/stores/modules/theme'
import { useI18n } from 'vue-i18n'

const themeStore = useThemeStore()
const isDarkMode = computed(() => themeStore.darkMode)
const { t } = useI18n()

// Filtres pour les catégories de projets
const filters = [
  { key: 'all', value: 'all' },
  { key: 'dev', value: 'dev' },
  { key: 'sec', value: 'sec' },
  { key: 'ops', value: 'ops' },
]

const activeFilter = ref('all')
const selectedProject = ref(null)

// Données des projets (dans un environnement réel, ces données pourraient venir d'une API)
const projects = computed(() => [
  {
    id: 1,
    title: t('projects.projectsList.project1.title'),
    description: t('projects.projectsList.project1.description'),
    fullDescription: t('projects.projectsList.project1.fullDescription'),
    category: 'sec',
    icon: '🔒',
    technologies: ['GitLab CI/CD', 'OWASP', 'Docker', 'Kubernetes'],
    objectives: t('projects.projectsList.project1.objectives'),
    challenges: t('projects.projectsList.project1.challenges'),
    solutions: t('projects.projectsList.project1.solutions'),
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/example/repo',
  },
  {
    id: 2,
    title: t('projects.projectsList.project2.title'),
    description: t('projects.projectsList.project2.description'),
    fullDescription: t('projects.projectsList.project2.fullDescription'),
    category: 'ops',
    icon: '☁️',
    technologies: ['AWS', 'Terraform', 'Ansible', 'Prometheus', 'Grafana'],
    objectives: t('projects.projectsList.project2.objectives'),
    challenges: t('projects.projectsList.project2.challenges'),
    solutions: t('projects.projectsList.project2.solutions'),
    demoUrl: null,
    codeUrl: 'https://github.com/example/repo',
  },
  {
    id: 3,
    title: t('projects.projectsList.project3.title'),
    description: t('projects.projectsList.project3.description'),
    fullDescription: t('projects.projectsList.project3.fullDescription'),
    category: 'dev',
    icon: '💻',
    technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    objectives: t('projects.projectsList.project3.objectives'),
    challenges: t('projects.projectsList.project3.challenges'),
    solutions: t('projects.projectsList.project3.solutions'),
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/example/repo',
  },
  {
    id: 4,
    title: t('projects.projectsList.project4.title'),
    description: t('projects.projectsList.project4.description'),
    fullDescription: t('projects.projectsList.project4.fullDescription'),
    category: 'sec',
    icon: '🔍',
    technologies: ['Python', 'OWASP ZAP', 'Jenkins', 'Selenium'],
    objectives: t('projects.projectsList.project4.objectives'),
    challenges: t('projects.projectsList.project4.challenges'),
    solutions: t('projects.projectsList.project4.solutions'),
    demoUrl: null,
    codeUrl: 'https://github.com/example/repo',
  },
  {
    id: 5,
    title: t('projects.projectsList.project5.title'),
    description: t('projects.projectsList.project5.description'),
    fullDescription: t('projects.projectsList.project5.fullDescription'),
    category: 'ops',
    icon: '📊',
    technologies: ['ELK Stack', 'Fluentd', 'Kubernetes', 'Prometheus'],
    objectives: t('projects.projectsList.project5.objectives'),
    challenges: t('projects.projectsList.project5.challenges'),
    solutions: t('projects.projectsList.project5.solutions'),
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/example/repo',
  },
  {
    id: 6,
    title: t('projects.projectsList.project6.title'),
    description: t('projects.projectsList.project6.description'),
    fullDescription: t('projects.projectsList.project6.fullDescription'),
    category: 'dev',
    icon: '🔐',
    technologies: ['React', 'Node.js', 'OAuth2', 'MongoDB', 'Docker'],
    objectives: t('projects.projectsList.project6.objectives'),
    challenges: t('projects.projectsList.project6.challenges'),
    solutions: t('projects.projectsList.project6.solutions'),
    demoUrl: 'https://example.com/demo',
    codeUrl: 'https://github.com/example/repo',
  },
])

// Projets filtrés selon la catégorie active
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects.value
  }
  return projects.value.filter((project) => project.category === activeFilter.value)
})

// Ouvrir la modal des détails du projet
const openProjectDetails = (project) => {
  selectedProject.value = project
}
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
