<template>
  <div v-if="appReady">
    <Navigation />
    <router-view></router-view>
    <!-- use router-link elements as opposed to <a> tags for routing between pages -->
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from './supabase';
import store from './store/index';
import Navigation from './components/Navigation.vue';

export default {
  setup() {
    const appReady = ref(null);

    // check if user is already signed in
    const user = supabase.auth.user();

    // If user does not exist, make app ready
    if (!user) {
      appReady.value = true;
    }

    // Fires when auth state changes
    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session);
      appReady.value = true;
    })

    return { appReady };
  },
  components: {
    Navigation
  }
}
</script>
