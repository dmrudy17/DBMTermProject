import { reactive } from "vue";

const state = reactive({
    user: null,
    gameInfo: {
        image: "",
        title: "",
        tagData: [], // array of objects { tagName: '', score: '' }
    },
    carouselCards: [],
});

const methods = {
    setUser(payload) {
        state.user = payload ? payload.user : null;
    },
    setGameInfo(payload) {
        if (payload) {
            state.gameInfo.image = payload.image;
            state.gameInfo.title = payload.title;
            state.gameInfo.tagData = payload.tagData;
        }
    },
    setCarouselCards(payload) {
        if (payload) {
            state.carouselCards = payload;
        }
    },
    addCarouselCards(payload) {
        if (payload) {
            state.carouselCards = state.carouselCards.concat(payload);
        }
    },
};

export default {
    state,
    methods,
};
