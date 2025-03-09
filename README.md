# flavien_official

This template should help get you started developing with Vue 3 in Vite.

## architecture

- TailwindCSS
- Vue3
- Vite

portfolio/
├── public/ # Ressources statiques
│ ├── favicon.ico
│ └── robots.txt
├── src/
│ ├── assets/ # Images, fonts, etc.
│ ├── components/ # Composants réutilisables
│ │ ├── common/ # Composants génériques (Header, Footer, etc.)
│ │ ├── home/ # Composants spécifiques à la page d'accueil
│ │ ├── about/ # Composants spécifiques à la page "À propos"
│ │ ├── values/ # Composants spécifiques à la page "Mes valeurs"
│ │ └── projects/ # Composants spécifiques à la page "Mes projets"
│ ├── layouts/ # Layouts de l'application
│ │ └── MainLayout.vue
│ ├── views/ # Pages de l'application
│ │ ├── HomePage.vue
│ │ ├── AboutPage.vue
│ │ ├── ValuesPage.vue
│ │ └── ProjectsPage.vue
│ ├── router/ # Configuration des routes
│ │ └── index.js
│ ├── store/ # State management
│ │ ├── index.js
│ │ └── modules/ # Modules Pinia/Vuex
│ │ ├── theme.js
│ │ └── locale.js
│ ├── i18n/ # Internationalisation
│ │ ├── index.js
│ │ ├── fr.json
│ │ └── en.json
│ ├── styles/ # Styles globaux
│ │ ├── main.css
│ │ ├── theme-dark.css
│ │ └── theme-light.css
│ ├── plugins/ # Plugins Vue
│ │ └── index.js
│ ├── services/ # Services (API, etc.)
│ ├── utils/ # Fonctions utilitaires
│ ├── App.vue # Composant racine
│ └── main.js # Point d'entrée
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
