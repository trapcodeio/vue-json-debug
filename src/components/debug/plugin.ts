import { App, Plugin } from "vue";
import Debug from "./Debug.vue";
import DebugDock from "./DebugDock.vue";
import { DebugStore, DebugDockComponents, DebugPluginOptions } from "./";

const DebugPlugin = <Plugin>{
  install(app, options: Partial<DebugPluginOptions> = {}) {
    // Merge options
    const opts: DebugPluginOptions = {
      enableIf: options.enableIf ? options.enableIf : () => import.meta.env.DEV,
      dock: {
        hideIfNoSlots: true,
        slotTitleLimit: 20,
        ...(options.dock || {}),
      },
      defaultDebugTheme: options.defaultDebugTheme ?? "light",
      registerDebugComponent: options.registerDebugComponent ?? false,
      components: {
        ...(options.components || {}),
      },
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
      delete opts.components;
    }

    // provide state
    app.provide("DebugStore", DebugStore(opts));
    app.provide("DebugDockComponents", DebugDockComponents);
  },
};

export const useDebugPlugin = (
  app: App,
  options?: Partial<DebugPluginOptions>
) => {
  return app.use(DebugPlugin, options);
};
