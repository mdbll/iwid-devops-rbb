import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingUpView from "@/views/SingUpView.vue";
import SignInView from "@/views/SignInView.vue";
import { useSignUpStore } from "@/stores/signUpStore";
import UserView from "@/views/UserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/sign-up",
      name: "signup",
      component: SingUpView,
    },
    {
      path: "/sign-in",
      name: "signin",
      component: SignInView,
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const lastAuthUser = localStorage.getItem(
    'CognitoIdentityServiceProvider.3v0f1ivutc4vn1o87s9n9cf558.LastAuthUser'
  );

  const accessTokenKey = `CognitoIdentityServiceProvider.3v0f1ivutc4vn1o87s9n9cf558.${lastAuthUser}.accessToken`;
  const accessToken = localStorage.getItem(accessTokenKey);

  const isAuthenticated = accessToken !== null;

  if (to.name === 'user' && !isAuthenticated) {
    return next({ name: 'signin' });
  }

  next(); 

  // if (!data?.isSignUpComplete && to.name === "user") {
  //   return { name: "home" };
  // }
  // if (
  //   data?.isSignUpComplete &&
  //   ["home", "signup", "signin"].includes((to.name ?? "home").toString())
  // ) {
  //   return { name: "user" };
  // }
});

export default router;
