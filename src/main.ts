/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './app.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

// styles
import '@/styles/main.scss';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
