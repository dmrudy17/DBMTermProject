<template>
  <div class="border rounded-lg p-4">
    <img class="h-50 w-full object-cover rounded-md" src="../assets/pikachusad.jpg">
    <h2 class="mt-2 text-2xl font-bold"> Lorem ipsum dolor sit amet{{ n }}</h2>
    <p class="mt-2">
      <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. -->
      <tbody>
        <tr class="flex flex-auto object-fill w-96 scale-80">
          <img class="w-10 object-cover rounded-md" src="../assets/upvote.png">
          <td>
            <button @click.prevent
              class="box-decoration-slice  flex flex-col items-center  bg-rose-800 box-content h-.1 w-1 text-xs rounded-full p-10 py-2 px-10">

              YES
            </button>
          </td>
          <td>
            <button @click.prevent
              class="box-decoration-slice  flex flex-col items-center  bg-rose-800 box-content h-.1 w-1 text-xs rounded-full p-10 py-2 px-10 ">

              YES
            </button>
          </td>
          <td>
            <button @click.prevent
              class="box-decoration-slice  flex flex-col items-center  bg-rose-800 box-content h-.1 w-1 text-xs rounded-full p-10 py-2 px-10">

              YES
            </button>
          </td>
        </tr>
        <tr class="flex flex-auto object-fill w-96 scale-80">
          <img class="w-10 object-cover rounded-md"
            src="https://external-preview.redd.it/rVJTRAhNgNcX8PgrL-tZHELAKPRbItavpcNrI4NHE5I.png?width=640&crop=smart&auto=webp&s=6334a497443ff8a3661c9c0ccaedb5bd0295dffe">
          <td>
            <button @click.prevent
              class="box-decoration-slice  flex flex-col items-center  bg-gray-600 box-content h-.1 w-1 text-xs rounded-full p-10 py-2 px-10">

              Nah
            </button>
          </td>
          <td>
            <button @click.prevent
              class="box-decoration-slice  flex flex-col items-center  bg-gray-600 box-content h-.1 w-1 text-xs rounded-full p-10 py-2 px-10">

              Eh
            </button>
          </td>
        </tr>
      </tbody>
    </p>
    <button class="mt-4 px-6 py-3 rounded-md bg-indigo-500">Read More</button>
  </div>
</template>

<script>
import { ArrowUpIcon, ArrowUpLeftIcon, CheckBadgeIcon } from '@heroicons/vue/24/outline';
import { ArrowDownIcon } from '@heroicons/vue/24/outline';
export default {
  components: {

  }
}
</script>
