import { defineStore } from 'pinia'
import i18n from '@/i18n' // Importez directement l'instance i18n

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: localStorage.getItem('locale') || 'fr',
  }),

  actions: {
    setLocale(locale) {
      this.locale = locale
      localStorage.setItem('locale', locale)

      // Changez directement la locale via l'instance i18n importée
      i18n.global.locale.value = locale

      // Mettre à jour l'attribut lang du document
      document.documentElement.setAttribute('lang', locale)
    },

    initLocale() {
      // Initialiser la langue au chargement de l'application
      i18n.global.locale.value = this.locale
      document.documentElement.setAttribute('lang', this.locale)
    },
  },
})
