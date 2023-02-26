<script setup lang="ts">
import { useDebugState } from "../components/debug";

const debugStore = useDebugState();

function addSlot() {
  debugStore.addSlot({
    name: "Composed",
    data: {
      title: "A short Story",
      content: "Once upon a time...",
    },
  });
}
</script>
<template>
  <button @click="addSlot">Click to add slot</button>
</template>
