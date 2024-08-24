<template>
  <div class="container">
    <h1 class="title">Текущая временная метка</h1>
    <p class="timestamp">{{ formattedTimestamp }}</p>
    <h1 class="title">Список постов</h1>
    <ul v-if="posts && posts?.length" class="post-grid">
      <PostsItem v-for="post in posts" :key="post?.id" :item="post" />
    </ul>
    <p v-else class="loading">Загрузка постов...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFetch } from "#app";

const timestamp = ref(null);
const posts = ref([]);

const formattedTimestamp = computed(() => {
  if (!timestamp.value) return "";

  const date = new Date(timestamp.value.value);

  if (isNaN(date.getTime())) {
    console.error("Некорректное значение времени:", timestamp.value.value);
    return "Некорректное время";
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return new Intl.DateTimeFormat("ru-RU", options).format(date);
});

const getTimestamp = async () => {
  try {
    const { data } = await useFetch("/api/timestamp");
    timestamp.value = data.value;
  } catch (error) {
    console.error(error);
  }
};

const getPosts = async () => {
  try {
    const { data } = await useFetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    posts.value = data.value;
  } catch (error) {
    console.error(error);
    // Обработка ошибки
  }
};

await getPosts();
await getTimestamp();

onMounted(async () => {
  // Обновление временной метки каждые 10 секунд
  setInterval(async () => {
    await getTimestamp();
  }, 10000);
});
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.timestamp {
  font-size: 20px;
  color: #555;
  margin-bottom: 30px;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.post-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, background-color 0.3s;
}

.post-card:hover {
  transform: translateY(-5px);
  background-color: #f1f1f1;
}

.post-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.post-body {
  font-size: 14px;
  color: #666;
}

.loading {
  color: #777;
  font-style: italic;
}

/* Адаптивные стили для мобильных устройств */
@media (max-width: 768px) {
  .post-grid {
    grid-template-columns: 1fr;
  }
}
</style>
