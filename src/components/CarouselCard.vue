<template>
  <div class="container h-full border rounded-lg p-4 bg-black flex flex-col justify-between">
    <img class="h-48 w-96 rounded-md" :src="image">
    <div class="h-16 overflow-hidden">
      <h2 v-if="title.length < 50" class="text-2xl font-bold">{{ title }} </h2>
      <h2 v-if="title.length >= 50" class="text-lg font-bold">{{ title }} </h2>
    </div>
    <ul class="inline-grid grid-cols-4 gap-10 w-full">
      <ChevronDoubleUpIcon class="stroke-lime-400 h-8 w-8"></ChevronDoubleUpIcon>
      <div v-for="upTag in topTags" :key="upTag">
        <li>
          <button @click.prevent
            class="items-center relative right-8 bg-rose-800 box-content h-9 w-16 text-xs rounded-md whitespace-nowrap truncate">
            {{ upTag }}
          </button>
        </li>
      </div>
    </ul>
    <tr class="inline-grid grid-cols-4 gap-10">
      <ChevronDoubleDownIcon class="stroke-red-600 h-8 w-8"></ChevronDoubleDownIcon>
      <div v-for="downTag in bottomTags" :key="downTag">
        <td>
          <button @click.prevent
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
      <button @click="() => TogglePopup('buttonTrigger')" class="mt-4 px-4 py-2 rounded-md bg-indigo-500">View</button>
      <div v-if="user">
        <HandThumbUpIcon v-if="!isLiked" class="stroke-white h-8 w-8 cursor-pointer" @click="handleAddLike()" />
        <HandThumbUpIcon v-else class="stroke-white fill-orange-400 h-8 w-8 cursor-pointer" @click="handleAddLike()" />
      </div>
    </div>
    <Modal v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')"></Modal>
  </div>
</template>

<script>
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, HandThumbUpIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import Modal from '../views/Modal.vue';
import store from '../store/index';
import { computed } from 'vue';
export default {
  props: ['image', 'title', 'topTags', 'bottomTags', 'platformIcons'],
  data() {
    return {
      isLiked: false
    }
  },
  components: { 
    Modal,
    ChevronDoubleUpIcon,
    ChevronDoubleDownIcon,
    HandThumbUpIcon
  },
  setup() {
    const user = computed(() => store.state.user);
    const popupTriggers = ref({
      buttonTrigger: false,
    });
    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    return {
      user,
      popupTriggers,
      TogglePopup
    }
  },
  methods: {
    handleAddLike() {
      this.isLiked = !this.isLiked;
    }
  }
}
</script>
