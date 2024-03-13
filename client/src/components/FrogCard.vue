<template>
  <div class="rounded shadow-lg bg-light">
    <img class="rounded-top w-100" :src="frog.picture" :alt="frog.name">
    <div class="p-4">
      <p class="fw-bold fs-2 mb-1"> {{ frog.name }}</p>
      <p>
        <span>{{ frog.age }} year old </span>
        <span>{{ frog.color }}</span>
        <span v-if="frog.isPoisonous"> poisonous</span>
        <span>{{ frog.isToad ? ' toad' : ' frog' }}</span>
      </p>
      <p v-if="frog.likes.length">
        <b>Likes </b><span>{{ frog.likes.join(', ') }}</span>
      </p>
      <p v-if="frog.dislikes.length">
        <b>Dislikes </b><span>{{ frog.dislikes.join(', ') }}</span>
      </p>
    </div>
  </div>
</template>


<script>
import { Frog } from '../models/Frog.js';

export default {
  props: {
    frog: { type: Frog, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 45vh;
  object-fit: cover;
}
</style>