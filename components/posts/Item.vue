<template>
  <BaseErrorBoundary>
    <div class="post-card">
      <h2 class="post-title">{{ item?.title ?? "Нет заголовка" }}</h2>
      <p class="post-body">{{ item?.body ?? "Нет описания" }}</p>
    </div>
  </BaseErrorBoundary>
</template>
<script setup>
const props = defineProps({
  item: Object,
});
</script>
