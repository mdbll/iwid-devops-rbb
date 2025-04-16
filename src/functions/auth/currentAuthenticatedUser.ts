import { getCurrentUser } from "aws-amplify/auth";

const currentAuthenticatedUser = async (): Promise<string | null> => {
  try {
    const { userId } = await getCurrentUser();
    return userId;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default currentAuthenticatedUser;
