<template>
  <div class="mt-8 flex flex-col w-56 m-auto space-y-4">
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
  },
}
</script>
