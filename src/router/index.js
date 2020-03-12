import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Suggested from "../views/Suggested.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/suggested",
    name: "Suggested",
    component: Suggested
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
