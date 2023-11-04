<template>
  <div>
    <ApexCharts
      v-if="chartData"
      type="donut"
      :height="400"
      :minHeight="400"
      :options="{
        chart: {
          type: 'donut',
          foreColor: '#adb2be',
          width: '100%',
          minHeight: 400,
        },
        legend: { position: 'bottom' },
        labels: chartData.labels,
        stroke: { colors: [COLORS.background] },
        fill: {
          colors: chartData.labels.map((level) => getColorFromLevel(level)),
        },
        colors: chartData.labels.map((level) => getColorFromLevel(level)),
        plotOptions: { pie: { donut: { size: '40%' } } },
      }"
      :series="chartData.series"
    />
  </div>
</template>

<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts';
import { COLORS } from '../../config/colors';
import { getColorFromLevel } from '../../util/color';

const logLevelsChartStore = useLogLevelsChartStore();
const { chartData } = storeToRefs(logLevelsChartStore);

onBeforeMount(async () => {
  logLevelsChartStore.loadData();
});
</script>
