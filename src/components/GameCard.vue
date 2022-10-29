<template>
  <div class="flex w-screen h-screen m-auto content-center justify-center">
    <div class="relative w-3/4 h-full">
      <div class="flex flex-row h-1/2">
        <div class="w-1/2 h-full" :style="{ background: 'url(' + gameImage + ')', 'background-size': '100%'}">
          <span class="text-white text-3xl p-1 bg-black w-auto">{{ gameTitle }}</span>
        </div>
        <div class="w-1/2 bg-black scrollbar scrollbar-thumb-indigo-300">
          <table class="table-auto text-white w-full">
            <thead class="sticky top-0 z-2 bg-black">
              <tr>
                <th>Tag</th>
                <th>Average User Score</th>
                <th v-if="user">Your Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tag, index) in tagData" :key="index">
                <td class="text-center">{{ tag.name }}</td>
                <td v-if="tag.avg_score" class="text-center">{{ tag.avg_score }}</td>
                <td v-else class="text-center">Not rated</td>
                <td v-if="user" class="text-center text-black">
                  <input class="bg-white caret-white" type="number" v-model="tagRating[index]" @keyup.enter="updateTagRating(tag, tagRating[index])">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index';
import { computed, ref } from 'vue';
import { updateRating_rpc } from '../rpc'

export default {
  data() {
      return {
        gameImage: '',
        gameTitle: '',
        tagData: '',
        tagRating: [],
      }
    },
    setup() {
      const user = computed(() => store.state.user);
      const gameTitle = computed(() => store.state.gameInfo.title);
      const gameImage = computed(() => store.state.gameInfo.image);
      const tagData = computed(() => store.state.gameInfo.tagData);
      const tagRating = ref([]);

      const updateTagRating = async (tag, tagRating) => {
        await updateRating_rpc(store.state.user.id, tag.name, gameTitle.value, tagRating);
      }

      return { user, gameImage, gameTitle, tagData, updateTagRating, tagRating };
    }
}
</script>
