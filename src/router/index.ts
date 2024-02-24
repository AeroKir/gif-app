/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory } from 'vue-router/auto';

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory()
})

export default router
