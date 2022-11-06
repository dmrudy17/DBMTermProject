<template>
  <div class="container h-full border rounded-lg p-4">
    <img class="h-50 w-full object-cover rounded-md" src="../assets/pikachusad.jpg">

    <h2 class="mt-2 text-2xl font-bold"> Lorem ipsum dolor sit amet</h2>
    <p class="mt-2">
      <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. -->

    <ul class="inline-grid grid-cols-4 gap-10 scale-90">
      <!-- <img class="w-10 relative right-10 rounded-md" src="../assets/upvote.png"> -->
      <ArrowLongUpIcon class="scale-150 hover:bg-blue-600"></ArrowLongUpIcon>
      <div v-for=" n in items">
        <li>
          <button @click.prevent
            class=" items-center relative right-8 bg-rose-800 box-content h-9 w-20 text-xs rounded-full">
            Loremips dolor sit amet
          </button>
        </li>
      </div>
    </ul>
    <tr class="inline-grid grid-cols-4 gap-10 scale-90">
      <ArrowLongDownIcon class="scale-150 hover:bg-gray-600"></ArrowLongDownIcon>
      <div v-for=" n in items">
        <td>
          <button @click.prevent
            class="items-center relative right-8  bg-gray-600 box-content h-9 w-20 text-xs rounded-full">

            Nah
          </button>
        </td>
      </div>
    </tr>

    </p>

    <button @click="() => TogglePopup('buttonTrigger')" class="mt-4 px-6 py-3 rounded-md bg-indigo-500" v>Read
      More</button>
    <Modal v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')"></Modal>
    <!-- < v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')">></Popup> -->
  </div>
</template>

<script>
import { ArrowLongDownIcon, ArrowLongUpIcon, ArrowUpIcon, ArrowUpLeftIcon, CheckBadgeIcon } from '@heroicons/vue/24/outline';
import { ArrowDownIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import Modal from '../views/Modal.vue';
export default {
  data() {
    return {
      items: [0, 1, 2],
      index: 0
    }
  },

  components: { Modal, ArrowLongUpIcon, ArrowLongDownIcon }
  , setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
    });
    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    return {
      popupTriggers,
      TogglePopup
    }
  }
}
</script>
