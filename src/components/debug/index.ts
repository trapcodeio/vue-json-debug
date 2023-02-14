import { computed, inject, reactive, ref } from "vue";

export type DebugState = { minimized: boolean };

export type DebugDockComponents = {
  before: string[];
  after: string[];
};

export function DebugStore() {
  const slots = ref(new Map<number, { name?: string; data: any }>());

  const visibility = reactive({} as Record<number, boolean>);

  // Create state
  const state = reactive<DebugState>({
    minimized: false,
  });

  // get slots as array
  const slotStats = computed(() => {
    const names = {} as Record<number, string | undefined>;

    slots.value.forEach((v, k) => {
      names[k] = v.name;
    });

    return {
      keys: Array.from(slots.value.keys()),
      names,
    };
  });

  function addSlot(data: any, name?: string) {
    const id = slots.value.size + 1;

    // add slot to map
    // visibility[id] = false;
    slots.value.set(id, { name, data });

    return id;
  }

  function toggleVisibility(id: number, val?: boolean) {
    if (val === undefined) {
      if (typeof visibility[id] === "boolean") {
        visibility[id] = !visibility[id];
      } else {
        visibility[id] = false;
      }
    } else {
      visibility[id] = val;
    }
  }

  function isVisible(id: number) {
    return visibility[id] !== false;
  }

  return { state, slotStats, addSlot, isVisible, toggleVisibility };
}

export const useDebugStore = () => {
  return inject<ReturnType<typeof DebugStore>>("DebugStore")!;
};
