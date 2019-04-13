import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import main from "./layout/main";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: { name: "home" },
    },
    {
      path: "/zeratul",
      component: main,
      redirect: { name: "home" },
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
          meta: {
            menuCode: "home",
            menuName: "home"
          }
        },
        {
          path: "about",
          name: "about",
          meta: {
            menuCode: "about",
            menuName: "about"
          },
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/About.vue")
        },
        {
          path: "test",
          name: "test",
          meta: {
            menuCode: "test",
            menuName: "test"
          },
          component: () =>
            import(/* webpackChunkName: "test" */ "./views/test.vue")
        }
      ]
    }
  ]
});
