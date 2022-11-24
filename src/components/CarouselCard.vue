<template>
  <div class="container h-full border rounded-lg hover:border-indigo-500 p-4 bg-black
        flex flex-col justify-between">
    <img class="h-48 w-96 rounded-md" :src="image">
    <div class="h-16 overflow-hidden">
      <h2 v-if="title.length < 40" class="text-2xl font-bold">{{ title }} </h2>
      <h2 v-if="title.length >= 40" class="text-lg font-bold">{{ title }} </h2>
    </div>
    <ul class="inline-grid grid-cols-4 gap-10 w-full">
      <ChevronDoubleUpIcon class="stroke-lime-400 h-8 w-8"></ChevronDoubleUpIcon>
      <div v-for="(upTag, index) in topTags" :key="index">
        <li>
          <button @click.prevent
            :title="topTags[index]"
            class="items-center relative right-8 bg-rose-800 box-content h-9 w-16 text-xs rounded-md whitespace-nowrap truncate">
            {{ upTag }}
          </button>
        </li>
      </div>
    </ul>
    <tr class="inline-grid grid-cols-4 gap-10">
      <ChevronDoubleDownIcon class="stroke-red-600 h-8 w-8"></ChevronDoubleDownIcon>
      <div v-for="(downTag, index) in bottomTags" :key="index">
        <td>
          <button @click.prevent
            :title="bottomTags[index]"
            class="items-center relative right-8  bg-gray-600 box-content h-9 w-16 text-xs rounded-md whitespace-nowrap truncate">
            {{ downTag }}
          </button>
        </td>
      </div>
    </tr>
    <div class="w-full flex flex-row">
      <div v-for="platformIcon in platformIcons" :key="platformIcon">
        <img :src="platformIcon" class="h-6 w-6 m-1">
      </div>
    </div>
    <div class="flex flex-row w-full justify-between items-end">
      <button @click="openGameModule('buttonTrigger')" class="mt-4 px-4 py-2 rounded-md bg-indigo-500">View</button>
      <div v-if="user">
        <StarIcon v-if="!isLiked" class="stroke-white h-8 w-8 cursor-pointer" @click="handleAddLike()" />
        <StarIcon v-else class="stroke-white fill-yellow-400 h-8 w-8 cursor-pointer" @click="handleAddLike()" />
      </div>
    </div>
    <Modal v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')"></Modal>
  </div>
</template>

<script>
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, StarIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import Modal from '../views/Modal.vue';
import store from '../store/index';
import { computed } from 'vue';
import { fetchGameInfo_rpc } from '../rpc';
import { supabase } from '../supabase';

export default {
  props: ['image', 'title', 'topTags', 'bottomTags', 'platformIcons', 'gameId'],
  data() {
    return {
      isLiked: false
    }
  },
  components: { 
    Modal,
    ChevronDoubleUpIcon,
    ChevronDoubleDownIcon,
    StarIcon
  },
  setup() {
    const user = computed(() => store.state.user);
    const popupTriggers = ref({
      buttonTrigger: false,
    });
    const TogglePopup = (trigger) => {
      // Reset gameInfo when modal is closed
      if (popupTriggers.value[trigger] === true) {
        store.methods.handleCloseModal();
      }
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    return {
      user,
      popupTriggers,
      TogglePopup
    }
  },
  methods: {
    async handleAddLike() {
      this.isLiked = !this.isLiked;
      
      const { data, error } = await supabase.from('Likes').insert([
          { user_id: store.state.user.id, game_id: this.gameId },
        ])
    },
    method1(buttonTrigger) {
      this.TogglePopup(buttonTrigger);
      console.log(this.title)
    },
    async openGameModule(buttonTrigger) {
      this.TogglePopup(buttonTrigger);
      var response = await fetchGameInfo_rpc(this.title);
      var gameInfo = {};
      gameInfo.image = response.game_image;
      gameInfo.title = this.title;
      gameInfo.tagData = response.tags;
      console.log(gameInfo);
      store.methods.setGameInfo(gameInfo);
    }
  }
}
</script>
