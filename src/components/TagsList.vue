<template>
  <div class="w-1/4 mx-auto flex-1 flex flex-col items-center">
    <!-- I want the tags list to stay on the same line -->

    <!-- Ugly looking html code to look at 
    idk how to space tags out properly yet
   -->
    <div class="grid grid-cols-6 gap-20">
      <!--iterate through the tag list-->
      <!-- move this down to a vue file for just a tag-->

      <!-- this box should be more red and transparent -->
      <button
        class="box-decoration-slice hover:bg-rose-700 bg-rose-800 box-content h-10 w-20 text-xs rounded-full p-10 py-2"
      >
        <!-- use to display selected <item-here> -->
        tag 1
      </button>
      <!-- repeat -->
      <button
        class="box-decoration-slice hover:bg-rose-700 bg-rose-800 box-content h-10 w-20 text-xs rounded-full p-10 py-2"
      >
        tag 2
      </button>
      <button
        class="box-decoration-slice hover:bg-rose-700 bg-rose-800 box-content h-10 w-20 text-xs rounded-full p-10 py-2"
      >
        tag 3
      </button>
      <button
        class="box-decoration-slice hover:bg-rose-700 bg-rose-800 box-content h-10 w-20 text-xs rounded-full p-10 py-2"
      >
        tag 3
      </button>
      <button
        class="box-decoration-slice hover:bg-rose-700 bg-rose-800 box-content h-10 w-20 text-xs rounded-full p-10 py-2"
      >
        tag 3
      </button>
      <button
        class="box-decoration-slice hover:bg-rose-700 bg-rose-800 box-content h-10 w-20 text-xs rounded-full p-10 py-2"
      >
        tag 3
      </button>
      <button
        class="box-decoration-slice hover:bg-rose-700 bg-rose-800 box-content h-10 w-20 text-xs rounded-full p-10 py-2"
      >
        tag 3
      </button>
      <!-- made to show horizontal UX-->
    </div>

    <!-- need this add button to be inline with tags list -->
    <button
      class="bg-indigo-600 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>

      <span></span>
    </button>
    <br />
  </div>
  <!-- creates a trippy item box at the end -->
  <!-- <div class="w-1/4 mx-auto flex-1 flex flex-col grid justify-items-end px-2">
      <div class="relative w-full h-full">
        <div
          class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 blur"
        ></div>
        <div
          class="relative bg-black px-6 py-8 rounded shadow-md text-black w-full"
        >
          <h1 class="mb-8 text-3xl text-center text-white">e</h1>
        </div>
      </div>
    </div> -->
</template>

<!-- //use this later -->
<script>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";

export default {
  data() {
    return {};
  },
};
</script>