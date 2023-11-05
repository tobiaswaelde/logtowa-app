<template>
  <div>
    <ApexCharts
      v-if="chartData"
      type="bar"
      :height="400"
      :options="{
        chart: {
          type: 'bar',
          stacked: true,
          width: '100%',
          height: 400,
          foreColor: '#adb2be',
          zoom: { enabled: false },
          toolbar: { show: false },
          parentHeightOffset: 0,
        },
        dataLabels: { enabled: false },
        labels: chartData.labels,
        legend: { position: 'bottom' },
        grid: { show: false },
        xaxis: {
          labels: { show: false },
          axisBorder: { show: true, color: '#424858' },
          axisTicks: { show: true },
        },
        yaxis: { show: false },
        tooltip: {
          enabled: true,
          theme: 'dark',
          shared: false,
          intersect: true,
        },
        stroke: {
          colors: chartData.levels.map((level) => getColorFromLevel(level)),
        },
        markers: { size: 0 },
        fill: {
          colors: chartData.levels.map((level) => getColorFromLevel(level)),
        },
        colors: chartData.levels.map((level) => getColorFromLevel(level)),
      }"
      :series="chartData.series.map((x) => ({ name: x.level, data: x.data }))"
    />
  </div>
</template>

<style lang="scss">
.apexcharts-tooltip {
  background: #22252b !important;
  color: #adb2be !important;
}
</style>

<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts';
import { getColorFromLevel } from '../../util/color';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useLogsChartStore } from '../../store/logs-chart';

const chartStore = useLogsChartStore();
const { chartData } = storeToRefs(chartStore);

watch([chartData], () => {
  console.log(chartData.value?.levels);
});
</script>
