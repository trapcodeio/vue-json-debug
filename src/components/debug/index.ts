import { computed, inject, reactive, ref, watch } from "vue";

export type DebugState = {
  minimized: boolean;
  showAll: boolean | undefined;
};

export type DebugDockComponents = {
  before: string[];
  after: string[];
};

export function DebugStore(theme?: string) {
  const slots = ref(new Map<number, { name?: string; data: any }>());

  let stateFromStorage = localStorage.getItem("vd__debugState");
  let defaultState: DebugState = {
    minimized: false,
    showAll: undefined,
  };

  let defaultVisibility: Record<number, boolean> = {};

  if (stateFromStorage) {
    const { state, visibility } = JSON.parse(stateFromStorage);

    defaultState = state;
    defaultVisibility = visibility;
  }

  const visibility = reactive(defaultVisibility);

  // Create state
  const state = reactive<DebugState>(defaultState);

  // save state to local storage on change
  watch(
    [state, visibility],
    () => {
      localStorage.setItem(
        "vd__debugState",
        JSON.stringify({ state, visibility })
      );
    },
    { immediate: true }
  );

  // get slots as array
  const stats = computed(() => {
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
    if (!visibility.hasOwnProperty(id)) visibility[id] = true;
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

  function toggleShowAll() {
    if (state.showAll === undefined) {
      state.showAll = true;
    } else if (state.showAll) {
      state.showAll = false;
    } else {
      state.showAll = undefined;
    }
  }

  return {
    state,
    stats,
    defaultTheme: theme ? theme : "light",
    addSlot,
    isVisible,
    toggleVisibility,
    toggleShowAll,
  };
}

export const useDebugStore = () => {
  return inject<ReturnType<typeof DebugStore>>("DebugStore")!;
};
