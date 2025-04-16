import { post } from "aws-amplify/api";

type Props = {
  id: string;
};

const deleteAddress = async ({ id }: Props) => {
  try {
    const restOperation = post({
      apiName: "auth",
      path: "/deleteAddress",
      options: {
        body: JSON.stringify({
          id,
        }),
      },
    });
    const { body } = await restOperation.response;
    const response = await body.json();
    console.log(response);
  } catch (e) {
    console.log("DELETE call failed: ", { e });
  }
};

export default deleteAddress;
