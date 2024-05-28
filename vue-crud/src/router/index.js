import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // =======backend============
  {
    path: "/admin",
    name: "private",
    component: () => import("@/layouts/auth/auth_layout.vue"),
    children: [
      {
        path: "/admin/home",
        name: "admin-home",
        component: () => import("@/modules/backend/home/home_view.vue"),
        meta: {
          layout: "auth",
        },
      },
      {
        path: "/admin/products",
        name: "admin-products",
        component: () => import("@/modules/backend/products/product_view.vue"),
        meta: {
          layout: "auth",
        },
      },
      {
        path: "/project-details/:slug",
        name: "admin-project-details",
        component: () =>
          import("@/modules/backend/products/components/project_details.vue"),
        meta: {
          layout: "auth",
        },
      },
    ],
  },
  // ========frontend==============
  {
    path: "/",
    name: "public",
    component: () => import("@/layouts/app/app_layout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/modules/auth/login_view.vue"),
      },
      {
        path: "/",
        name: "home",
        component: () => import("@/modules/frontend/home/home_view.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "error-page",
        component: () => import("@/modules/frontend/home/home_view.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;