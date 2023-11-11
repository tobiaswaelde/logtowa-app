<template>
  <v-main>
    <v-breadcrumbs :items="[{ title: 'Dashboard' }]" density="compact" />
    <v-divider />

    <v-container style="max-width: 100%">
      <v-row>
        <v-col :cols="12" :md="5" :lg="4" :xl="3" :xxl="2">
          <LogLevelsPieChart />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import LogLevelsPieChart from '@/components/charts/log-levels-pie-chart.vue';
</script>
