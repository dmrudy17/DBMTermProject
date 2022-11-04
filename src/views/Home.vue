<template>
  <div class="w-screen h-screen bg-gradient-to-br from-black via-black to-indigo-500">
    <div class="w-full h-full">
      <div class="flex flex-col absolute left-0 right-0 top-0 bottom-0 mt-20">
        <h1 class="text-4xl text-white ml-5">Browse Hit Titles</h1>
        <!-- <DemoButtons></DemoButtons>
        <Dropdown></Dropdown> -->
        <Carousel />
      </div>
    </div>
  </div>
</template>

<script>
import DemoButtons from '../components/DemoButtons.vue'
import Dropdown from '../components/Dropdown.vue';
import Carousel from '../components/Carousel.vue';

export default {
  components: {
    DemoButtons,
    Dropdown,
    Carousel
  }
}
</script>
