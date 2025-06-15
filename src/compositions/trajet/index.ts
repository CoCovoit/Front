import {User, UserResponseDTO} from "../user";
import {Localisation} from "@/compositions/localisation";


export interface Trajet {
    id: string;
    date: Date;
    adresseDepart: string;
    adresseArrivee: string;
    heureDebut: Date;
    heureFin: Date;
    conducteur: User;
    passagers: User[];
    nombreDePassagersMax: number;
    vehicule?: string;
    kilometrage: number;
    tempsDeTrajet: number;
    commentaire?: string;
}

export interface TrajetWithCoordonneesRequestDTO {
    condtucteurId:  string;
    dateHeure: Date;
    nombrePlaces: number;
    AdresseDepart?: string;
    longitudeDepart: number;
    latitudeDepart: number;
    AdresseArrivee?: string;
    longitudeArrivee: number;
    latitudeArrivee: number;
}

export interface TrajetRequestDTO {
    conducteurId: string;
    localisationDepartId: number;
    localisationArriveeId: number;
    dateHeure: Date;
    nombrePlaces: number;
}

export interface TrajetResponseDTO {
    id: number;
    localisationDepart: Localisation;
    localisationArrivee: Localisation;
    conducteur: UserResponseDTO;
    dateHeure: Date;
    nombrePlaces: number;
}


const urlApi = import.meta.env.VITE_API_ENDPOINT;


/**
 * Crée plusieurs trajets en une seule requête.
 */
async function createTrajets(
    payload: TrajetRequestDTO[]
): Promise<TrajetResponseDTO[]> {
    const response = await fetch(`${urlApi}/Trajets/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    return (await response.json()) as TrajetResponseDTO[];
}

/**
 * Crée un trajet en fournissant directement les coordonnées géographiques.
 */
async function createTrajetByCoordonnees(
    payload: TrajetWithCoordonneesRequestDTO
): Promise<TrajetResponseDTO> {
    const response = await fetch(`${urlApi}/Trajets/Coordonnees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    return (await response.json()) as TrajetResponseDTO;
}

/**
 * Récupère les trajets à proximité d'une position donnée.
 * @param latitude Latitude en degrés décimaux
 * @param longitude Longitude en degrés décimaux
 * @param rayon Rayon de recherche en kilomètres (optionnel, défault = 5)
 */
async function getTrajetByProximite(
    latitude: number,
    longitude: number,
): Promise<TrajetResponseDTO[]> {
    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
    });
    const response = await fetch(
        `${urlApi}/Trajets/Proximite?${params.toString()}`,
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        }
    );
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    return (await response.json()) as TrajetResponseDTO[];
}

/**
 * Hook React pour les opérations sur les trajets.
 */
export function useTrajet() {
    return {
        createTrajets,
        createTrajetByCoordonnees,
        getTrajetByProximite,
    };
}
