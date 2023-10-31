<template>
  <ApexCharts
    type="bar"
    :key="chartKey"
    :height="100"
    :options="{
      chart: {
        type: 'bar',
        stacked: true,
        width: '100%',
        height: 100,
        foreColor: '#adb2be',
        zoom: { enabled: false },
        toolbar: { show: false },
        parentHeightOffset: 0,
      },
      dataLabels: { enabled: false },
      labels: Object.keys(data).map((x) => moment(x).format('HH:mm')),
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
        shared: true,
        intersect: false,
      },
      stroke: {
        colors: logLevels.map((level) => getColorFromLevel(level)),
      },
      markers: { size: 0 },
      fill: {
        colors: logLevels.map((level) => getColorFromLevel(level)),
      },
      colors: logLevels.map((level) => getColorFromLevel(level)),
    }"
    :series="
      logLevels.map((level) => ({
        name: level,
        data: Object.values(data).map((x) => x[level] ?? 0),
      }))
    "
  ></ApexCharts>
</template>

<style lang="scss">
.apexcharts-tooltip {
  background: #22252b !important;
  color: #adb2be !important;
}
</style>

<script setup lang="ts">
import moment from 'moment';
import ApexCharts from 'vue3-apexcharts';
import { getColorFromLevel } from '../../../util/color';

type DataType = { [minute: string]: { [level: string]: number } };

const { logs } = storeToRefs(useLogs());
const data = ref<DataType>({});
const chartKey = ref<number>(0);
const logLevels = ref<string[]>([]);

onMounted(() => {
  setTimeout(() => {
    chartKey.value++;
  }, 1000);
});

watch([logs], () => {
  const minuteCounts: DataType = {};

  const now = moment(); // Get the current time
  const lastHour = now.clone().subtract(1, 'hour'); // Subtract 1 hour

  logs.value.forEach((log) => {
    const ts = moment(log.timestamp);
    if (ts.isBefore(lastHour)) return;
    if (!logLevels.value.includes(log.level)) {
      logLevels.value.push(log.level);
    }

    const minute = ts.format('YYYY-MM-DD HH:mm');
    if (minuteCounts[minute]) {
      if (minuteCounts[minute][log.level]) {
        minuteCounts[minute][log.level]++;
      } else {
        minuteCounts[minute][log.level] = 1;
      }
    } else {
      minuteCounts[minute] = {
        [log.level]: 1,
      };
    }
  });

  const minutesInLastHour: string[] = [];

  while (lastHour.isBefore(now.endOf('minute'))) {
    minutesInLastHour.push(lastHour.format('YYYY-MM-DD HH:mm'));
    lastHour.add(1, 'minute'); // Increment by 1 minute
  }

  minutesInLastHour.forEach((min) => {
    if (minuteCounts[min]) {
      data.value[min] = minuteCounts[min];
    } else {
      data.value[min] = {};
    }
  });
});
</script>
