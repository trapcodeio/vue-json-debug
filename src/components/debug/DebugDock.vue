<script lang="ts" setup>
import { type DebugDockComponents, type DebugID, useDebugState } from "./index";
import { computed, inject } from "vue";

const {
  enabled,
  options,
  stats,
  state,
  isVisible,
  toggleVisibility,
  toggleShowAll,
} = useDebugState();

const debugDockComponents = inject<DebugDockComponents>("DebugDockComponents", {
  before: [],
  after: [],
});

const showMe = computed(() => {
  // only show if enabled
  if (enabled) {
    return !(options.dock.hideIfNoSlots && stats.value.keys.length === 0);
  }

  return false;
});

const showAllTitle = computed(() => {
  if (state.showAll === true) return "all";
  else if (state.showAll === false) return "none";
  return "custom";
});

function brief(str?: string, limit = 6) {
  if (!str) return "";
  if (str.length <= limit) return str;
  return str.slice(0, limit).trim() + "...";
}

function onSLotClick(i: DebugID) {
  if (state.showAll !== undefined) return;
  return toggleVisibility(i);
}
</script>
<template>
  <div v-if="showMe" id="DebugDock">
    <div class="vdd-wrapper">
      <template v-if="debugDockComponents.before.length">
        <template v-for="component in debugDockComponents.before">
          <component :is="component" />
        </template>
      </template>
      <div v-show="stats.keys.length" class="vdd-container vdd-slots">
        <small class="vdd-label">slots:</small>
        <div class="vdd-tabs">
          <template v-for="i of stats.keys">
            <button
              @click.prevent="() => onSLotClick(i)"
              class="vdd-tab"
              :class="{
                active:
                  state.showAll === true ||
                  (state.showAll !== false && isVisible(i)),
              }"
            >
              <small v-if="stats.names[i]">
                {{ brief(stats.names[i], options.dock.slotTitleLimit) }}
              </small>
              <span v-else v-text="i"></span>
            </button>
          </template>
        </div>
        <div class="vdd-slot-actions">
          <button
            @click.prevent="toggleShowAll"
            title="Toggle Visibility"
            class="vdd-show-toggle"
          >
            {{ showAllTitle }}
          </button>
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
