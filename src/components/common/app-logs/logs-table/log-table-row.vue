<template>
  <tr
    @click="
      () => {
        handleRowClick(item);
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
import LogLevelChip from '../../project-log/log-level-chip.vue';
import { LogMessage } from '../../../../types/log';
import { storeToRefs } from 'pinia';
import { useLogs } from '../../../../store/logs';

const props = defineProps<{ item: LogMessage }>();
// const isSelected = props.item.id !== selectedLog.value?.id;

const { selectLog } = useLogs();
const { selectedLog } = storeToRefs(useLogs());

const handleRowClick = (item: LogMessage) => {
  if (item.id !== selectedLog.value?.id) {
    selectLog(item.id);
  } else {
    selectedLog.value = null;
  }
};

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
