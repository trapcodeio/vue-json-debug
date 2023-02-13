<script lang="ts" setup>
import {onMounted, type PropType, ref} from "vue";
import {useDebugStore} from "./debug.setup";

// Check if in development mode
const isDev = import.meta.env.DEV;

const {addSlot, isVisible, toggleVisibility} = useDebugStore()

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
const id = ref<number>()

onMounted(() => {
  id.value = addSlot(props.data)
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
  <div v-if="isVisible(id)">
    <div :class="`vd-${theme}-theme`" v-if="isDev || (!isDev && forceShow)">
      <template v-if="data">
        <div class="vd-header">
          <div>
            <h6 v-if="header" v-text="header"></h6>
          </div>
          <button @click.prevent="() => toggleVisibility(id)">[x]</button>
        </div>

        <pre class="vd-content" v-text="processData(data, space)"></pre>

      </template>
      <slot v-else></slot>
    </div>
  </div>

</template>

<style>
.vd-header {
  display: flex;
  justify-content: space-between;
}

.vd-header > button {
  padding: 5px;
  margin: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: small;
}

.vd-header > button:hover {
  text-decoration: underline;
  font-size: medium;
}

.vd-content {
  font-size: medium;
  padding-left: 5px;
  padding-right: 5px;
}

.vd-light-theme {
  background-color: #f5f5f5;
  color: #1a1a1a;
  border-radius: 5px;
  text-align: left;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.vd-light-theme .vd-header > button {
  color: #1a1a1a;
}

.vd-dark-theme {
  background-color: #1a1a1a;
  color: #f5f5f5;
  border-radius: 5px;
  text-align: left;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.vd-dark-theme .vd-header > button {
  color: #f5f5f5;
}
</style>