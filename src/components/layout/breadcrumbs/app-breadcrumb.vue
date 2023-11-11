<template>
  <SkeletonBreadcrumb v-if="loading" />
  <v-breadcrumbs v-else :items="items" density="compact">
    <template v-slot:divider>
      <IconChevronRight :size="18" />
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import SkeletonBreadcrumb from './skeleton-breadcrumb.vue';
import { IconChevronRight } from '@tabler/icons-vue';
import { useAppsStore } from '@/store/apps';
import { computed, ref, onMounted, watch } from 'vue';
import { App } from '../../../types/app';

const props = defineProps<{ id: string }>();

const appsStore = useAppsStore();

const app = ref<App | null>(null);
const loading = ref<boolean>(true);

const update = async () => {
  loading.value = true;
  try {
    app.value = await appsStore.getApp(props.id);
  } catch (err) {
    app.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await update();
});
watch([props], () => {
  update();
});

const items = computed(() => {
  const items: any = [{ title: 'Apps', to: { name: 'groups' } }];

  if (app.value) {
    const path = appsStore.findAppPath(app.value);
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
