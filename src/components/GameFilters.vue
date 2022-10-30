<template>
    <p>Genre: </p>
    <Dropdown ddID=1 ref="genreDD" @itemSelected="setGenreSelected"></Dropdown>
    <p>Platform: </p>
    <Dropdown ddID=2 ref="platformDD" @itemSelected="setPlatformSelected"></Dropdown>
</template>

<script>

import Dropdown from '../components/Dropdown.vue';
import { fetchGenres, fetchPlatforms } from '../fetch';

export default {

    components: {
        Dropdown,
    },
    data() {
        return {
            genreList: [], // stores objects { genre_id: '', name: '' }
            genreSelected: { genre_id: -1, name: 'All' },
            platformList: [], // stores objects { platform_id: '', name: '' }
            platformSelected: { platform_id: -1, name: 'All'},
        }
    },
    async mounted() {

        this.genreList = [ this.genreSelected ].concat(await fetchGenres());
        this.platformList = [ this.platformSelected ].concat(await fetchPlatforms());

        this.$refs.genreDD.setList(this.genreList);
        this.$refs.platformDD.setList(this.platformList);
    },
    methods: {
        async applyFilter() {

            // query goes here...
            // use values of genreSelected and platformSelected
        },
        async setGenreSelected(genreSelected) {

            this.genreSelected = this.genreList.find(elem => elem.name == genreSelected);
            console.log("genre set: ", this.genreSelected);
        },
        async setPlatformSelected(platformSelected) {

            this.platformSelected = this.platformList.find(elem => elem.name == platformSelected);
            console.log("platform set: ", this.platformSelected);
        },
    },
}
</script>
  