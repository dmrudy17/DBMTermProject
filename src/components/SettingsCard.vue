<template>
  <div class="min-h-screen min-w-screen flex flex-col">
    <div class="w-1/4 mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="relative w-full h-full">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 blur"></div>
        <div class="relative bg-black px-6 py-8 rounded shadow-md text-black w-full">
          <h1>Settings</h1>
        </div>
      </div>

      <div class="text-white mt-6">
        Don't have an account? 
        <router-link to="/signup" class="border-b border-indigo-500 text-indigo-500">
          Sign up
        </router-link>
      </div>
      <h1 class="text-pink-500" v-if="errorMessage">{{ errorMessage }}</h1>
    </div>
  </div>
</template>

<script>
import store from '../store/index';
import { computed } from 'vue';

export default {
  data() {
    return {
      userName: ''
    }
  },
  setup() {
    const userName = computed(() => store.state.user.user_metadata.user_name);

    return { userName };
  }
}
</script>
