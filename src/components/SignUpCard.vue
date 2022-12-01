<template>
  <div class="min-h-screen min-w-screen flex flex-col">
    <div class="w-1/4 mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <h1 class="text-white text-4xl whitespace-nowrap mb-8">Welcome to DDK Review</h1>
      <div class="relative w-full h-full">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 blur"></div>
        <div class="relative bg-black px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center text-white">Sign up</h1>
          <form @submit.prevent="register">
            <input 
                type="text"
                class="block text-white border border-grey-light bg-black w-full p-3 rounded mb-4 caret-indigo-500"
                name="username"
                placeholder="Username"
                v-model="username"
                required />
            <input 
                type="text"
                class="block text-white border border-grey-light bg-black w-full p-3 rounded mb-4 caret-indigo-500"
                name="email"
                placeholder="Email"
                v-model="email"
                required />
            <input 
                type="password"
                class="block text-white border border-grey-light bg-black w-full p-3 rounded mb-4 caret-indigo-500"
                name="password"
                placeholder="Password"
                v-model="password"
                required />
            <input 
                type="password"
                class="block text-white border border-grey-light bg-black w-full p-3 rounded mb-4 caret-indigo-500"
                name="confirm_password"
                placeholder="Confirm Password"
                v-model="confirmPassword"
                required />
            <button
                type="submit"
                class="w-full text-center py-3 rounded bg-indigo-500 text-white hover:bg-indigo-400 focus:outline-none my-1"
            >Create Account</button>
          </form>
        </div>
      </div>

      <div class="text-white mt-6">
        Already have an account? 
        <router-link to="/login" class="border-b border-indigo-500 text-indigo-500">
          Log in
        </router-link>
      </div>
      <h1 class="text-pink-500 whitespace-nowrap" v-if="errorMessage">{{ errorMessage }}</h1>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    }
  },
  setup() {
    const router = useRouter();
    const username = ref(null);
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const errorMessage = ref(null);

    const register = async () => {
      if (password.value === confirmPassword.value) {
        try {
          const { error } = await supabase.auth.signUp(
            {
              email: email.value,
              password: password.value,
            },
            {
              data: {
                user_name: username.value
              }
            }
          );
          if (error) throw error;
          router.push('/');
        } catch(error) {
          errorMessage.value = error.message;
          setTimeout(() => {
            errorMessage.value = '';
          }, 5000);
        }
        return;
      }
      errorMessage.value = "Error: Passwords do not match";
      setTimeout(() => {
        errorMessage.value = '';
      }, 5000);
    };

    return { username, email, password, confirmPassword, errorMessage, register }
  }
}
</script>
