<template>
  <div class="page-of-game w-screen h-screen bg-black">
    <!-- <div class="login w-screen h-screen"> -->
    <GamePageCard></GamePageCard>

    <!-- just no, I need to add tailwind css to show databased items of platform and genres from a game-->
    <div class="text-white text-right text-2xl whitespace-nowrap flex-wrap">
      platforms
    </div>
    <div class="text-white text-right text-2xl whitespace-nowrap">genres</div>
    <TagsList></TagsList>
  </div>
</template>

<script>
import GamePageCard from "../components/GamePageCard.vue";
import TagsList from "../components/TagsList.vue";
export default {
  components: {
    GamePageCard,
    TagsList,
  },
};
</script>
