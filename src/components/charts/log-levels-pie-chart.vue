<template>
  <div>
    <div style="display: flex; padding: 8px">
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
    </div>
    <ApexCharts
      type="donut"
      :height="400"
      :options="{
        chart: { type: 'donut', foreColor: '#adb2be' },
        legend: { position: 'bottom' },
        labels: ['error', 'warn', 'info', 'http', 'debug', 'silly', 'verbose'],
        stroke: { colors: [COLORS.background] },
        fill: { colors: ['#f00'] },
        plotOptions: { pie: { donut: { size: '40%' } } },
      }"
      :series="[1, 2, 3, 4, 5, 6, 7]"
    />
  </div>
</template>

<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts';
import { COLORS } from '../../config/colors';

const timespan = ref<any>('hour');
</script>
