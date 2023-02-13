import {App, Plugin} from "vue";
import Debug from "./Debug.vue";
import {DebugStore} from "./debug.setup";

export type DebugState = {
    minimized: boolean;
}

type DebugPluginOptions = {
    registerComponent?: boolean;
}


const DebugPlugin = <Plugin>{
    install(app, options?: DebugState) {
        // Merge options
        const opts: DebugPluginOptions = {
            registerComponent: false,
            ...(options || {})
        }

        // Register Component
        if (opts.registerComponent) app.component("Debug", Debug);

        // provide state
        app.provide("DebugStore", DebugStore());
    }
}

export const useDebugPlugin = (app: App, options?: DebugPluginOptions) => {
    return app.use(DebugPlugin, options);
}