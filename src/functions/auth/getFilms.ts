import { get } from "aws-amplify/api";

interface Film {
    id: string;
    title: string;
    [key: string]: any;
}

const getFilms = async (): Promise<Film[] | null> => {
    try {
        const restOp = get({
            apiName: "auth",
            path: "/getFilms",
        });

        const res = await restOp.response;
        const json = await res.body.json() as unknown;

        // Sécurité : vérifier structure
        if (
            json &&
            typeof json === "object" &&
            "items" in json &&
            Array.isArray((json as any).items)
        ) {
            const films = (json as any).items.filter(
                (item: any): item is Film => item && typeof item.id === "string" && typeof item.title === "string"
            );
            return films;
        }

        // fallback : parfois c’est un tableau direct (non encapsulé dans .items)
        if (Array.isArray(json)) {
            const films = json.filter(
                (item: any): item is Film => item && typeof item.id === "string" && typeof item.title === "string"
            );
            return films;
        }

        console.warn("Structure inattendue :", json);
        return null;
    } catch (err) {
        console.error("Error fetching films:", err);
        return null;
    }
};

export default getFilms;
