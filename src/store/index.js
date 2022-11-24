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
    alphabetically() {
        return function (a, b) {
            if (a === b) {
                return 0;
            }
            if (a === null) {
                return 1;
            }
            if (b === null) {
                return -1;
            }
            return a < b ? 1 : -1;
        };
    },
    handleCloseModal() {
        state.gameInfo = {};
    },
    setUser(payload) {
        state.user = payload ? payload.user : null;
    },
    setGameInfo(payload) {
        if (payload) {
            state.gameInfo.image = payload.image;
            state.gameInfo.title = payload.title;
            state.gameInfo.tagData = payload.tagData.sort(function (a, b) {
                return (
                    (a.avg_score === null) - (b.avg_score === null) ||
                    -(a.avg_score > b.avg_score) ||
                    +(a.avg_score < b.avg_score)
                );
            });
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
