<template>
  <div>
    <div v-if="gameImage" class="absolute min-w-full w-full min-h-4/5 h-4/5 m-auto top-0 bottom-0 left-0 right-0">
      <div class="h-full w-full flex-1 flex flex-col shadow-lg">
        <div class="flex flex-row min-w-full min-h-full overflow-auto">
          <div class="w-1/2" :style="{ background: 'url(' + gameImage + ')', 'background-size': 'cover'}">
            <span class="text-white text-3xl p-1 bg-black w-auto text-left">{{ gameTitle }}</span>
          </div>
          <div class="w-1/2 bg-black scrollbar scrollbar-thumb-indigo-300">
            <table class="table-auto text-white w-full">
              <thead class="sticky top-0 z-2 bg-black">
                <tr class="text-center">
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
                    <input class="bg-white caret-white" type="number" v-model="tagRating[index]"
                    @keyup.enter="updateTagRating(gameTitle); showAlert(tagRating[index])">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-10 right-20 " v-if="checkForSubmit && this.submissionIsValid">
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
    <div class="absolute bottom-10 right-20 " v-else-if="checkForSubmit && !this.submissionIsValid">
      <div class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
        role="alert">
        <div class="flex">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg></div>
          <div>
            <p class="font-bold">Invalid rating. Enter a rating from 1-10</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index';
import { computed, ref } from 'vue';
import { updateRating_rpc } from '../rpc';

export default {
  data() {
    return {
      gameImage: '',
      gameTitle: '',
      tagData: '',
      tagRating: [],
      checkForSubmit: false,
      submissionIsValid: false
    }
  },
  setup() {
    const user = computed(() => store.state.user);
    const gameTitle = computed(() => store.state.gameInfo.title);
    const gameImage = computed(() => store.state.gameInfo.image);
    const tagData = computed(() => store.state.gameInfo.tagData);
    const tagRating = ref([]);

    return { user, gameImage, gameTitle, tagData, tagRating };
  },
  methods: {
    showAlert(rating) {

      this.submissionIsValid = false

      if (rating > 0 && rating <= 10 && Number.isInteger(rating))
        this.submissionIsValid = true;

      this.checkForSubmit = true;
      setTimeout(() => {
        this.checkForSubmit = false;
      }, 5000);
    },
    async updateTagRating(title) {
      var newAvgScore;
      for (var index in this.tagData) {
        if (this.tagRating[index] && this.tagRating[index] !== null) {
          // console.log(this.tagData[index]);
          // console.log(this.tagRating[index]);
          console.log(title);
          newAvgScore = await updateRating_rpc(store.state.user.id, this.tagData[index].name, title, this.tagRating[index]);
          if (newAvgScore !== null) {
            store.state.gameInfo.tagData[index].avg_score = newAvgScore;
            this.tagRating[index] = "";
          }
        }
      }
    }
  }
}
</script>
