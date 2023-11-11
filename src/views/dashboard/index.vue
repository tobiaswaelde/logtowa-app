<template>
  <v-main>
    <v-breadcrumbs :items="[{ title: 'Dashboard' }]" density="compact" />
    <v-divider />

    <v-container style="max-width: 100%">
      <v-row>
        <v-col :cols="12" :md="5" :lg="4" :xl="3" :xxl="2">
          <LogLevelsPieChart />
        </v-col>
        <v-col :cols="12" :md="7" :lg="8" :xl="9" :xxl="10">
          <LogsBarChart />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import LogLevelsPieChart from '@/components/charts/log-levels-pie-chart.vue';
import LogsBarChart from '@/components/charts/logs-bar-chart.vue';
</script>
