import {App, Plugin} from "vue";
import Debug from "./Debug.vue";
import DebugDock from "./DebugDock.vue";
import {DebugStore} from "./";

export type DebugState = {
    minimized: boolean;
}

type DebugPluginOptions = {
    registerDebugComponent?: boolean;
}


const DebugPlugin = <Plugin>{
    install(app, options?: DebugState) {
        // Merge options
        const opts: DebugPluginOptions = {
            registerDebugComponent: false,
            ...(options || {})
        }

        // Register Debug Dock
        app.component("DebugDock", DebugDock)

        // Register Debug Component
        if (opts.registerDebugComponent) {
            app.component("Debug", Debug)
        }

        // provide state
        app.provide("DebugStore", DebugStore());
    }
}

export const useDebugPlugin = (app: App, options?: DebugPluginOptions) => {
    return app.use(DebugPlugin, options);
}