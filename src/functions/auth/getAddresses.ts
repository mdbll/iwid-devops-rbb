import { get } from "aws-amplify/api";

const getAddresses = async () => {
  try {
    const restOperation = get({
      apiName: "auth",
      path: "/getAddresses",
    });
    const res = await restOperation.response;
    const response = await res.body.json();
    console.log(response.items);
    return response.items as object;
  } catch (e) {
    console.log("GET call failed: ", { e });
    return null;
  }
};

export default getAddresses;
