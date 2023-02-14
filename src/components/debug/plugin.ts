import { App, Component, Plugin } from "vue";
import Debug from "./Debug.vue";
import DebugDock from "./DebugDock.vue";
import { DebugStore, DebugDockComponents } from "./";

type DebugPluginOptions = {
  registerDebugComponent?: boolean;
  components?: {
    before?: Record<string, Component>;
    after?: Record<string, Component>;
  };
};

const DebugPlugin = <Plugin>{
  install(app, options?: DebugPluginOptions) {
    // Merge options
    const opts: DebugPluginOptions = {
      registerDebugComponent: false,
      ...(options || {}),
    };

    // Register Debug Dock
    app.component("DebugDock", DebugDock);

    // Register Debug Component
    if (opts.registerDebugComponent) {
      app.component("Debug", Debug);
    }

    // Register other components
    const DebugDockComponents: DebugDockComponents = {
      before: [] as string[],
      after: [] as string[],
    };

    if (opts.components) {
      if (opts.components.before) {
        for (const beforeKey in opts.components.before) {
          const component = opts.components.before[beforeKey];
          const Name = `DDSC__${beforeKey}`;
          app.component(Name, component);
          DebugDockComponents.before.push(Name);
        }
      }

      if (opts.components.after) {
        for (const afterKey in opts.components.after) {
          const component = opts.components.after[afterKey];
          const Name = `DDSC__${afterKey}`;
          app.component(Name, component);
          DebugDockComponents.after.push(Name);
        }
      }
    }

    // provide state
    app.provide("DebugStore", DebugStore());
    app.provide("DebugDockComponents", DebugDockComponents);
  },
};

export const useDebugPlugin = (app: App, options?: DebugPluginOptions) => {
  return app.use(DebugPlugin, options);
};
