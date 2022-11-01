import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import UserSettings from "../views/UserSettings.vue";
import GamePage from "../views/GamePage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/settings",
        name: "Settings",
        component: UserSettings,
    },
    {
        path: "/game",
        name: "GamePage",
        component: GamePage,
    },
];

const router = createRouter({
    history: createWebHistory(),

    routes,
});

export default router;
