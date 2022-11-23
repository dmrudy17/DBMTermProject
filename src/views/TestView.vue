<!-- 
    TestView.vue 
    Not intended to be part of the app, Dan made this file for testing / practicing.
-->

<template>
    <div class="w-screen h-screen bg-gradient-to-br from-black via-black to-indigo-500">
        <div class="bg-cyan-400 relative w-5/6 h-3/4 top-12 mx-auto rounded-xl 
        border-4 border-double border-white-800" style="">
            <GameFilters></GameFilters>
        </div>
    </div>
</template>

<script>
import GameFilters from '../components/GameFilters.vue'

export default {
  components: {
    GameFilters,
  },
}
</script>