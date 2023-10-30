<template>
  <tr
    :ref="
      logs.findIndex((x) => x.id === item.id) === logs.length - 1
        ? `lastRow`
        : undefined
    "
    @click="
      (e) => {
        getLog(item.id);
      }
    "
  >
    <td
      style="cursor: pointer; font-family: monospace !important"
      :class="{
        'bg-background': item.id !== selectedLog?.id,
        'bg-background-darken1': item.id === selectedLog?.id,
      }"
    >
      {{ getTimestamp(item.timestamp) }}
    </td>

    <td
      style="cursor: pointer"
      :class="{
        'bg-background': item.id !== selectedLog?.id,
        'bg-background-darken1': item.id === selectedLog?.id,
      }"
    >
      <log-level-chip :value="item.level" />
    </td>

    <td
      style="cursor: pointer; font-family: monospace !important"
      :class="{
        'bg-background': item.id !== selectedLog?.id,
        'bg-background-darken1': item.id === selectedLog?.id,
      }"
    >
      {{ item.scope }}
    </td>

    <td
      style="cursor: pointer; font-family: monospace !important"
      :class="{
        'bg-background': item.id !== selectedLog?.id,
        'bg-background-darken1': item.id === selectedLog?.id,
      }"
    >
      {{ item.message }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import moment from 'moment';
import { LogMessage } from '../../../../types/log';

const props = defineProps<{ item: LogMessage }>();

const { getLog, loadMoreData } = useLogs();
const { logs, selectedLog } = storeToRefs(useLogs());

const lastRow = ref<any>(null);
const lastRowVisible = useElementVisibility(lastRow);

watch([lastRowVisible], () => {
  console.log(lastRowVisible.value);
  if (lastRowVisible.value === true) {
    loadMoreData();
  }
});

const getTimestamp = (timestamp: string) => {
  const time = moment(timestamp);
  if (time.isAfter(moment().startOf('day'))) {
    return time.format('HH:mm:ss.SSS');
  } else if (time.isAfter(moment().startOf('day').subtract(1, 'week'))) {
    return time.format('ddd, HH:mm:ss.SSS');
  } else {
    return time.format('DD.MM., HH:mm:ss.SSS');
  }
};
</script>
