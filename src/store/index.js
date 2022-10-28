import { reactive } from "vue";

const state = reactive({
    user: null,
    gameInfo: {
        image: "",
        title: "",
        tagData: [], // array of objects { tagName: '', score: '' }
    },
});

const methods = {
    setUser(payload) {
        state.user = payload ? payload.user : null;
    },
    setGameInfo(payload) {
        if (payload) {
            console.log("hello");
            state.gameInfo.image = payload.image;
            state.gameInfo.title = payload.title;
            state.gameInfo.tagData = payload.tagData;
            console.log(state.gameInfo.image);
        }
    },
};

export default {
    state,
    methods,
};
