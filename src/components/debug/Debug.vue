<script lang="ts" setup>
import { onMounted, type PropType, ref } from "vue";
import { useDebugStore } from "./";

// Check if in development mode
const isDev = import.meta.env.DEV;

const { addSlot, isVisible, toggleVisibility } = useDebugStore();

/**
 * Props
 */
const props = defineProps({
  data: { default: {}, type: Object as PropType<Record<any, any> | undefined> },
  forceShow: { default: false, type: Boolean },
  space: { type: Number, default: 2 },
  name: { type: String },
  hideName: { type: Boolean, default: false },
  theme: { type: String, default: "light" },
});
const id = ref<number>();

onMounted(() => {
  id.value = addSlot(props.data, props.name);
});

// Convert object to json string
function processData(data: any, space: number = 2) {
  if (typeof data === "object") {
    return JSON.stringify(data, null, space).trim();
  } else {
    return data;
  }
}
</script>

<template>
  <div v-if="isVisible(id)">
    <div :class="`vd-${theme}-theme`" v-if="isDev || (!isDev && forceShow)">
      <template v-if="data">
        <div class="vd-header">
          <span v-if="name && !hideName" v-text="name"> </span>
          <span v-else></span>

          <button @click.prevent="() => toggleVisibility(id)">[x]</button>
        </div>

        <pre class="vd-content" v-text="processData(data, space)"></pre>
      </template>
      <slot v-else></slot>
    </div>
  </div>
</template>

<style></style>
