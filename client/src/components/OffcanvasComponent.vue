<template>
  <div class="offcanvas offcanvas-start" tabindex="-1" id="searchOffcanvas" aria-labelledby="searchOffcanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="searchOffcanvasLabel">Search Frogs</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form @submit.prevent="searchFrogs()">
        <div class="mb-3">
          <label for="name" class="form-label">Frog Name</label>
          <input v-model="editableSearchQuery.name" type="text" class="form-control" id="name">
        </div>
        <div class="mb-3">
          <label for="color" class="form-label">Frog Color</label>
          <input v-model="editableSearchQuery.color" type="text" class="form-control" id="color">
        </div>

        <button class="btn btn-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const editableSearchQuery = ref({})
    const router = useRouter()
    return {
      editableSearchQuery,
      searchFrogs() {
        logger.log('searching frogs', editableSearchQuery.value)
        router.push({ query: editableSearchQuery.value })
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>