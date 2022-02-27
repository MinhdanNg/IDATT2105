import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoginUser from "../views/LoginUser";
import RegisterUser from "../views/RegisterUser";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "login",
    component: LoginUser,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterUser,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
