<template>
    <div>
        <div class="flex flex-row space-x-1 p-1">
            <InputDD inputID="titleKW" ddID="titleDDDiv" listID="titleList" ref="titleDD" @textSent="passTitleKWToBrowser"></InputDD>
            <p class="bg-white rounded-l-lg px-1">Genre:</p>
            <Dropdown ddID="dd1" ref="genreDD" @itemSelected="passGenreToBrowser"></Dropdown>
            <p class="bg-white rounded-l-lg px-1">Platform: </p>
            <Dropdown ddID="dd2" ref="platformDD" @itemSelected="passPlatformToBrowser"></Dropdown>
            <p></p><p></p><p></p><p></p>
            <button @click="displayUserGames" class="text-white bg-indigo-500 rounded-lg px-2">Your Games</button>
        </div>
    </div>
</template>

<script>

import InputDD from '../components/InputDD.vue';
import Dropdown from '../components/Dropdown.vue';
import { fetchGenres, fetchPlatforms, fetchGameTitles } from '../fetch';

export default {

    components: {
        Dropdown,
        InputDD,
    },
    data() {
        return {
            genreList: [ { genre_id: 0, name: 'All' } ],
            platformList: [ { platform_id: 0, name: 'All'} ],
        }
    },
    async mounted() {

        this.genreList = this.genreList.concat(await fetchGenres());
        this.platformList = this.platformList.concat(await fetchPlatforms());
        
        this.$refs.titleDD.setList( await fetchGameTitles());
        this.$refs.genreDD.setList(this.genreList);
        this.$refs.platformDD.setList(this.platformList);

        this.$emit('init', this.genreList[0], this.platformList[0]);
    },
    methods: {
        passGenreToBrowser(gName) {

            const genreSelected = this.genreList.find(elem => elem.name == gName);
            this.$emit('genreSelected', genreSelected);
        },
        passPlatformToBrowser(pName) {

            const platformSelected = this.platformList.find(elem => elem.name == pName);
            this.$emit('platformSelected', platformSelected);
        },
        passTitleKWToBrowser(kw) {

            this.$emit('titleKWSet', kw);
        },
        displayUserGames() {

            this.$emit('displayUserGamesSelected');
        }
    },
}
</script>
  