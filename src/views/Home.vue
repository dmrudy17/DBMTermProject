<template>
  <div class="w-screen h-screen bg-gradient-to-br from-black via-black to-indigo-500">
    <GameBrowser/>
  </div>
</template>

<script>
import GameBrowser from '../components/GameBrowser.vue'

export default {
  components: {
    GameBrowser,
  }
}
</script>
