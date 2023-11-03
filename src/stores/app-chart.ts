import { useLogsFilter } from './logs-filter';
import { ChartData } from '../types/chart-data';
import qs from 'qs';

export const useAppChartStore = defineStore('app-chart-store', () => {
  const http = useHttp();

  const { filter } = useLogsFilter();

  const appId = ref<string | null>(null);
  const chartData = ref<ChartData | null>(null);
  const chartKey = ref<number>(0);

  const timespan = ref<'hour' | 'day' | 'month'>('hour');
  const timer = ref<NodeJS.Timeout | null>(null);

  const loadData = async () => {
    if (!appId.value) return;

    try {
      const q = qs.stringify({ levels: filter.levels });
      const url = `/api/apps/${appId.value}/logs/charts/${timespan.value}?${q}`;
      const res = await http.get<ChartData>(url);
      chartData.value = res.data;
    } catch (err) {
      chartData.value = null;
    }
  };

  watch([appId], () => {
    loadData();
  });

  watch([timespan], () => {
    updateTimer();
    loadData();
  });

  const resetTimer = () => {
    timer.value && clearInterval(timer.value);
  };
  const updateTimer = () => {
    resetTimer();
    if (timespan.value === 'hour') {
      timer.value = setInterval(() => {
        loadData();
      }, 1000 * 15); // every 15s
    } else if (timespan.value === 'day') {
      timer.value = setInterval(() => {
        loadData();
      }, 1000 * 60); // every 60s
    } else if (timespan.value === 'month') {
      timer.value = setInterval(() => {
        loadData();
      }, 1000 * 120); // every 120s
    }
  };

  onMounted(() => {
    updateTimer();
  });
  onBeforeUnmount(() => {
    resetTimer();
  });

  return {
    appId,
    chartData,
    chartKey,
    timespan,
    loadData,
  };
});
