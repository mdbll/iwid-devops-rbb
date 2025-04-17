import { post } from "aws-amplify/api";

type Props = {
  street_number: number;
  street: string;
};

const addAddress = async ({ street_number, street }: Props) => {
  try {
    const restOperation = post({
      apiName: "auth",
      path: "/insertAddress",
      options: {
        body: JSON.stringify({
          street,
          street_number,
        }),
      },
    });
    const { body } = await restOperation.response;
    const response = await body.json();
    console.log(response);
  } catch (e) {
    console.log("POST call failed: ", { e });
  }
};

export default addAddress;
