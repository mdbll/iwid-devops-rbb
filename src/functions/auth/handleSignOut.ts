import router from "@/router";
import { signOut } from "aws-amplify/auth";

const handleSignOut = async () => {
  try {
    await signOut();
    router.push({ path: "/" });
  } catch (error) {
    console.log("error signing out: ", error);
  }
};

export default handleSignOut;
