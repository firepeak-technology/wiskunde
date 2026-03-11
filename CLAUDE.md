# Conventions

## Project overview

- Build: Vite 7 with `vite-plugin-dts` for library builds (CJS + ESM)
- Docs: VuePress 2 with `vuepress-theme-hope`

## Code style

- TypeScript strict mode
- pnpm for package management
- NX monorepo conventions
- Prefer `type` over `interface`
- Prettier: single quotes (`"singleQuote": true`)
- ESLint flat config with scope-based module boundary constraints

## Vue

- Vue 3.5 with `<script setup lang="ts">`
- Always put `<template>` first, then `<script setup>`
- Component file: `ComponentName.vue` with props in `ComponentName.properties.ts`
- Props use Vue object syntax with `PropType`:

```ts
import type { PropType } from 'vue';

export const MyComponentProperties = {
  options: { type: Array as PropType<Array<any>>, required: true },
  labelKey: { type: String, default: 'label' },
};

export const MyComponentEmits = ['update:modelValue', 'select'];
```

- Composables go in a `composables/` folder next to the component that uses them
- Naming: `useFeatureName.ts` (e.g., `useSearch.ts`, `useOptions.ts`)

## Styling

- Tailwind CSS 4 + daisyUI 5 with a custom `ugent` theme
- SCSS for theme variables and utilities (`_scss/` folder)
- Use Tailwind utility classes in templates; avoid inline styles

