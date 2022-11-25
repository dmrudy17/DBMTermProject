<!-- 
    GameBrowser.vue
    Includes the game display carousel as well as the search and filter components

    Since we need data from both the Carousel (page number) and GameFilters (genre, platform, title) components 
    to make the call to get_carousel, it made sense to house these in this parent component
-->

<template>
    <div class="absolute m-auto top-16 left-0 right-0 overflow-hidden">
        <div class="ml-32">
            <h1 class="text-3xl text-white">Browse Hit Titles</h1>
            <GameFilters    @init="initialize" @titleKWSet="applyKeyWordFilter"
                            @genreSelected="applyGenreFilter" @platformSelected="applyPlatformFilter"
                            @displayUserGamesSelected="showUserCarousel" />
        </div>
        <Carousel ref="carousel" @endOfCarousel="fetchNextPage" />
    </div>
</template>

<script>
import GameFilters from '../components/GameFilters.vue'
import Carousel from '../components/Carousel.vue'
import { getCarousel_rpc, getUserCarousel_rpc } from '../rpc';
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
            viewingUserGames: false,
        }
    },
    methods: {

        async fetchAndSetCarousel() {

            // attempting to read .id will error if no user is logged in, so check if a user is logged in 
            const userID = store.state.user == null ? null : store.state.user.id;
    
            const carouselCards = await getCarousel_rpc(userID,
                                                        this.genreSelected.genre_id,
                                                        this.platformSelected.platform_id,
                                                        this.titleKeyWord,
                                                        this.currentPage);

            store.methods.setCarouselCards(carouselCards);
        },
        async fetchNextPage() {

            this.currentPage++;
            var carouselCards;

            if (this.viewingUserGames) {

                carouselCards = await getUserCarousel_rpc(store.state.user.id, this.currentPage);
            }
            else {
                
                const userID = store.state.user == null ? null : store.state.user.id;

                carouselCards = await getCarousel_rpc(userID,
                                                            this.genreSelected.genre_id,
                                                            this.platformSelected.platform_id,
                                                            this.titleKeyWord,
                                                            this.currentPage);
            }
                                                        
            store.methods.addCarouselCards(carouselCards);
        },
        async initialize(g, p) {

            this.genreSelected = g;
            this.platformSelected = p;
            await this.fetchAndSetCarousel();
        },
        async applyGenreFilter(g) {
            
            this.viewingUserGames = false;
            this.genreSelected = g;
            this.currentPage = 1;
            await this.fetchAndSetCarousel();
            this.$refs.carousel.reset();
        },
        async applyPlatformFilter(p) {

            this.viewingUserGames = false;
            this.platformSelected = p;
            this.currentPage = 1;
            await this.fetchAndSetCarousel();
            this.$refs.carousel.reset();
        },
        async applyKeyWordFilter(kw) {
            
            if (kw != this.titleKeyWord) {

                this.viewingUserGames = false;
                this.titleKeyWord = kw;
                this.currentPage = 1;
                await this.fetchAndSetCarousel()
                this.$refs.carousel.reset();
            }
        },
        async showUserCarousel() {
            
            this.viewingUserGames = true;
            this.currentPage = 1;
            const carouselCards = await getUserCarousel_rpc(store.state.user.id, this.currentPage);
            store.methods.setCarouselCards(carouselCards);
            this.$refs.carousel.reset();
        },
        async fetchNextUserPage() {

            this.currentPage++;
            const carouselCards = await getUserCarousel_rpc(store.state.user.id, this.currentPage);
                                                        
            store.methods.addCarouselCards(carouselCards);
        },
    }
}
</script>