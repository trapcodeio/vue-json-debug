<script lang="ts" setup>
import { useDebugStore } from "./index";

const { slotStats, isVisible, toggleVisibility } = useDebugStore();

function brief(str: string, limit = 6) {
  if (str.length <= limit) return str;
  return str.slice(0, limit).trim() + "...";
}

// function toggleSlot(i: number) {}
</script>
<template>
  <div id="DebugDock">
    <div class="vdd-wrapper">
      <span class="vdd-text">Slots:</span>

      <div class="vdd-tabs">
        <template v-for="i of slotStats.keys">
          <button
            @click.prevent="() => toggleVisibility(i)"
            class="vdd-tab"
            :class="{ active: isVisible(i) }"
          >
            {{ slotStats.names[i] ? i + ". " + brief(slotStats.names[i]) : i }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
