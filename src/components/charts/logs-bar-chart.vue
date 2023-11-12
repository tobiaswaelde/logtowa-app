<template>
  <v-card>
    <v-card-title style="display: flex; padding-right: 8px">
      <span>Logs</span>
      <v-spacer />
      <v-btn-toggle
        variant="outlined"
        density="compact"
        v-model="timespan"
        style="height: 30px"
      >
        <v-btn value="hour">1h</v-btn>
        <v-btn value="day">24h</v-btn>
        <v-btn value="month">30d</v-btn>
      </v-btn-toggle>
    </v-card-title>
    <v-divider />
    <v-card-text style="padding: 8px">
      <div
        style="
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        "
      >
        <div v-if="!chartData && loading">
          <v-progress-circular indeterminate :size="50" />
        </div>

        <div v-else-if="chartData" style="width: 100%">
          <ApexCharts
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
                colors: chartData.levels.map((level) =>
                  getColorFromLevel(level),
                ),
              },
              markers: { size: 0 },
              fill: {
                colors: chartData.levels.map((level) =>
                  getColorFromLevel(level),
                ),
              },
              colors: chartData.levels.map((level) => getColorFromLevel(level)),
            }"
            :series="
              chartData.series.map((x) => ({ name: x.level, data: x.data }))
            "
          />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { getColorFromLevel } from '@/util/color';
import { useLogsChartStore } from '@/store/logs-chart';

const logsChartStore = useLogsChartStore();
const { chartData, timespan, loading } = storeToRefs(logsChartStore);

onBeforeMount(async () => {
  logsChartStore.loadData();
});
</script>
