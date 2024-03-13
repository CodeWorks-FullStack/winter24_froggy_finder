<template>
  <div class="container">
    <section class="row">
      <div class="col-12 my-3">
        <h1>
          {{ frogs.length }} Single Frogs found
        </h1>
      </div>
    </section>
    <section class="row">
      <div v-for="froggy in frogs" :key="froggy.id" class="col-md-4 mb-3">
        <FrogCard :frog="froggy" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { frogsService } from '../services/FrogsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import FrogCard from '../components/FrogCard.vue';

export default {
  setup() {

    async function getFrogs() {
      try {
        await frogsService.getFrogs()
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(getFrogs)



    return {
      frogs: computed(() => AppState.frogs)
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
