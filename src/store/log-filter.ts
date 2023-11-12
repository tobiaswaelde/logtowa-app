import { defineStore } from 'pinia';
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { DEFAUL_LOGS_FILTER, LogsFilter } from '@/types/logs-filter';
import equal from 'deep-equal';

const getDefaultFilters = () => ({ ...DEFAUL_LOGS_FILTER });

export const useLogsFilterStore = defineStore('logs-filter', () => {
  const drawerOpen = ref<boolean>(false);
  const isDefaultFilter = ref<boolean>(true);

  const filter = reactive<LogsFilter>(getDefaultFilters());
  const mounted = ref<boolean>(false);

  const updateDefaultFilter = () => {
    isDefaultFilter.value = equal(
      { ...filter, levels: filter.levels.toSorted(undefined) },
      getDefaultFilters(),
    );
  };

  watch([filter], () => {
    if (!mounted.value) return;
    localStorage.setItem('logs-filter', JSON.stringify(filter));
    updateDefaultFilter();
  });

  onBeforeMount(() => {
    const value = localStorage.getItem('logs-filter');
    if (value) {
      const json = JSON.parse(value) as LogsFilter;
      filter.levels = json.levels.toSorted(undefined);
      filter.scope = json.scope;
      filter.message = json.message;

      updateDefaultFilter();
    }
  });
  onMounted(() => {
    mounted.value = true;
  });

  const reset = () => {
    const json = getDefaultFilters();
    filter.levels = json.levels.toSorted(undefined);
    filter.scope = json.scope;
    filter.message = json.message;
  };

  return {
    drawerOpen,
    isDefaultFilter,
    filter,
    reset,
  };
});
