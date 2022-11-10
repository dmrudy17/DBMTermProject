<template>
  <div class="w-screen h-screen bg-gradient-to-br from-black via-black to-indigo-500">
    <div class="absolute m-auto top-16 left-0 right-0">
      <h1 class="text-3xl text-white">Browse Hit Titles</h1>
      <GameFilters />
      <Carousel />
    </div>

  </div>
</template>

<script>
import GameFilters from '../components/GameFilters.vue'
import Carousel from '../components/Carousel.vue'

export default {
  components: {
    GameFilters,
    Carousel
  }
}
</script>
