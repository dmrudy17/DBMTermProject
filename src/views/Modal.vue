<template>

    <!-- the div the background  -->
    <div class="fixed  inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <!-- <div> -->

        <div class="items-center">
            <button id="ok-btn"
                class=" absolute top-0 left-0 px-1 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                @click="TogglePopup()">
                DEBUG Close
            </button>
        </div>
        <div class="fixed top-20 left-0 right-0 bottom-10 mx-auto border w-10/12 shadow-lg rounded-md backdrop-blur-sm">
            <div class="mt-3 text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <h3 class="text-lg leading-6 font-medium text-gray-900">Successful!</h3>
                <div class="text-center">

                    <GameCard></GameCard>
                </div>

                <div class="items-center">
                    <button id="ok-btn"
                        class=" absolute bottom-0 left-0 px-1 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        @click="TogglePopup()">
                        DEBUG Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import GameCard from '../components/GameCard.vue';
import GamePageCard from '../components/StaticGamePageCard.vue';

export default {
    components: { GameCard, GamePageCard },
    props: ["TogglePopup"],
    data() {
        return {
            release_date: "",
            errorMessage: "",
        };
    }
}
</script>