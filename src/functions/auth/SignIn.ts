import { useSignUpStore } from "@/stores/signUpStore";
import { signIn, type SignInInput } from "aws-amplify/auth";
import currentAuthenticatedUser from "./currentAuthenticatedUser";
import router from "@/router";

const handleSignIn = async ({ username, password }: SignInInput) => {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    console.log({ isSignedIn, nextStep });

    const userId = await currentAuthenticatedUser();
    if (!userId) return;

    const userStore = useSignUpStore();
    userStore.setUser({
      isSignUpComplete: isSignedIn,
      nextStep: nextStep.signInStep,
      username,
    });
    if (isSignedIn) router.push({ path: "/user" });
  } catch (error) {
    console.log("error signing in", error);
  }
};

export default handleSignIn;
