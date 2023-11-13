import { defineStore } from 'pinia';
import { useHttp } from '@/composables/http';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { BarChartData, ChartTimespan } from '@/types/chart-data';
import { wait } from 'run-in-sequence';
import qs from 'qs';
import { useLogsFilterStore } from './log-filter';

const DELAY = Number(import.meta.env.DEBUG_LOADING_DELAY);

export const useAppLogsChartStore = defineStore('app-logs-chart', () => {
  const http = useHttp();

  const appId = ref<string | null>(null);
  const { filter } = useLogsFilterStore();
  const chartData = ref<BarChartData | null>(null);

  const loading = ref<boolean>(false);
  const timespan = ref<ChartTimespan>('hour');
  const timer = ref<NodeJS.Timeout | null>(null);

  const loadData = async () => {
    loading.value = true;
    try {
      const q = qs.stringify({ levels: filter.levels });
      const url = `/api/apps/${appId.value}/charts/${timespan.value}?${q}`;
      const res = await http.get<BarChartData>(url);

      DELAY && (await wait(DELAY));

      chartData.value = res.data;
    } catch (err) {
      chartData.value = null;
    } finally {
      loading.value = false;
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
    loading,
    timespan,
    loadData,
  };
});
