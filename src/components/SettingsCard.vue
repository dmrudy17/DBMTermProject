<template>
  <div class="min-h-screen min-w-screen flex flex-col">
    <div v-if="!toggleDelete" class="min-w-1/3 w-1/3 h-1/3 m-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="relative w-full h-full">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 blur"></div>
        <div class="relative bg-black px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="text-white text-center text-xl">Settings</h1>
          <div class="flex flex-col">
            <div class="flex flex-col">
              <h1 class="text-white">Username: {{ userName }}</h1>
              <h1 class="text-white">Email: {{ email }}</h1>
            </div>
            <button @click="toggleDelete = !toggleDelete" class="py-3 px-1 w-1/4 m-auto rounded bg-indigo-500 text-white hover:bg-indigo-400 focus:outline-none my-1">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-1/3 mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="relative w-full h-full">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 blur"></div>
        <div class="relative bg-black px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="text-white text-center text-xl">But the game was just getting good, {{ userName }}!</h1>
          <div class="flex items-center flex-col w-full mt-2">
            <img class="rounded-lg w-96" src="../assets/pikachusad.jpg">
            <span class="text-white mt-2 text-lg">Are you sure you would like to delete your account?</span>
            <div class="w-1/2 flex flex-row space-x-2 justify-between">
              <button @click="toggleDelete = !toggleDelete" class="w-1/2 text-center py-3 px-2 rounded bg-pink-500 text-white hover:bg-pink-400 focus:outline-none my-1">Cancel</button>
              <button @click="handleDeleteUser" class="w-1/2 text-center py-3 px-2 rounded bg-indigo-500 text-white hover:bg-indigo-400 focus:outline-none my-1">Continue</button>
            </div>
          </div>
        </div>
      </div>
      <span v-if="errorMessage" class="text-white">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script>
import store from '../store/index';
import { computed, ref } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      userName: '',
      email: '',
      toggleDelete: false,
      errorMessage: ''
    }
  },
  setup() {
    const router = useRouter();
    const userName = computed(() => store.state.user ? store.state.user.user_metadata.user_name : ref(null));
    const email = computed(() => store.state.user ? store.state.user.email : ref(null));
    const userId = computed(() => store.state.user ? store.state.user.id : ref(null));
    const errorMessage = ref(null);

    const handleDeleteUser = async () => {
      try {
        const { error } = await supabase.rpc('delete_user_account', { userid: userId.value });
        if (error) throw error;
        store.methods.setUser(null);
        router.push('/');
      } catch (error) {
        errorMessage.value = `Error: ${ error.message }`;
        setTimeout(() => {
          errorMessage.value = '';
        }, 5000);
      }
    }

    return { userName, email, userId, errorMessage, handleDeleteUser };
  }
}
</script>
