import { defineStore } from 'pinia';
import { useHttp } from '../composables/http';
import { ref } from 'vue';
import { BarChartData, ChartTimespan } from '../types/chart-data';
import { wait } from 'run-in-sequence';

const DELAY = Number(import.meta.env.VITE_DEBUG_LOADING_DELAY);

export const useAppLogsChart = defineStore('app-logs-chart', () => {
  const http = useHttp();

  const appId = ref<string | null>(null);
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
});
