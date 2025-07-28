<template>
  <button @click="$emit('click')" class="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl text-xl font-bold shadow">
    <slot />
  </button>
</template>
