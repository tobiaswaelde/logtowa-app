type ChartData = {
  labels: string[];
  series: number[];
};

export const useLogLevelsChartStore = defineStore(
  'log-levels-chart-store',
  () => {
    const http = useHttp();
  },
);
