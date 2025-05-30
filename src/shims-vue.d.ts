// shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // Props et bindings sont des objets génériques, et le "data" est inconnu
  const component: DefineComponent<
      Record<string, unknown>,
      Record<string, unknown>,
      unknown
  >
  export default component
}
