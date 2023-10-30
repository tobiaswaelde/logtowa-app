<template>
  <div style="position: relative">
    <v-table
      fixed-header
      :height="tableHeight"
      density="comfortable"
      ref="tableRef"
    >
      <thead>
        <tr>
          <th v-for="header of HEADERS" :key="header.key" scope="col">
            {{ header.title }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item of logs"
          :key="item.id"
          :ref="
            logs.findIndex((x) => x.id === item.id) === logs.length - 1
              ? `lastRow`
              : undefined
          "
          @click="
            (e) => {
              getLog(item.id);
            }
          "
        >
          <td
            style="cursor: pointer; font-family: monospace !important"
            :class="{
              'bg-background': item.id !== selectedLog?.id,
              'bg-background-darken1': item.id === selectedLog?.id,
            }"
          >
            {{ getTimestamp(item.timestamp) }}
          </td>

          <td
            style="cursor: pointer"
            :class="{
              'bg-background': item.id !== selectedLog?.id,
              'bg-background-darken1': item.id === selectedLog?.id,
            }"
          >
            <log-level-chip :value="item.level" />
          </td>

          <td
            style="cursor: pointer; font-family: monospace !important"
            :class="{
              'bg-background': item.id !== selectedLog?.id,
              'bg-background-darken1': item.id === selectedLog?.id,
            }"
          >
            {{ item.scope }}
          </td>

          <td
            style="cursor: pointer; font-family: monospace !important"
            :class="{
              'bg-background': item.id !== selectedLog?.id,
              'bg-background-darken1': item.id === selectedLog?.id,
            }"
          >
            {{ item.message }}
          </td>
        </tr>
      </tbody>
    </v-table>

    <div style="position: absolute; right: 8px; bottom: 8px">
      <v-scale-transition :hide-on-leave="false" mode="in-out">
        <v-btn
          v-show="tableScrolled"
          icon
          color="error"
          @click="
            () => {
              const tbody = tableRef.$el.querySelector('.v-table__wrapper');
              console.log(tbody);
              tbody.scroll({ top: 0, behavior: 'smooth' });
              // tableRef.$el.scrollTop = 0;
            }
          "
        >
          <IconArrowUp />
        </v-btn>
      </v-scale-transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconArrowUp, IconArrowDown } from '@tabler/icons-vue';
import moment from 'moment';
import { useLogs } from '../../../stores/logs';
import { useElementVisibility } from '@vueuse/core';

const route = useRoute();
const id = route.params.id as string;
const logsStore = useLogs();
const { getLog, loadMoreData } = logsStore;
const { logs, sortOptions, loading, selectedLog } = storeToRefs(logsStore);
logsStore.$state = {
  projectId: id,
  connected: false,
  listening: true,
  sortOptions: [{ key: 'timestamp', order: 'desc' }],
  loading: false,
  logsCount: 0,
  selectedLog: null,
  filter: {
    levels: ['error', 'warn', 'info'],
    scope: '',
    message: '',
  },
};

const tableRef = ref<any>(null);
const tableScrolled = ref<boolean>(false);

const lastRow = ref<any>(null);
const lastRowVisible = useElementVisibility(lastRow);

onMounted(() => {
  logsStore.connect();
  logsStore.startListening();
});

watch([tableRef], () => {
  if (!tableRef.value) return;
  const wrapper = tableRef.value.$el.querySelector('.v-table__wrapper');
  wrapper.addEventListener('scroll', (e: any) => {
    const scrollTop = e.target.scrollTop;
    tableScrolled.value = scrollTop > 50;
  });
});

watch([lastRowVisible], () => {
  console.log(lastRowVisible.value);
  if (lastRowVisible.value === true) {
    loadMoreData();
  }
});

const HEADERS = [
  // { key: 'id', title: 'ID' },
  { key: 'timestamp', title: 'Timestamp', sortable: false, width: 200 },
  { key: 'level', title: 'Level', sortable: false, width: 100 },
  { key: 'scope', title: 'Scope', sortable: false, width: 200 },
  { key: 'message', title: 'Message', sortable: false },
];

const getTimestamp = (timestamp: string) => {
  const time = moment(timestamp);
  if (time.isAfter(moment().startOf('day'))) {
    return time.format('HH:mm:ss.SSS');
  } else if (time.isAfter(moment().startOf('day').subtract(1, 'week'))) {
    return time.format('ddd, HH:mm:ss.SSS');
  } else {
    return time.format('DD.MM., HH:mm:ss.SSS');
  }
};

const windowHeight = ref<number>(0);
const handleResize = () => {
  windowHeight.value = window.innerHeight;
};
onMounted(() => {
  handleResize();
});

const tableHeight = computed(() => {
  const headerHeight = 56;
  const breadcrumbHeight = 38;
  const filterHeight = 66;
  const paginationHeight = 48;
  return (
    windowHeight.value -
    headerHeight -
    breadcrumbHeight -
    filterHeight -
    // paginationHeight -
    2
  );
});
</script>
