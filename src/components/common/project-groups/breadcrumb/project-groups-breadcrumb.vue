<template>
  <v-breadcrumbs :items="items" density="compact">
    <template v-slot:divider>
      <IconChevronRight :size="18" />
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts" setup>
import { IconChevronRight } from '@tabler/icons-vue';
import { ProjectGroup } from '../../../../types/project-group';

const props = defineProps<{ projectGroup?: ProjectGroup }>();

const projectGroupsStore = useProjectGroups();
const { findGroupPath } = projectGroupsStore;
const { projectGroups } = storeToRefs(projectGroupsStore);

const items = computed(() => {
  console.log('update breadcrumb');
  const items = [{ title: 'Projects', to: '/groups' }];

  if (props.projectGroup) {
    const path = findGroupPath(projectGroups.value, props.projectGroup.id);
    if (path) {
      console.log('PATH:', path);
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
