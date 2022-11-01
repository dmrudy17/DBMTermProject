<template>
  <div class="min-h-screen min-w-screen flex flex-col">
    <div class="w-1/3 mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="w-full h-full shadow-lg rounded-lg">
        <div class="bg-black rounded shadow-md text-black w-full h-full overflow-auto">
          <div class="w-full h-full flex flex-col">
            <img class="object-contain rounded-t-lg" :src="gameImage">
            <h1 class="text-white text-3xl">{{ gameTitle }}</h1>
            <!-- these are trial and error pixels i found -->
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
                    <p class="font-bold">Success</p>
                  </div>
                </div>
              </div>
            </div>

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
                    <input ref="submitRating" class="bg-gray-500 caret-white" type="number" v-model="tagRating[index]"
                      @keyup.enter="updateTagRating(tag, tagRating[index]); showAlert()"
                      @click.stop="checkForSubmit = false">
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
import { useClickOutside } from '../useClickOutside'

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

    //use if we want to add a way to stop the sucess popup when clicked outside
    let checkForSubmit = false;
    const submitRating = ref(null);
    useClickOutside(submitRating, () => {
      //this will not work, but it does react to click press outside of input
      checkForSubmit = false;
    });
    //______________________

    const user = computed(() => store.state.user);
    const gameImage = computed(() => store.state.gameInfo.image);
    const gameTitle = computed(() => store.state.gameInfo.title);
    const tagData = computed(() => store.state.gameInfo.tagData);
    const tagRating = ref([]);

    const updateTagRating = async (tag, tagRating) => {
      await updateRating_rpc(store.state.user.id, tag.name, gameTitle.value, tagRating);
    }
    return { submitRating, user, gameImage, gameTitle, tagData, updateTagRating, tagRating };
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
