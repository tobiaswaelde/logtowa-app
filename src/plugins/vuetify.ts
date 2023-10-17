import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
//@ts-ignore
import colors from 'vuetify/lib/util/colors';

import { VInfiniteScroll } from 'vuetify/labs/VInfiniteScroll';

export default defineNuxtPlugin((nuxt) => {
  const vuetify = createVuetify({
    ssr: true,
    directives,
    components: { ...components, VInfiniteScroll },

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
