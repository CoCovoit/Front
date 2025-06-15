export interface LocalisationRequestDTO {
    adresse: string;
    Longitude: number;
    Latitude: number;
}

export interface Localisation {
    id: number;
    adresse: string;
    Longitude: number;
    Latitude: number;
}

/* API service */
const urlApi = import.meta.env.VITE_API_ENDPOINT;

/**
 * Crée une nouvelle localisation.
 */
async function createLocalisation(
    payload: LocalisationRequestDTO
): Promise<Localisation> {
    try {
        const response = await fetch(`${urlApi}/Localisations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        return (await response.json()) as Localisation;
    } catch (error) {
        console.error('Erreur lors de la création de la localisation', error);
        throw error;
    }
}

/**
 * Récupère la liste des localisations.
 */
async function getLocalisations(): Promise<Localisation[]> {
    try {
        const response = await fetch(`${urlApi}/Localisations`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        return (await response.json()) as Localisation[];
    } catch (error) {
        console.error('Erreur lors de la récupération des localisations', error);
        throw error;
    }
}

/* Hook */
export function useLocalisation() {
    return {
        createLocalisation,
        getLocalisations
    };
}
