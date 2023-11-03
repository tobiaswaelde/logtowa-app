import equal from 'deep-equal';

type FilterType = {
  levels: string[];
  scope: string;
  message: string;
};

const getDefaultFilters = (): FilterType => ({
  levels: ['error', 'warn', 'info'].toSorted(undefined),
  scope: '',
  message: '',
});

export const useLogsFilter = defineStore('logs-filter-store', () => {
  const drawerOpen = ref<boolean>(false);
  const isDefaultFilter = ref<boolean>(true);

  const filter = reactive<FilterType>(getDefaultFilters());
  const mounted = ref<boolean>(false);

  watch([filter], () => {
    if (!mounted) return;
    localStorage.setItem('logs-filter', JSON.stringify(filter));
    isDefaultFilter.value = equal(
      { ...filter, levels: filter.levels.toSorted(undefined) },
      getDefaultFilters(),
    );
  });

  onBeforeMount(() => {
    const value = localStorage.getItem('logs-filter');
    if (value) {
      const json = JSON.parse(value) as FilterType;
      filter.levels = json.levels.toSorted(undefined);
      filter.scope = json.scope;
      filter.message = json.message;
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
    filter,
    drawerOpen,
    isDefaultFilter,
    reset,
  };
});
