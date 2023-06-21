<template>
  <div v-if="$route && $route.name" class="vdd-container space-x-1">
    <small class="vdd-label">RouteName:</small>
    <small class="vdd-text">{{ $route.name }}</small>
  </div>
</template>
