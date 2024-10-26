<script setup lang="ts">
import type { HpNavItem } from '~/types/navigation.model';

const navItems: HpNavItem[] = [
  {
    name: 'search',
    label: 'Zoeken',
  },
  {
    name: 'sell',
    label: 'Verkopen',
  },
  {
    name: 'my house',
    label: 'Mijn huis',
  },
];

const activeMenu = ref<string>(null);
</script>

<template>
  <header class="px-6 flex items-center">
    <nav class="flex items-center">
      <img
        src="/img/logo-full.svg"
        alt="Huispedia logo"
        height="26"
        width="150"
        class="mr-8"
      />
      <ul class="flex gap-8 h-full">
        <li
          v-for="navItem in navItems"
          :key="navItem.name"
          class="cursor-pointer nav-item"
          :class="{ active: activeMenu === navItem.name }"
          @click="activeMenu = navItem.name"
        >
          {{ navItem.label }}
        </li>
      </ul>
    </nav>
  </header>
  <main class="mx-6">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
header {
  border-bottom: 1px solid #ccc;
  height: 60px;
}

.nav-item {
  transition: var(--transition);

  &.active,
  &:hover {
    color: var(--color-primary);
  }
}
</style>
