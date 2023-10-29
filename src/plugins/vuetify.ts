import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
//@ts-ignore
// import colors from 'vuetify/lib/util/colors';

// components
import { VInfiniteScroll } from 'vuetify/labs/VInfiniteScroll';
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from 'vuetify/labs/VDataTable';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
import { COLORS } from '../config/colors';

export default defineNuxtPlugin((nuxt) => {
  const vuetify = createVuetify({
    ssr: true,
    directives,
    components: {
      ...components,
      VInfiniteScroll,
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
            surface: COLORS.background,
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
  nuxt.vueApp.use(vuetify);
});
