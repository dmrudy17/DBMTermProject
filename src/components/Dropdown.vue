<template>
  <select id="ddList" @change="filter"></select>
</template>

<script>

import { supabase } from '../supabase'

export default {
  data() {
    return {
      genreList: []
    }
  },
  async mounted() {

    await this.getGenres();
    for (var genre of this.genreList) {

      var elem = document.createElement("option");
      elem.textContent = genre.name;
      elem.value = genre.name;
      document.getElementById("ddList").appendChild(elem);
    }
    
  },
  methods: {
    async getGenres() {
      this.genreList.push({ genre_id: 0, name: 'All' })

      try {
        const { data, error } = await supabase.from('Genres').select()

        if (error) throw error

        for (var genre of data) {
    
          this.genreList.push(genre)
        }
      } catch (e) {
          handleError(e);
      }
    },
    async filter() {

      let selected = document.getElementById("ddList").value
      console.log(selected)

      try {

        const { data, error } = await supabase.from('Genres').select('genre_id').eq('name', selected)

        if (error) throw error

        for (var id of data) {
    
          console.log(id);
        }
      } catch (e) {
          handleError(e);
      }
    }
  }
}

function handleError(e) {
    
    if (e.response) {
        console.log("Server Error: ", e);
    } else if (e.request) {
        console.log("Network Error: ", e);
    } else {
        console.log("Client Error: ", e);
    }
}

</script>

