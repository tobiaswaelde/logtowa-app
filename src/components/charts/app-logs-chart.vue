<template>
  <div>
    <div style="display: flex; padding: 8px">
      <v-spacer />
      <v-btn-toggle variant="outlined" density="compact" v-model="timespan">
        <v-btn value="hour">1h</v-btn>
        <v-btn value="day">24h</v-btn>
        <v-btn value="month">30d</v-btn>
      </v-btn-toggle>
    </div>
    <ApexCharts
      v-if="chartData"
      type="bar"
      :key="chartKey"
      :height="130"
      :options="{
        chart: {
          type: 'bar',
          stacked: true,
          width: '100%',
          height: 130,
          foreColor: '#adb2be',
          zoom: { enabled: false },
          toolbar: { show: false },
          parentHeightOffset: 0,
        },
        dataLabels: { enabled: false },
        labels: chartData.labels,
        legend: { show: false },
        grid: { show: false },
        xaxis: {
          labels: { show: false },
          axisBorder: { show: true, color: '#424858' },
          axisTicks: { show: false },
        },
        yaxis: { show: false },
        tooltip: {
          enabled: true,
          theme: 'dark',
          shared: false,
          intersect: true,
          // fixed: {
          //   enabled: false,
          //   position: 'bottomRight',
          //   offsetY: 130,
          // },
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

const chartStore = useAppChartStore();
const { chartData, chartKey, timespan } = storeToRefs(chartStore);
</script>
