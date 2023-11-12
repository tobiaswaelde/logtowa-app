import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { DEFAUL_LOGS_FILTER, LogsFilter } from '@/types/logs-filter';
import equal from 'deep-equal';
import { useStorage } from '@vueuse/core';

const getDefaultFilters = () => ({ ...DEFAUL_LOGS_FILTER });

export const useLogsFilterStore = defineStore('logs-filter', () => {
  const drawerOpen = ref<boolean>(false);
  const isDefaultFilter = ref<boolean>(true);

  const filter = useStorage<LogsFilter>(
    'logs-filter',
    getDefaultFilters(),
    localStorage,
    {
      serializer: {
        read(value) {
          return value ? JSON.parse(value) : getDefaultFilters();
        },
        write(value) {
          return JSON.stringify({ levels: value.levels });
        },
      },
    },
  );

  const update = () => {
    isDefaultFilter.value = equal(
      { ...filter.value, levels: filter.value.levels.toSorted(undefined) },
      getDefaultFilters(),
    );
  };

  watch([filter.value], () => {
    update();
  });
  onMounted(() => {
    update();
  });

  const reset = () => {
    filter.value = getDefaultFilters();
  };

  return {
    drawerOpen,
    isDefaultFilter,
    filter,
    reset,
  };
});
