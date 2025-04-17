import { get } from "aws-amplify/api";

interface Address {
  id: string;
  name: string;
  // Ajoute d'autres propriétés si besoin
}

interface AddressResponse {
  items: Address[];
}

const getAddresses = async (): Promise<Address[] | null> => {
  try {
    const restOperation = get({
      apiName: "auth",
      path: "/getAddresses",
    }); 

    const res = await restOperation.response;

    // 🔒 On caste d'abord en unknown, puis on vérifie la structure
    const raw = await res.body.json() as unknown;

    if (
      raw &&
      typeof raw === "object" &&
      "items" in raw &&
      Array.isArray((raw as any).items)
    ) {
      const response = raw as AddressResponse;
      console.log(response.items);
      return response.items;
    } else {
      console.warn("Structure de réponse invalide :", raw);
      return null;
    }
  } catch (e) {
    console.log("GET call failed: ", { e });
    return null;
  }
};

export default getAddresses;
