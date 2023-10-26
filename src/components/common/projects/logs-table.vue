<template>
  <!-- <v-data-table-virtual
    :height="tableHeight"
    density="compact"
    fixed-header
    :headers="HEADERS"
    :items="items"
    item-value="id"
    @click:row="
      (e, row) => {
        console.log(row.item);
      }
    "
    :sort-asc-icon="IconArrowUp"
    :sort-desc-icon="IconArrowDown"
  >
  </v-data-table-virtual> -->

  <!-- <v-data-table>
    <v-data-table-row> </v-data-table-row>
    <v-infinite-scroll>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quasi, esse
      vitae magni quibusdam amet repellat unde sed at. Incidunt ducimus ex optio
      odit voluptas recusandae vero aliquam ullam tenetur!
    </v-infinite-scroll>
  </v-data-table> -->

  <v-data-table-virtual
    fixed-header
    fixed-footer
    density="compact"
    :sort-asc-icon="IconArrowUp"
    :sort-desc-icon="IconArrowDown"
    :height="tableHeight"
    :headers="HEADERS"
    :items="logs"
    @click:row="
      (e, row) => {
        console.log(row.item);
      }
    "
  >
    <template v-slot:item="{ props, item }" style="cursor: pointer">
      <tr v-bind="props">
        <td style="cursor: pointer; font-family: monospace !important">
          {{ getTimestamp(item.timestamp) }}
        </td>
        <td style="cursor: pointer; font-family: monospace !important">
          {{ item.scope }}
        </td>
        <td style="cursor: pointer">
          <v-chip
            density="comfortable"
            variant="flat"
            :color="getColorFromLevel(item.level)"
          >
            {{ item.level }}
          </v-chip>
        </td>
        <td style="cursor: pointer; font-family: monospace !important">
          {{ item.message }}
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<script setup lang="ts">
import { IconArrowUp, IconArrowDown } from '@tabler/icons-vue';
import { Paginated } from '@/types/pagination';
import { LogMessage } from '@/types/log';
//@ts-ignore
import colors from 'vuetify/lib/util/colors';
import moment from 'moment';
import { useLogs } from '../../../stores/logs';

const route = useRoute();
const id = route.params.id as string;
const logsStore = useLogs();
const { logs } = storeToRefs(logsStore);
logsStore.$state = {
  logs: [],
  projectId: id,
  connected: false,
  listening: false,
};

onMounted(() => {
  logsStore.connect();
});

const HEADERS = [
  // { key: 'id', title: 'ID' },
  { key: 'timestamp', title: 'Timestamp', width: 200 },
  { key: 'scope', title: 'Scope', sortable: false, width: 200 },
  { key: 'level', title: 'Level', sortable: false, width: 100 },
  { key: 'message', title: 'Message', sortable: false },
];

const getTimestamp = (timestamp: string) => {
  const time = moment(timestamp);
  if (time.isAfter(moment().startOf('day'))) {
    return time.format('mm:ss.SSS');
  } else if (time.isAfter(moment().startOf('day').subtract(1, 'week'))) {
    return time.format('ddd, mm:ss.SSS');
  } else {
    return time.format('DD.MM., mm:ss.SSS');
  }
};

const getColorFromLevel = (level: string) => {
  switch (level) {
    case 'error':
      return colors.red.base;
    case 'success':
      return colors.green.base;
    case 'warn':
      return colors.orange.darken1;
    case 'info':
      return colors.blue.base;
    case 'http':
      return colors.pink.base;
    case 'verbose':
      return colors.cyan.darken1;
    case 'debug':
      return colors.teal.base;
    case 'silly':
      return colors.brown.base;

    default:
      return undefined;
  }
};

const tableHeight = computed(() => {
  const containerHeight = window.innerHeight;
  const headerHeight = 56;
  const breadcrumbHeight = 38;
  const filterHeight = 24;
  const paginationHeight = 48;
  return (
    containerHeight -
    headerHeight -
    breadcrumbHeight -
    filterHeight -
    // paginationHeight -
    2
  );
});

// const http = useHttp();

// const itemCount = ref<number>(0);
// const items = ref<LogMessage[]>([]);

// onMounted(async () => {
//   const res = await http.get<Paginated<LogMessage>>(`/api/projects/${id}/logs`);
//   console.log(res.data.items[0]);
//   itemCount.value = res.data.meta.itemCount;
//   items.value.push(...res.data.items);
// });
</script>
