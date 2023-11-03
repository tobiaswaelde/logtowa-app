<template>
  <v-breadcrumbs :items="items" density="compact">
    <template v-slot:divider>
      <IconChevronRight :size="18" />
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts" setup>
import { IconChevronRight } from '@tabler/icons-vue';
import { Group } from '../../../../types/group';

const props = defineProps<{ group?: Group }>();

const { findGroupPath } = useGroups();

const items = computed(() => {
  const items = [{ title: 'Apps', to: '/groups' }];

  if (props.group) {
    const path = findGroupPath(props.group.id);
    if (path) {
      const subitems = path.map((x) => ({
        title: x.name,
        to: `/groups/${x.id}`,
      }));
      items.push(...subitems);
    }
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
