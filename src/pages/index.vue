<template>
  <v-breadcrumbs :items="[{ title: 'Dashboard' }]" density="compact" />
  <v-divider />

  <v-container style="max-width: 100%">
    <v-row>
      <v-col :cols="12" :md="5" :lg="4" :xl="3" :xxl="2">
        <v-card :elevation="6">
          <v-card-title> Log Levels </v-card-title>
          <v-divider />
          <v-card-text>
            <ClientOnly>
              <log-levels-pie-chart />
            </ClientOnly>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :cols="12" :md="7" :lg="8" :xl="9" :xxl="10">
        <v-card :elevation="6">
          <v-card-title>Logs Bar Chart</v-card-title>
          <v-divider />
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            impedit aut vel nemo consequuntur cumque repellat, voluptates
            dolorem culpa accusantium ab eum unde nobis nesciunt, earum sapiente
            tenetur! Voluptates, sunt!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// definePageMeta({ redirect: { path: '/groups', replace: true, force: true } });
</script>
