<!--
Bare with my trial and error code 
there are better suited tailwind css classes for the html
extremely likely subject to change 
-->
<template>
  <div class="flex flex-col">
    <div class="w-1/4 mx-auto flex-1 flex flex-col items-center px-2">
      <br />
      <div class="grid grid-flow-col auto-cols-max gap-4">
        <!-- <levels of rated for you> can indicate the confidence level if thats what the confindence level was iirc  -->
        <span
          class="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 py-2 rounded"
        >
          rated for you
        </span>
        <span
          class="box-decoration-slice bg-gray-400 text-white px-5 py-2 rounded"
        >
          release_date
        </span>
      </div>
      <!-- title -->
      <div
        class="text-white text-4xl whitespace-nowrap mb-8 flex-wrap"
      >
        <!-- FIX: I want to wrap this so for no matter the lneght of the title it will kept center -->
        <div>Hollow Knight</div>
      </div>

      <div class="relative w-full h-full">
        <div
          class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 blur"
        ></div>

        <!--for this purpose this is the <preview> but I am taking the <background_image> however
        also idk but maybe I should put the <preview> to the right side of the page  
        -->
        <img
          class="relative"
          src="https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg"
        />
      </div>
    </div>

    <!-- creates a trippy item box at the end of the card -->
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
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      release_date: "",
      errorMessage: "",
    };
  },
};
</script>