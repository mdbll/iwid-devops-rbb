import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingUpView from "@/views/SingUpView.vue";
import SignInView from "@/views/SignInView.vue";
import { useSignUpStore } from "@/stores/signUpStore";
import SignUpSecondStep from "@/views/SignUpSecondStep.vue";
import ProfileView from "@/views/ProfileView.vue";

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
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: '/verify',
      name: 'verify',
      component: SignUpSecondStep,
    }
  ],
});

router.beforeEach(async (to, from) => {
  const { data } = useSignUpStore();

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