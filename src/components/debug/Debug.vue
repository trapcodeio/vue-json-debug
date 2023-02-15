<script lang="ts">
export default {
  name: "Debug",
};
</script>
<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  type PropType,
  ref,
} from "vue";
import { useDebugStore } from "./";

const instance = getCurrentInstance();
let ParentName = instance?.parent?.type.__file;
if (ParentName) {
  ParentName = ParentName.split("/").pop();
}

const {
  enabled,
  defaultTheme,
  state,
  addSlot,
  removeSlot,
  isVisible,
  toggleVisibility,
} = useDebugStore();

/**
 * Props
 */
const props = defineProps({
  data: { default: {}, type: Object as PropType<Record<any, any> | undefined> },
  forceShow: { default: false, type: Boolean },
  space: { type: Number, default: 2 },
  name: { type: String },
  hideName: { type: Boolean, default: false },
  theme: { type: String },
  useParentName: { type: Boolean, default: false },
});

const id = ref<number>();
const showMe = computed(() => {
  // only show if in dev mode
  if (enabled && state.showAll !== false) {
    // only show id has been assigned and is visible
    return (
      typeof id.value === "number" && (state.showAll || isVisible(id.value))
    );
  }
  return false;
});

const name = computed<string | undefined>(() => {
  if (props.name) {
    return props.name;
  } else if (props.useParentName) {
    return ParentName;
  }
});

onMounted(() => {
  id.value = addSlot(props.data, name.value);
});

// Convert object to json string
function processData(data: any, space: number = 2) {
  if (typeof data === "object") {
    return JSON.stringify(data, null, space).trim();
  } else {
    return data;
  }
}

onBeforeUnmount(() => {
  if (typeof id.value === "number") {
    removeSlot(id.value);
  }
});
</script>

<template>
  <div v-if="showMe" :key="id" class="vd-debug-component">
    <div :class="`vd-${theme ? theme : defaultTheme}-theme`">
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
