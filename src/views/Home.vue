<template>
  <div class="w-screen h-screen bg-gradient-to-br from-black via-black to-indigo-500">
    <div class="absolute m-0 top-52 left-0 right-0 space-x-4">
      <UpsertAll></UpsertAll>
      <Dropdown></Dropdown>
    </div>
  </div>
</template>

<script>
import UpsertAll from '../components/UpsertAll.vue'
import Dropdown from '../components/Dropdown.vue';

export default {
  components: {
    UpsertAll,
    Dropdown
  }
}
</script>
