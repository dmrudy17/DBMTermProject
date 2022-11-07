<template>
    <div class="flex flex-row space-x-1 p-1">
        <p :class="ddLabel">Genre:</p>
        <Dropdown ddID="dd1" ref="genreDD" @itemSelected="setGenreSelected"></Dropdown>
        <p/><p/><p/>
        <p :class="ddLabel">Platform: </p>
        <Dropdown ddID="dd2" ref="platformDD" @itemSelected="setPlatformSelected"></Dropdown>
    </div>
</template>

<script>

import Dropdown from '../components/Dropdown.vue';
import { fetchGenres, fetchPlatforms } from '../fetch';
import { getCarousel_rpc } from '../rpc';

export default {

    components: {
        Dropdown,
    },
    data() {
        return {
            ddLabel: "bg-white rounded-l-lg px-1",
            genreList: [], // stores objects { genre_id: '', name: '' }
            genreSelected: { genre_id: 0, name: 'All' },
            platformList: [], // stores objects { platform_id: '', name: '' }
            platformSelected: { platform_id: 0, name: 'All'},
        }
    },
    async mounted() {

        this.genreList = [ this.genreSelected ].concat(await fetchGenres());
        this.platformList = [ this.platformSelected ].concat(await fetchPlatforms());

        this.$refs.genreDD.setList(this.genreList);
        this.$refs.platformDD.setList(this.platformList);

        this.applyFilter();
    },
    methods: {
        async applyFilter() {

            // use values of genreSelected.genre_id and platformSelected.platform_id as arguments for getCarousel_rpc()
            // note that values of 0 (or lower) will not apply the filter, i.e. if genre_id is 0, then all genres will
            // be included in the carousel.  Selecting 'All' from the dd will set this value
            const carouselCards = await getCarousel_rpc(this.genreSelected.genre_id, this.platformSelected.platform_id, 8);
            console.log(carouselCards);
        },
        async setGenreSelected(genreSelected) {

            this.genreSelected = this.genreList.find(elem => elem.name == genreSelected);
            this.applyFilter();
        },
        async setPlatformSelected(platformSelected) {

            this.platformSelected = this.platformList.find(elem => elem.name == platformSelected);
            this.applyFilter();
        },
    },
}
</script>
  