<template>
    <div class="absolute m-auto top-16 left-0 right-0">
        <h1 class="text-3xl text-white">Browse Hit Titles</h1>
        <GameFilters @init="initialize" @genreSelected="setGenreSelected" @platformSelected="setPlatformSelected" />
        <Carousel />
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

        async fetchFilteredPage() {
            
            const carouselCards = await getCarousel_rpc(this.genreSelected.genre_id,
                                                        this.platformSelected.platform_id,
                                                        this.currentPage);

            console.log(carouselCards);
            store.methods.setCarouselCards(carouselCards);
        },
        initialize(g, p) {

            this.genreSelected = g;
            this.platformSelected = p;
            this.fetchFilteredPage();
        },
        setGenreSelected(g) {

            this.genreSelected = g;
            this.fetchFilteredPage();
        },
        setPlatformSelected(p) {

            this.platformSelected = p;
            this.fetchFilteredPage();
        },
    }
}
</script>