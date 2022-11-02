<template>
  <div class="absolute min-w-11/12 w-11/12 min-h-3/5 h-3/5 m-auto top-0 bottom-0 left-0 right-0">
    <div class="h-full w-full flex-1 flex flex-col shadow-lg">
      <div class="flex flex-row min-w-full min-h-full overflow-auto">
        <div class="w-1/2" :style="{ background: 'url(' + gameImage + ')', 'background-size': 'cover'}">
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
                  <input class="bg-white caret-white" type="number" v-model="tagRating[index]" @keyup.enter="updateTagRating(tag, tagRating[index], index); showAlert()">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="absolute bottom-10 right-20 " v-if="checkForSubmit">
      <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert">
        <div class="flex">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg></div>
          <div>
            <p class="font-bold">Rating Successfully Added!</p>
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
      checkForSubmit: false
    }
  },
  setup() {
    const user = computed(() => store.state.user);
    const gameTitle = computed(() => store.state.gameInfo.title);
    const gameImage = computed(() => store.state.gameInfo.image);
    const tagData = computed(() => store.state.gameInfo.tagData);
    const tagRating = ref([]);

    const updateTagRating = async (tag, rating, index) => {
      var newAvgScore = await updateRating_rpc(store.state.user.id, tag.name, gameTitle.value, rating);
      store.state.gameInfo.tagData[index].avg_score = newAvgScore;
    }
    return { user, gameImage, gameTitle, tagData, updateTagRating, tagRating };
  },
  methods: {
    showAlert() {
      this.checkForSubmit = true;
      setTimeout(() => {
        this.checkForSubmit = false;
      }, 5000);
    }
  }
}
</script>
