import {inject, reactive, ref} from "vue";


export type DebugState = {
    minimized: boolean;
}


export function DebugStore() {
    const slots = ref(new Map<number, any>());
    // slots.value.set(0, {name: "First Debug Box"})

    // Create state
    const state = reactive<DebugState>({
        minimized: false
    })

    function addSlot(data: any) {
        const nextSlotKey = slots.value.size + 1;

        // add slot to map
        slots.value.set(nextSlotKey, data);

        console.log({slots: slots.value.size, nextSlotKey})

    }

    return {slots, state, addSlot}
}


export const useDebugStore = () => {
    return inject<ReturnType<typeof DebugStore>>("DebugStore")!;
}