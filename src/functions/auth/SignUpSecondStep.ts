import { useSignUpStore } from "@/stores/signUpStore";
import { confirmSignUp, type ConfirmSignUpInput } from "aws-amplify/auth";

const handleSignUpConfirmation = async ({
  confirmationCode,
}: ConfirmSignUpInput) => {
  try {
    const data = useSignUpStore();
    console.log({ data }, "code", data?.data?.username, confirmationCode);
    if (!data?.data?.username) return;
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: data.data.username,
      confirmationCode,
    });
    console.log(isSignUpComplete, nextStep);
  } catch (error) {
    console.log("error confirming sign up", error);
  }
};

export default handleSignUpConfirmation;
