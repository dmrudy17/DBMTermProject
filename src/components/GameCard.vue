<template>
  <div class="min-h-screen min-w-screen flex flex-col">
    <div class="w-1/3 mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="w-full h-full shadow-lg rounded-lg">
        <div class="bg-black rounded shadow-md text-black w-full h-full overflow-auto">
          <div class="w-full h-full flex flex-col">
            <img class="object-contain rounded-t-lg" :src="gameImage">
            <h1 class="text-white text-3xl">{{ gameTitle }}</h1>
            <table class="table-auto text-white">
              <thead>
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
                  <td v-if="user">
                    <input class="bg-gray-500 caret-white" type="number" v-model="tagRating[index]" @keyup.enter="updateTagRating(tag, tagRating[index])">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      const gameImage = computed(() => store.state.gameInfo.image);
      const gameTitle = computed(() => store.state.gameInfo.title);
      const tagData = computed(() => store.state.gameInfo.tagData);
      const tagRating = ref([]);

      const updateTagRating = async (tag, tagRating) => {
        await updateRating_rpc(store.state.user.id, tag.name, gameTitle.value, tagRating);
      }

      return { user, gameImage, gameTitle, tagData, updateTagRating, tagRating };
    }
}
</script>
