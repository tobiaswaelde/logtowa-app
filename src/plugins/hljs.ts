import { createApp } from 'vue';
import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/atom-one-dark.css';

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(VueHighlightJS);
});
