<template>
  <v-breadcrumbs :items="items" density="compact">
    <template v-slot:divider>
      <IconChevronRight :size="18" />
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts" setup>
import { IconChevronRight } from '@tabler/icons-vue';
import { App } from '../../../../types/app';

const props = defineProps<{ app: App }>();

const { findProjectPath } = useApps();

const items = computed(() => {
  const items = [{ title: 'Apps', to: '/groups' }];

  const path = findProjectPath(props.app);
  if (path) {
    const subitems = path.map((x) => ({
      title: x.name,
      to: `/groups/${x.id}`,
    }));
    items.push(...subitems);
  }

  return items;
});
</script>

<style lang="scss">
.v-breadcrumbs-divider {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
