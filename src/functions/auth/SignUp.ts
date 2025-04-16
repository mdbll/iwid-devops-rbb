import { useSignUpStore } from "@/stores/signUpStore";
import { signUp } from "@aws-amplify/auth";

type SignUpParameters = {
  password: string;
  email: string;
  firstname: string;
  familyName: string;
};

const handleSignUp = async ({
  password,
  email,
  firstname,
  familyName,
}: SignUpParameters) => {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email.toLowerCase().trim(),
      password,
      options: {
        userAttributes: { email, family_name: familyName, name: firstname },
        autoSignIn: true,
      },
    });

    console.log(userId, isSignUpComplete, nextStep);
    const userStore = useSignUpStore();
    userStore.setUser({
      isSignUpComplete,
      nextStep: nextStep.signUpStep,
      username: email.toLowerCase().trim(),
    });
  } catch (error) {
    console.log("error signing up:", error);
  }
};

export default handleSignUp;
