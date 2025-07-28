<template>
  <button @click="$emit('click')" class="px-6 py-3 border rounded-lg text-lg hover:bg-gray-100">
    <slot />
  </button>
</template>
