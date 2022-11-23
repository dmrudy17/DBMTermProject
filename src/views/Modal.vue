<template>
    <!-- the div the background  -->
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="fixed top-20 left-0 right-0 bottom-10 mx-auto border w-10/12 shadow-lg rounded-md backdrop-blur-sm">
            <div class="mt-3">
                <div @click="TogglePopup()" class="absolute mr-4 right-0 h-10 w-10 rounded-full bg-indigo-500 cursor-pointer">
                    <XMarkIcon />
                </div>
                <div>
                    <GameCard></GameCard>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import GameCard from '../components/GameCard.vue';
import GamePageCard from '../components/StaticGamePageCard.vue';
import { XMarkIcon } from '@heroicons/vue/24/outline'

export default {
    components: { GameCard, GamePageCard, XMarkIcon },
    props: ["TogglePopup"],
    data() {
        return {
            release_date: "",
            errorMessage: "",
        };
    }
}
</script>