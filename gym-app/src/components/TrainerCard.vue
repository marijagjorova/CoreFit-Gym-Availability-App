<template>
  <div class="trainer-card">
    <img :src="trainer.img" :alt="trainer.name" />
    <h2>{{ trainer.name }}</h2>
    <p>{{ trainer.specialty }}</p>
  </div>
</template>

<script setup>
defineProps({
  trainer: Object
})
</script>

<style>
.trainer-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  width: 200px;
  text-align: center;
}
.trainer-card img {
  width: 100%;
  border-radius: 10px;
}
</style>
