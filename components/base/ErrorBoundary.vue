<template>
  <slot name="error" v-if="hasError" :error="error">{{ fallback }}</slot>
  <slot v-else />
</template>
<script setup>
import { ref, onErrorCaptured } from "vue";

const props = defineProps({
  fallback: {
    type: String,
    default: "Something went wrong.",
  },
});

const hasError = ref(false);
const error = ref(null);

onErrorCaptured((err, info) => {
  hasError.value = true;
  error.value = { err, info };
  return false;
});
</script>
