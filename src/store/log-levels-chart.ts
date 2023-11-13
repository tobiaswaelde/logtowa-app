import { defineStore } from 'pinia';
import { useHttp } from '@/composables/http';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ChartTimespan, PieChartData } from '@/types/chart-data';
import { wait } from 'run-in-sequence';

const DELAY = Number(import.meta.env.DEBUG_LOADING_DELAY);

export const useLogLevelsChartStore = defineStore('log-levels-chart', () => {
  const http = useHttp();

  const chartData = ref<PieChartData | null>(null);

  const loading = ref<boolean>(false);
  const timespan = ref<ChartTimespan>('hour');
  const timer = ref<NodeJS.Timeout | null>(null);

  const loadData = async () => {
    loading.value = true;
    try {
      const url = `/api/charts/levels/${timespan.value}`;
      const res = await http.get<PieChartData>(url);

      DELAY && (await wait(DELAY));

      chartData.value = res.data;
    } catch (err) {
      chartData.value = null;
    } finally {
      loading.value = false;
    }
  };

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
    loadData();
    resetTimer();
  });

  return {
    chartData,
    loading,
    timespan,
    timer,
    loadData,
  };
});
