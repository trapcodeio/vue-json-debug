<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";

const screen = ref(getCurrentBreakpoint());

onBeforeMount(() => {
  // watch for window resize
  window.addEventListener("resize", () => {
    screen.value = getCurrentBreakpoint();
  });
});

onBeforeUnmount(() => {
  // remove event listener on unmount
  window.removeEventListener("resize", () => {
    screen.value = getCurrentBreakpoint();
  });
});

function getCurrentBreakpoint() {
  // get current window width
  const width = window.innerWidth;
  // get current window height
  const height = window.innerHeight;

  let breakpoint: string;

  if (width < breakpointsTailwind.sm) breakpoint = "xs";
  else if (width < breakpointsTailwind.md) breakpoint = "sm";
  else if (width < breakpointsTailwind.lg) breakpoint = "md";
  else if (width < breakpointsTailwind.xl) breakpoint = "lg";
  else if (width < breakpointsTailwind["2xl"]) breakpoint = "xl";
  else breakpoint = "2xl";

  return { breakpoint, width, height };
}
</script>
<template>
  <div class="vdd-container space-x-1">
    <small class="vdd-label">Width:</small>
    <div>
      <small class="vdd-text uppercase mr-1">{{ screen.breakpoint }}</small>
      <small class="vdd-text-gray">[{{ screen.width + "px" }}]</small>
    </div>
  </div>
  <div class="vdd-container space-x-1">
    <small class="vdd-label">Height:</small>
    <div>
      <small class="vdd-text">{{ screen.height + "px" }}</small>
    </div>
  </div>
</template>
