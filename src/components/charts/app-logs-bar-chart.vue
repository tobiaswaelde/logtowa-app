<template>
  <div style="display: flex; padding: 8px">
    <v-spacer />
    <v-btn-toggle variant="outlined" density="compact" v-model="timespan">
      <v-btn value="hour" :disabled="loading || !chartData">1h</v-btn>
      <v-btn value="day" :disabled="loading || !chartData">24h</v-btn>
      <v-btn value="month" :disabled="loading || !chartData">30d</v-btn>
    </v-btn-toggle>
  </div>
  <div
    style="
      height: 130px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    "
  >
    <div v-if="loading || !chartData">
      <v-progress-circular indeterminate :size="32" />
    </div>
    <div v-else style="width: 100%">
      <ApexCharts
        v-if="chartData"
        type="bar"
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
  </div>
</template>

<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts';
import { useAppLogsChartStore } from '../../store/app-logs-chart';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { getColorFromLevel } from '../../util/color';

const props = defineProps<{ id: string }>();

const appLogsChartStore = useAppLogsChartStore();
appLogsChartStore.appId = props.id;
const { chartData, timespan, loading } = storeToRefs(appLogsChartStore);

const update = async () => {
  appLogsChartStore.loadData();
};

onMounted(() => {
  update();
});

watch([props], () => {
  appLogsChartStore.appId = props.id;
  update();
});
</script>
