import { Component, computed, inject, reactive, ref, watch } from "vue";

export type DebugState = {
  showAll: boolean | undefined;
};

export type DebugDockComponents = {
  before: string[];
  after: string[];
};

export type DebugPluginOptions = {
  enableIf: () => boolean;
  dock: {
    hideIfNoSlots?: true;
    slotTitleLimit?: number;
  };
  defaultDebugTheme: string;
  registerDebugComponent: boolean;
  components?: {
    before?: Record<string, Component>;
    after?: Record<string, Component>;
  };
};

export function DebugStore(opts: DebugPluginOptions) {
  const slots = ref(new Map<number, { name?: string; data: any }>());

  let stateFromStorage = localStorage.getItem("vd__debugState");
  let defaultState: DebugState = { showAll: undefined };
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

  function removeSlot(id: number) {
    slots.value.delete(id);
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
    enabled: opts.enableIf(),
    defaultTheme: opts.defaultDebugTheme ?? "light",
    options: opts as Omit<DebugPluginOptions, "components">,
    state,
    stats,
    addSlot,
    removeSlot,
    isVisible,
    toggleVisibility,
    toggleShowAll,
  };
}

export const useDebugStore = () => {
  return inject<ReturnType<typeof DebugStore>>("DebugStore")!;
};
