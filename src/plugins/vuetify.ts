/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';

// components
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from 'vuetify/labs/VDataTable';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

// theme
import { COLORS } from '../config/colors';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  directives,
  components: {
    ...components,
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
    VSkeletonLoader,
  },

  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: COLORS.background,
          surface: COLORS.backgroundDarken1,
          primary: COLORS.backgroundDarken1, // colors.indigo.base,
          secondary: COLORS.red, // colors.red.base,
          error: COLORS.red, // colors.red.base,
          warning: COLORS.yellow,
          success: COLORS.green,
          info: COLORS.blue,
          'on-background': COLORS.text,
          'on-surface': COLORS.textLight,
          // 'on-surface': colors.grey.lighten1,
        },
      },
    },
  },
});
