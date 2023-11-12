import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { DEFAUL_LOGS_FILTER, LogsFilter } from '@/types/logs-filter';
import equal from 'deep-equal';
import { useStorage } from '@vueuse/core';

const getDefaultFilters = () => ({ ...DEFAUL_LOGS_FILTER });

const serializer = {
  read: (value: string) => (value ? JSON.parse(value) : getDefaultFilters()),
  write: (value: LogsFilter) => JSON.stringify({ levels: value.levels }),
};

export const useLogsFilterStore = defineStore('logs-filter', () => {
  const drawerOpen = ref<boolean>(false);
  const isDefaultFilter = ref<boolean>(true);

  const filter = useStorage<LogsFilter>(
    'logs-filter',
    getDefaultFilters(),
    localStorage,
    { mergeDefaults: true, serializer: serializer },
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
