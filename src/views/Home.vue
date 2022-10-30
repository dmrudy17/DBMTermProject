<template>
  <div class="w-screen h-screen bg-gradient-to-br from-black via-black to-indigo-500">
    <div class="absolute m-0 top-52 left-0 right-0 space-x-4">
      <DemoButtons></DemoButtons>
    </div>
  </div>
</template>

<script>
import DemoButtons from '../components/DemoButtons.vue'

export default {
  components: {
    DemoButtons,
  },
}
</script>
