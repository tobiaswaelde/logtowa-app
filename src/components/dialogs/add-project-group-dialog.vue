<template>
  <v-tooltip text="Add Project Group" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconFolderPlus />
      </v-btn>
      <v-dialog v-model="dialogOpen" persistent>
        <v-card>
          <v-card-title>Create Project Group</v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col :cols="12">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  label="Name"
                  hint="The name of the project group"
                  required
                  :maxlength="255"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="error">Cancel</v-btn>
            <v-btn variant="outlined" color="success">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
import { IconFolderPlus } from '@tabler/icons-vue';

const dialogOpen = ref<boolean>(false);
</script>
