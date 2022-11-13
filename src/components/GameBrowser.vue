<!-- 
    GameBrowser.vue
    Includes the game display carousel as well as the search and filter components

    Since we need data from both the Carousel (page number) and GameFilters (genre, platform, title) components 
    to make the call to get_carousel, it made sense to house these in this parent component
-->

<template>
    <div class="absolute m-auto top-16 left-0 right-0">
        <h1 class="text-3xl text-white">Browse Hit Titles</h1>
        <GameFilters @init="initialize" @genreSelected="applyGenreFilter" @platformSelected="applyPlatformFilter" />
        <Carousel ref="carousel" @endOfCarousel="fetchNextPage" />
    </div>
</template>

<script>
import GameFilters from '../components/GameFilters.vue'
import Carousel from '../components/Carousel.vue'
import { getCarousel_rpc } from '../rpc';
import store from '../store/index';

export default {
    components: {
        GameFilters,
        Carousel
    },
    data() {

        return {

            currentPage: 1,
            genreSelected: null,
            platformSelected: null,
            titleKeyWord: '',
        }
    },
    methods: {

        async fetchAndSetCarousel() {
            
            const carouselCards = await getCarousel_rpc(this.genreSelected.genre_id,
                                                        this.platformSelected.platform_id,
                                                        this.currentPage);

            store.methods.setCarouselCards(carouselCards);
        },
        async fetchNextPage() {

            this.currentPage++;
            const carouselCards = await getCarousel_rpc(this.genreSelected.genre_id,
                                                        this.platformSelected.platform_id,
                                                        this.currentPage);
            store.methods.addCarouselCards(carouselCards);
            this.$refs.carousel.updateCards();
        },
        async initialize(g, p) {

            this.genreSelected = g;
            this.platformSelected = p;
            await this.fetchAndSetCarousel();
        },
        async applyGenreFilter(g) {

            this.genreSelected = g;
            this.currentPage = 1;
            await this.fetchAndSetCarousel();
        },
        async applyPlatformFilter(p) {

            this.platformSelected = p;
            this.currentPage = 1;
            await this.fetchAndSetCarousel();
        },
    }
}
</script>