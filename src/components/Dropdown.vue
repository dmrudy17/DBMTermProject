<template>
  <select :id="ddID" @change="sendSelection"></select>
</template>

<script>

export default {
  props: ['ddID'],
  methods: {

    // setList() is called from parent
    setList(listFromParent) {
      console.log("setting list: ", listFromParent);
      for (var item of listFromParent) {

        var elem = document.createElement("option");
        elem.textContent = item.name;
        elem.value = item.name;
        document.getElementById(this.ddID).appendChild(elem);
      }
    },
    async sendSelection() {

      let item = document.getElementById(this.ddID).value;
      this.$emit('itemSelected', item);
    }
  }
}

</script>

