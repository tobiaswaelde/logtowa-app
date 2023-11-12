<template>
  <h4>{{ title }}</h4>

  <div
    class="log-info-item"
    style="
      width: 100%;
      min-height: 25px;
      display: flex;
      flex-direction: row;
      align-items: center;
    "
  >
    <template v-if="loading || value === undefined">
      <template v-if="type === 'message'">
        <v-skeleton-loader width="100%" type="paragraph" color="background" />
      </template>
      <template v-else-if="type === 'meta'">
        <v-skeleton-loader width="100%" type="image" color="background" />
      </template>
      <template v-else>
        <v-skeleton-loader width="100%" type="text" color="background" />
      </template>
    </template>

    <template v-else>
      <template v-if="type === 'date'">
        <span class="font-monospace">
          {{ value ? moment(value).format('YYYY-MM-DD') : 'null' }}
        </span>
      </template>
      <template v-else-if="type === 'time'">
        <span class="font-monospace">
          {{ value ? moment(value).format('HH:mm:ss.SSS') : 'null' }}
        </span>
      </template>
      <template v-else-if="type === 'level'">
        <LogLevelChip v-if="value !== null" :value="value" />
        <span v-else class="font-monospace">null</span>
      </template>
      <template v-else-if="type === 'scope'">
        <span class="font-monospace">
          {{ value ?? 'null' }}
        </span>
      </template>
      <template v-else-if="type === 'message'">
        <span class="font-monospace">
          {{ value ?? 'null' }}
        </span>
      </template>
      <template v-else-if="type === 'meta'">
        <pre v-highlightjs v-if="value">
          <code class='json'>{{ value }}</code>
        </pre>
        <span v-else>
          <em>No meta information given.</em>
        </span>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import LogLevelChip from '@/components/ui/chips/log-level-chip.vue';
import moment from 'moment';

type LogInfoType =
  | {
      type: 'date' | 'time' | 'level' | 'scope' | 'message';
      value?: string | null;
    }
  | {
      type: 'meta';
      value?: object | string | null;
    };

defineProps<
  {
    loading?: boolean;
    title: string;
  } & LogInfoType
>();
</script>

<style lang="scss">
.log-info-item {
  .v-skeleton-loader > .v-skeleton-loader__text {
    margin: 0px 0px;
  }

  .v-skeleton-loader > .v-skeleton-loader__paragraph {
    & > .v-skeleton-loader__text {
      margin-left: 0px;
      margin-right: 0px;

      &:first-child {
        margin-top: 8px;
      }
      &:last-child {
        margin-bottom: 8px;
      }
    }
  }

  .v-skeleton-loader__image {
    border-radius: 8px;
  }
}
</style>
