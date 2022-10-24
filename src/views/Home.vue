<template>
  <div class="w-screen h-screen bg-gradient-to-br from-black via-black to-indigo-500">
    <UpsertAll></UpsertAll>
    <Dropdown></Dropdown>
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
