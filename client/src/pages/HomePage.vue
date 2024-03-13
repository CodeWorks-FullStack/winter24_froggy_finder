<template>
  <div class="container">
    <section class="row">
      <div class="col-12 my-3">
        <h1>
          {{ totalFrogs }} Single Frog<span v-if="totalFrogs != 1">s</span> found
        </h1>
      </div>
    </section>
    <section class="row">
      <div v-for="froggy in frogs" :key="froggy.id" class="col-md-4 mb-3">
        <FrogCard :frog="froggy" />
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between">
          <button @click="changePage(page - 1)" :disabled="page < 2" class="btn btn-success fs-4">
            Previous
          </button>
          <button @click="changePage(page + 1)" :disabled="page == totalPages" class="btn btn-success fs-4">
            Next
          </button>
        </div>
      </div>
    </section>
  </div>

  <OffcanvasComponent />
</template>

<script>
import { computed, watch } from 'vue';
import { frogsService } from '../services/FrogsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import FrogCard from '../components/FrogCard.vue';
import { useRoute, useRouter } from 'vue-router';
import OffcanvasComponent from '../components/OffcanvasComponent.vue';

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    async function getFrogs(query) {
      try {
        await frogsService.getFrogs(query)
      } catch (error) {
        Pop.error(error)
      }
    }

    // onMounted(getFrogs)

    watch(() => route.query, (query) => { getFrogs(query) }, { immediate: true })

    return {
      frogs: computed(() => AppState.frogs),
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),
      totalFrogs: computed(() => AppState.totalFrogs),

      changePage(pageNumber) {
        router.push({ query: { ...route.query, page: pageNumber } })
      }
    }
  },
  components: { FrogCard, OffcanvasComponent }
}
</script>

<style scoped lang="scss">
h1 {
  text-shadow: 1px 1px 3px whitesmoke;
}
</style>
