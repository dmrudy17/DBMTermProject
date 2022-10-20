<template>
<div class="w-screen h-screen bg-black">
  <div class="min-h-screen min-w-screen flex flex-col">
    <div class="w-1/4 mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <h1 class="text-white text-4xl whitespace-nowrap mb-8">Welcome to DDK Review</h1>
      <div class="relative w-full">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 blur"></div>
        <div class="relative bg-black px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center text-white">Sign up</h1>
          <input 
              type="text"
              class="block text-white border border-grey-light bg-black w-full p-3 rounded mb-4 caret-indigo-500"
              name="Username"
              placeholder="Username" />
          <input 
              type="text"
              class="block text-white border border-grey-light bg-black w-full p-3 rounded mb-4 caret-indigo-500"
              name="email"
              placeholder="Email" />
          <input 
              type="password"
              class="block text-white border border-grey-light bg-black w-full p-3 rounded mb-4 caret-indigo-500"
              name="password"
              placeholder="Password" />
          <input 
              type="password"
              class="block text-white border border-grey-light bg-black w-full p-3 rounded mb-4 caret-indigo-500"
              name="confirm_password"
              placeholder="Confirm Password" />
          <button
              type="submit"
              class="w-full text-center py-3 rounded bg-indigo-500 text-white hover:bg-green-400 focus:outline-none my-1"
          >Create Account</button>
        </div>
      </div>

      <div class="text-white mt-6">
        Already have an account? 
        <router-link to="/login" class="border-b border-indigo-500 text-indigo-500">
          Log in
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {

}
</script>
