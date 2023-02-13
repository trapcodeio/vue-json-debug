<script lang="ts" setup>
import {onMounted, type PropType} from "vue";
import {useDebugStore} from "./debug.setup";

// Check if in development mode
const isDev = import.meta.env.DEV;

const {slots, addSlot} = useDebugStore()

/**
 * Props
 */
const props = defineProps({
  data: {default: {}, type: Object as PropType<Record<any, any> | undefined>},
  forceShow: {default: false, type: Boolean},
  space: {type: Number, default: 2},
  header: {type: String},
  theme: {type: String, default: "light"},
});

onMounted(() => {
  console.log("before", slots.value.size)
  addSlot(props.data)
  console.log("after", slots.value.size)
})

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
  <div :class="`vd-${theme}-theme`" v-if="isDev || (!isDev && forceShow)">
    <template v-if="data">

      <h6 v-if="header" class="vd-header" v-text="header"></h6>
      <pre class="vd-content" v-text="processData(data, space)"></pre>

    </template>
    <slot v-else></slot>
  </div>
</template>

<style>
.vd-light-theme {
  background-color: #f5f5f5;
  color: #1a1a1a;
  border-radius: 5px;
  text-align: left;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
//border: 1px solid #1a1a1a;
}

.vd-dark-theme {
  background-color: #1a1a1a;
  color: #f5f5f5;
  border-radius: 5px;
  text-align: left;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
//border: 1px solid #f5f5f5;
}

.vd-content {
  font-size: medium;
  padding-left: 5px;
  padding-right: 5px;
}


</style>