<script setup lang="ts"></script>

<template>
  <aside class="sticky-side-bar">
    <slot />
  </aside>
</template>

<style lang="scss" scoped>
  .sticky-side-bar {
    position: sticky;
    top: 66px;
    z-index: 2;
    overflow-y: scroll;
    height: fit-content !important;
  }
</style>
