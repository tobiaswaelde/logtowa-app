<template>
  <v-main>
    <GroupsBreadcrumb :id="id" />
    <v-divider />
    <v-container>
      <div v-if="loading">
        <v-row>
          <v-col v-for="x of new Array(4)" :key="x" :cols="12" :md="6" :xl="4">
            <v-skeleton-loader type="list-item" :height="48" />
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row v-if="children.length > 0">
          <v-col :cols="12">
            <h2 class="text-h6">Groups</h2>
          </v-col>
          <v-col
            v-for="group of children"
            :key="group.id"
            :cols="12"
            :md="6"
            :xl="4"
          >
            <GroupItem :group="group" />
          </v-col>
        </v-row>
        <v-row v-if="apps.length > 0">
          <v-col :cols="12">
            <h2 class="text-h6">Apps</h2>
          </v-col>
          <v-col v-for="app in apps" :key="app.id" :cols="12" :md="6" :xl="4">
            <AppItem :app="app" />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import GroupsBreadcrumb from '@/components/layout/breadcrumbs/groups-breadcrumb.vue';
import GroupItem from '@/components/ui/groups/group-item.vue';
import AppItem from '@/components/ui/apps/app-item.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Group } from '../../types/group';
import { App } from '../../types/app';
import { useGroupsStore } from '../../store/groups';
import compareBy from 'compare-by';

const route = useRoute();
const id = computed(() => route.params.id as string);

const groupsStore = useGroupsStore();

const loading = ref<boolean>(true);
const children = ref<Group[]>([]);
const apps = ref<App[]>([]);

const update = async () => {
  loading.value = true;

  const g = await groupsStore.getGroup(id.value);
  children.value = g?.children.toSorted(compareBy({ key: 'name' })) ?? [];
  apps.value = g?.apps.toSorted(compareBy({ key: 'name' })) ?? [];

  loading.value = false;
};

onMounted(() => {
  console.log('mounted');
  update();
});
</script>
