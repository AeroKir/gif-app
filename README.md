# Gif app
A GIF app is a web app that can be installed on your smartphone or desktop as an application (PWA). It also supports search, infinite scrolling, and GIF sharing.
***
## [Deployed App here](https://aerokir.github.io/gif-app/#/) 🚀
***

## Features
- Search works dynamically without clicking on the search button (debouncing used)
- PWA functionality
- Native Web Share API with fallback
- Infinite scroll with throttling
- Responsive layout
- Vue 3 Composition API

## Technologies used
- [Vite](https://vitejs.dev/)
- [Vue 3](https://v3.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
- [GIPHY API](https://developers.giphy.com/docs/api/#quick-start-guide)

## Installation

1. Clone the repository
```
git clone https://github.com/AeroKir/gif-app.git
```
2. Install the dependencies and devDependencies and start the server.
```
cd gif-app
npm i
```
3. Create a .env file in the root of the project and add the Giphy API key
```
VITE_GIPHY_API_KEY=your-api-key
```
4. Run the app
```
npm run dev
```