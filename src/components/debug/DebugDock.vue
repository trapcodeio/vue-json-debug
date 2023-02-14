<script lang="ts" setup>
import { DebugDockComponents, useDebugStore } from "./index";
import { inject } from "vue";

const { slotStats, isVisible, toggleVisibility } = useDebugStore();
const debugDockComponents = inject<DebugDockComponents>("DebugDockComponents", {
  before: [],
  after: [],
});

function brief(str: string, limit = 6) {
  if (str.length <= limit) return str;
  return str.slice(0, limit).trim() + "...";
}

// function toggleSlot(i: number) {}
</script>
<template>
  <div id="DebugDock">
    <div class="vdd-wrapper">
      <template v-if="debugDockComponents.before.length">
        <template v-for="component in debugDockComponents.before">
          <component :is="component" />
        </template>
      </template>
      <div class="vdd-slots">
        <span class="vdd-text">slots:</span>
        <div class="vdd-tabs">
          <template v-for="i of slotStats.keys">
            <button
              @click.prevent="() => toggleVisibility(i)"
              class="vdd-tab"
              :class="{ active: isVisible(i) }"
            >
              {{
                slotStats.names[i] ? i + ". " + brief(slotStats.names[i]) : i
              }}
            </button>
          </template>
        </div>
      </div>
      <template v-if="debugDockComponents.after.length">
        <template v-for="component in debugDockComponents.after">
          <component :is="component" />
        </template>
      </template>
    </div>
  </div>
</template>
