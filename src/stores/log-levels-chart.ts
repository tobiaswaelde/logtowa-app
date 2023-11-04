type ChartData = {
  labels: string[];
  series: number[];
};

export const useLogLevelsChartStore = defineStore(
  'log-levels-chart-store',
  () => {
    const http = useHttp();

    const chartData = ref<ChartData | null>(null);

    const timespan = ref<'hour' | 'day' | 'month'>('hour');
    const timer = ref<NodeJS.Timeout | null>(null);

    const loadData = async () => {
      try {
        const url = `/api/charts/levels/${timespan.value}`;
        const res = await http.get<ChartData>(url);
        chartData.value = res.data;
      } catch (err) {
        chartData.value = null;
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
      timespan,
      timer,
      loadData,
    };
  },
);
