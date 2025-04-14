import { signUp } from "@aws-amplify/auth";

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

const handleSignUp = async ({
  username,
  password,
  email,
}: SignUpParameters) => {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
        },
        autoSignIn: true,
      },
    });

    console.log(userId, isSignUpComplete, nextStep);
    return { userId, isSignUpComplete };
  } catch (error) {
    console.log("error signing up:", error);
  }
};

export default handleSignUp;
