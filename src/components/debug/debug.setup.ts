import {inject, reactive, ref} from "vue";


export type DebugState = {
    minimized: boolean;
}


export function DebugStore() {
    const slots = ref(new Map<number, any>());
    const visibility = reactive({} as Record<number, boolean>)

    // Create state
    const state = reactive<DebugState>({
        minimized: false
    })

    function addSlot(data: any) {
        const nextSlotKey = slots.value.size + 1;

        // add slot to map
        slots.value.set(nextSlotKey, data);

        return nextSlotKey;
    }

    function toggleVisibility(id: number, val?: boolean) {
        if (val === undefined) {
            if (typeof visibility[id] === "boolean") {
                visibility[id] = !visibility[id]
            } else {
                visibility[id] = false;
            }
        } else {
            visibility[id] = val
        }
    }

    function isVisible(id: number) {
        return visibility[id] !== false;
    }

    return {state, addSlot, isVisible, toggleVisibility}
}


export const useDebugStore = () => {
    return inject<ReturnType<typeof DebugStore>>("DebugStore")!;
}