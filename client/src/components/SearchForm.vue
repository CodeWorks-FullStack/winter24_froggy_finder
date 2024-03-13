<template>
  <form @submit.prevent="setQuery()">
    <div class="mb-3">
      <label for="name" class="form-label">Frog Name</label>
      <input v-model="editableSearchData.name" type="text" class="form-control" id="name" placeholder="Frog Name">
    </div>
    <div class="mb-3">
      <label for="likes" class="form-label">What does your ideal frog like?</label>
      <input v-model="editableSearchData.likes" type="text" class="form-control" id="likes" placeholder="Frog Likes">
    </div>
    <div class="mb-3">
      <label for="dislikes" class="form-label">What does your ideal frog dislike?</label>
      <input v-model="editableSearchData.dislikes" type="text" class="form-control" id="dislikes"
        placeholder="Frog Likes">
    </div>
    <div class="mb-3">
      <label for="age" class="form-label">
        Maximum age of frog that you would still kiss: {{ editableSearchData.age }}
      </label>
      <input v-model="editableSearchData.age" type="range" class="form-range" id="age" min="18" max="100">
    </div>
    <div class="mb-3">
      <label for="color" class="form-label">Frog Color</label>
      <input v-model="editableSearchData.color" type="text" class="form-control" id="color" placeholder="Frog Color">
    </div>
    <button class="btn btn-success" type="submit">Search <i class="mdi mdi-magnify"></i></button>
  </form>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';

export default {
  setup() {
    const editableSearchData = ref({ age: 100, })
    const router = useRouter()
    return {
      editableSearchData,
      setQuery() {
        logger.log('Hello?')
        router.push({ query: editableSearchData.value })
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>