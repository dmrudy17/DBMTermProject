<template>
  <div class="absolute inset-x-0 top-0 bg-transparent w-full">
    <div class="flex justify-between flex-row">
      <div class="flex flex-row">
        <CubeTransparentIcon class="stroke-white h-10 w-10" />
        <h1 class="text-white mt-1 text-2xl">DDK Review</h1>
      </div>
      <div class="flex space-x-4 flex-row mr-2">
        <router-link to="/" class="text-gray-300 p-2 border-b border-gray-300 hover:text-white hover:border-white text-lg">Home</router-link>
        <router-link v-if="!user" to="/login" class="text-gray-300 p-2 border-b border-gray-300 hover:text-white hover:border-white text-lg">Log In</router-link>
        <router-link v-if="!user" to="/signup" class="text-gray-300 p-2 border-b border-gray-300 hover:text-white hover:border-white text-lg">Sign Up</router-link>
        <button v-if="user" class="text-gray-300 border-b border-gray-300 hover:text-white hover:border-white text-lg" @click="logout()">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import { CubeTransparentIcon } from "@heroicons/vue/24/outline";
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import store from '../store/index';
import { computed } from 'vue';

export default {
  setup() {
    const user = computed(() => store.state.user);
    const router = useRouter();

    const logout = async () => {
      await supabase.auth.signOut();
      router.push('/');
    }

    return { user, logout };
  },
  components: {
    CubeTransparentIcon
  }
}
</script>
