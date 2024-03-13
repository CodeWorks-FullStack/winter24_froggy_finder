<template>

  <div class="offcanvas offcanvas-start" tabindex="-1" id="searchOffcanvas" aria-labelledby="searchOffcanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="searchOffcanvasLabel">Find Frogs</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <SearchForm />
    </div>
  </div>
</template>


<script>
import SearchForm from './SearchForm.vue';



export default {
  setup() {

    return {

    }
  },
  components: { SearchForm }
}
</script>


<style lang="scss" scoped></style>