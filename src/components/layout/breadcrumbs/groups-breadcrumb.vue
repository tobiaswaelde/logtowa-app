<template>
  <v-breadcrumbs :items="items" density="compact">
    <template v-slot:divider>
      <IconChevronRight :size="18" />
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import { IconChevronRight } from '@tabler/icons-vue';
import { computed } from 'vue';
import { useGroupsStore } from '@/store/groups';

const groupsStore = useGroupsStore();
const props = defineProps<{ id?: string }>();

const items = computed(() => {
  const items: any = [{ title: 'Apps', to: { name: 'groups' } }];

  if (props.id) {
    const path = groupsStore.findGroupPath(props.id);
    if (path) {
      for (const x of path) {
        items.push({
          title: x.name,
          to: { name: 'group', params: { id: x.id } },
        });
      }
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
