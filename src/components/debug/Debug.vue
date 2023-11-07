<script lang="ts">
export default {
  name: "Debug",
};
</script>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  onBeforeMount,
  onBeforeUnmount,
  type PropType,
  ref,
} from "vue";
import { type DebugID, useDebugState } from "./";

const instance = getCurrentInstance();
let ParentPath = instance?.parent?.type.__file;
let ParentPathComponent = undefined as string | undefined;
if (ParentPath) {
  ParentPathComponent = ParentPath.split("/").pop();
}

const {
  enabled,
  defaultTheme,
  state,
  addSlot,
  removeSlot,
  isVisible,
  toggleVisibility,
} = useDebugState();

/**
 * Props
 */
const props = defineProps({
  data: { default: {}, type: Object as PropType<Record<any, any> | undefined> },
  forceShow: { default: false, type: Boolean },
  space: { type: Number, default: 2 },
  name: { type: String },
  hideName: { type: Boolean, default: false },
  hideFirst: { type: Boolean, default: false },
  theme: { type: String },
  useParentName: { type: Boolean, default: false },
});

const id = ref<DebugID>();
const showMe = computed(() => {
  // only show if in dev mode
  if (enabled && state.showAll !== false) {
    // only show id has been assigned and is visible
    return (
      ["number", "string"].includes(typeof id.value) &&
      (state.showAll || isVisible(id.value!))
    );
  }
  return false;
});

const name = computed<string | undefined>(() => {
  if (props.name) {
    return props.name;
  } else if (props.useParentName) {
    return ParentPathComponent;
  }
});

onBeforeMount(() => {
  id.value = addSlot({
    name: name.value,
    data: props.data,
  });

  if (props.hideFirst) {
    toggleVisibility(id.value!, false);
  }
});

// Convert an object to json string
function processData(data: any, space: number = 2) {
  if (typeof data === "object") {
    return JSON.stringify(data, null, space).trim();
  } else {
    return data;
  }
}

onBeforeUnmount(() => {
  if (["number", "string"].includes(typeof id.value)) {
    removeSlot(id.value!);
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

          <button @click.prevent="() => toggleVisibility(id ?? 1)">[x]</button>
        </div>

        <pre class="vd-content" v-text="processData(data, space)"></pre>

        <div class="vd-path">@{{ ParentPath }}</div>
      </template>
      <slot v-else></slot>
    </div>
  </div>
</template>

<style></style>
