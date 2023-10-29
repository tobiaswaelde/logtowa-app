import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
//@ts-ignore
import colors from 'vuetify/lib/util/colors';

// components
import { VInfiniteScroll } from 'vuetify/labs/VInfiniteScroll';
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from 'vuetify/labs/VDataTable';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

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
            primary: colors.indigo.base,
            secondary: colors.red.base,
            error: colors.red.base,
            // 'on-surface': colors.grey.lighten1,
          },
        },
      },
    },
  });
  nuxt.vueApp.use(vuetify);
});
