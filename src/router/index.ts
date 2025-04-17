import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingUpView from "@/views/SingUpView.vue";
import SignInView from "@/views/SignInView.vue";
import SignUpSecondStep from "@/views/SignUpSecondStep.vue";
import ProfileView from "@/views/ProfileView.vue";

const publicRoutes = ["/sign-up", "/sign-in", "/verify"];

function isAuthenticated() {
  const tokenKey = Object.keys(localStorage).find((key) =>
    /^CognitoIdentityServiceProvider\..*\.accessToken$/.test(key)
  );
  return !!(tokenKey && localStorage.getItem(tokenKey));
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/sign-up", name: "signup", component: SingUpView },
    { path: "/sign-in", name: "signin", component: SignInView },
    { path: "/verify", name: "verify", component: SignUpSecondStep },
    { path: "/profile", name: "profile", component: ProfileView },
  ],
});

router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated();
  const isPublic = publicRoutes.includes(to.path);

  if (!authenticated && !isPublic) {
    return next("/sign-in");
  }

  if (authenticated && isPublic) {
    return next("/");
  }

  next();
});

export default router;
