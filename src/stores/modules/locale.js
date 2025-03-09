import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: localStorage.getItem('locale') || 'fr',
  }),

  actions: {
    setLocale(locale) {
      this.locale = locale
      localStorage.setItem('locale', locale)

      // Changer la langue dans l'application
      const i18n = useI18n()
      i18n.locale.value = locale

      // Mettre à jour l'attribut lang du document
      document.documentElement.setAttribute('lang', locale)
    },

    initLocale() {
      // Initialiser la langue au chargement de l'application
      const i18n = useI18n()
      i18n.locale.value = this.locale
      document.documentElement.setAttribute('lang', this.locale)
    },
  },
})
