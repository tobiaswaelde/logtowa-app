<template>
  <tr>
    <td :class="tdClass">
      {{ getTimestamp(item.timestamp) }}
    </td>
    <td :class="tdClass">
      <LogLevelChip :value="item.level" />
    </td>
    <td :class="tdClass">
      {{ item.scope }}
    </td>
    <td :class="tdClass">
      {{ item.message }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import LogLevelChip from '@/components/ui/chips/log-level-chip.vue';
import moment from 'moment';
import { LogMessage } from '@/types/log';

const props = defineProps<{ item: LogMessage }>();
const selectedLog: any = null;

const tdClass = {
  'bg-background': props.item.id !== selectedLog?.id,
  'bg-background-darken1': props.item.id === selectedLog?.id,
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

<style lang="scss" scoped>
td {
  cursor: pointer;
  font-family: monospace !important;
}
</style>
