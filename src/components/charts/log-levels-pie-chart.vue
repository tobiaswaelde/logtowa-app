<template>
  <v-card>
    <v-card-title style="display: flex; padding-right: 8px">
      <span>Log Levels</span>
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
                colors: chartData.labels.map((level) =>
                  getColorFromLevel(level),
                ),
              },
              colors: chartData.labels.map((level) => getColorFromLevel(level)),
              plotOptions: { pie: { donut: { size: '40%' } } },
            }"
            :series="chartData.series"
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
import { COLORS } from '@/config/colors';
import { getColorFromLevel } from '@/util/color';
import { useLogLevelsChartStore } from '@/store/log-levels-chart';

const logLevelsChartStore = useLogLevelsChartStore();
const { chartData, timespan, loading } = storeToRefs(logLevelsChartStore);

onBeforeMount(async () => {
  logLevelsChartStore.loadData();
});
</script>
