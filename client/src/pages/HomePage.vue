<template>
  <div class="container">
    <section class="row">
      <div class="col-12 my-3">
        <h1>
          {{ totalFrogs }} Single Frogs found
        </h1>
      </div>
    </section>
    <section class="row">
      <div v-for="froggy in frogs" :key="froggy.id" class="col-md-4 mb-3">
        <FrogCard :frog="froggy" />
      </div>
    </section>

    <section class="row">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <button @click="changePage(page - 1)" class="btn btn-success fs-4" :disabled="page < 2">
          Previous
        </button>
        <p class="fs-4 mb-0">Page {{ page }} of {{ totalPages }}</p>
        <button @click="changePage(page + 1)" class="btn btn-success fs-4" :disabled="page >= totalPages">
          Next
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { frogsService } from '../services/FrogsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import FrogCard from '../components/FrogCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    async function getFrogs(query) {
      try {
        await frogsService.getFrogs(query)
      } catch (error) {
        Pop.error(error)
      }
    }

    watch(() => route.query, () => {
      getFrogs(route.query)
    }, { immediate: true })


    return {
      frogs: computed(() => AppState.frogs),
      totalFrogs: computed(() => AppState.totalFrogs),
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),
      changePage(pageNumber) {
        logger.log('page', pageNumber)
        router.push({ query: { ...route.query, page: pageNumber } })
      }
    }
  },
  components: { FrogCard }
}
</script>

<style scoped lang="scss">
h1 {
  text-shadow: 1px 1px 3px whitesmoke;
}
</style>
