import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auths/Login.vue"),
    meta: {
      middleware: "guest",
    },
  },

  {
    path: "/",
    name: "admin",
    component: () => import("../views/layout/Container.vue"),
    redirect: "/admin/about",
    meta: {
      middleware: "admin",
    },
    children: [
      {
        path: "/admin/about",
        name: "about",
        component: () => import("../views/About.vue"),
        meta: {
          middleware: "admin",
        },
      },
      {
        path: "/admin/users",
        name: "users",
        component: () => import("../views/users/TheUsers.vue"),
        meta: {
          middleware: "admin",
        },
      },
      {
        path: "/admin/profile",
        name: "profile",
        component: () => import("../views/auths/Profile.vue"),
        meta: {
          middleware: "admin",
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});



router.beforeEach((to, from, next) => {
  if (Vue.store.state.mAuths.authenticated) {
    if (to.fullPath == "/login") {
      next({ name: "admin" });
    }
    next();
  } else {
    if (to.meta.middleware == "guest") {
      next();
    } else {
      next({ name: "login" });
    }
  }
});





Vue.router = router;
export default router;