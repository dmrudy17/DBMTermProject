import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import UserSettings from "../views/UserSettings.vue";

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
];

const router = createRouter({
    history: createWebHistory(),

    routes,
});

export default router;
