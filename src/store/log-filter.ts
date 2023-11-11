import { defineStore } from 'pinia';
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { DEFAUL_LOGS_FILTER, LogsFilter } from '../types/logs-filter';
import equal from 'deep-equal';

export const useLogsFilter = defineStore('logs-filter', () => {
  const drawerOpen = ref<boolean>(false);
  const isDefaultFilter = ref<boolean>(true);

  const filter = reactive<LogsFilter>(DEFAUL_LOGS_FILTER);
  const mounted = ref<boolean>(false);

  watch([filter], () => {
    if (!mounted.value) return;
    localStorage.setItem('logs-filter', JSON.stringify(filter));
    isDefaultFilter.value = equal(
      { ...filter, levels: filter.levels.toSorted(undefined) },
      DEFAUL_LOGS_FILTER,
    );
  });

  onBeforeMount(() => {
    const value = localStorage.getItem('logs-filter');
    if (value) {
      const json = JSON.parse(value) as LogsFilter;
      filter.levels = json.levels.toSorted(undefined);
      filter.scope = json.scope;
      filter.message = json.message;
    }
  });
  onMounted(() => {
    mounted.value = true;
  });

  const reset = () => {
    filter.levels = DEFAUL_LOGS_FILTER.levels.toSorted(undefined);
    filter.scope = DEFAUL_LOGS_FILTER.scope;
    filter.message = DEFAUL_LOGS_FILTER.message;
  };

  return {
    drawerOpen,
    isDefaultFilter,
    filter,
    reset,
  };
});
