<template>
  <div class="absolute inset-x-0 top-0 bg-transparent w-full">
    <div class="flex justify-between flex-row">
      <router-link to="/">
        <div class="flex flex-row">
          <RocketLaunchIcon class="fill-white h-10 w-10" />
          <h1 class="text-white mt-1 text-2xl">DDK Review</h1>
          <button @click="callUpsertAll()" class="mx-5 px-4 py-2 bg-stone-300 rounded-lg">Get Game Data</button>
        </div>
      </router-link>
      <div class="flex space-x-4 flex-row mr-2">
        <router-link v-if="!user" to="/login" class="text-gray-300 p-2 hover:text-white text-lg">Log In</router-link>
        <router-link v-if="!user" to="/signup" class="text-gray-300 p-2 hover:text-white text-lg">Sign Up</router-link>
        <router-link v-if="user" to="/settings">
          <UserIcon class="h-8 w-8 stroke-gray-300 hover:stroke-white mt-1" />
        </router-link>
        <ArrowRightOnRectangleIcon v-if="user" class="stroke-gray-300 hover:stroke-white h-8 w-8 hover:cursor-pointer mt-1" @click="logout()" />
        <!-- <button v-if="user" class="text-gray-300 hover:text-white text-lg h-10 w-8" @click="logout()">Log Out</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { RocketLaunchIcon, ArrowRightOnRectangleIcon, UserIcon } from "@heroicons/vue/24/outline";
import { upsertAll } from '../upsertTables';
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
    RocketLaunchIcon,
    ArrowRightOnRectangleIcon,
    UserIcon
  },
  methods: {
    async callUpsertAll() {
      
      await upsertAll();
    }
  }
}
</script>
