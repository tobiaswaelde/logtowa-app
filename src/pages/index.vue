<template>
  <v-breadcrumbs :items="[{ title: 'Dashboard' }]" density="compact" />
  <v-divider />

  <v-container style="max-width: 100%">
    <v-row>
      <v-col :cols="12" :md="5" :lg="4" :xl="3" :xxl="2">
        <v-card :elevation="6">
          <v-card-title style="display: flex; padding-right: 8px">
            <span>Log Levels</span>
            <v-spacer />
            <v-btn-toggle
              variant="outlined"
              density="compact"
              v-model="levelsTimespan"
              style="height: 30px"
            >
              <v-btn value="hour">1h</v-btn>
              <v-btn value="day">24h</v-btn>
              <v-btn value="month">30d</v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-divider />
          <v-card-text style="padding: 8px">
            <ClientOnly fallback-tag="span" fallback="Loading...">
              <lazy-log-levels-pie-chart />
            </ClientOnly>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :cols="12" :md="7" :lg="8" :xl="9" :xxl="10">
        <v-card :elevation="6">
          <v-card-title style="display: flex; padding-right: 8px">
            <span>Logs</span>
            <v-spacer />
            <v-btn-toggle
              variant="outlined"
              density="compact"
              v-model="logsTimespan"
              style="height: 30px"
            >
              <v-btn value="hour">1h</v-btn>
              <v-btn value="day">24h</v-btn>
              <v-btn value="month">30d</v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-divider />
          <v-card-text style="padding: 8px">
            <ClientOnly fallback-tag="span" fallback="Loading...">
              <lazy-logs-chart />
            </ClientOnly>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { timespan: levelsTimespan } = storeToRefs(useLogLevelsChartStore());
const { timespan: logsTimespan } = storeToRefs(useLogsChartStore());

onBeforeMount(async () => {
  await useLogLevelsChartStore().loadData();
  await useLogsChartStore().loadData();
});
</script>
