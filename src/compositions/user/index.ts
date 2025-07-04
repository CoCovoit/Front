import {Localisation} from "@/compositions/localisation";
import {TrajetResponseDTO} from "@/compositions/trajet";

export interface User {
    id: string;
    nom: string;
    prenom?: string;
    email?: string;
    avatar?: string;
    heureDebutPreferer?: Date;
    heureFinPreferer?: Date;
    address?: string;
    vehicule?: string;
    statut?: string;
    sexe?: string;
    age?: number;
    telephone?: string;
    notificationPush?: boolean;
    LocalisationId?: Localisation[];
}


export interface UserRequestDTO {
    nom?: string;
    localisationId: number;
    email?: string;
}

export interface UserResponseDTO {
    id: number;
    nom?: string;
    email?: string;
    localisations: Localisation;
}



const urlApi = import.meta.env.VITE_API_ENDPOINT;


async function createUser(
    payload: UserRequestDTO
): Promise<UserResponseDTO> {
    try {
        const response = await fetch(`${urlApi}/Utilisateurs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        return (await response.json()) as UserResponseDTO;
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur', error);
        throw error;
    }
}

async function getUsers(): Promise<UserResponseDTO[]> {
    try {
        const response = await fetch(`${urlApi}/Utilisateurs`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        return (await response.json()) as UserResponseDTO[];
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        throw error;
    }
}

async function getUserTrajets(
    idUser: number
): Promise<TrajetResponseDTO[]> {
    try {
        const response = await fetch(`${urlApi}/Utilisateurs/${idUser}/Trajets`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        return (await response.json()) as TrajetResponseDTO[];
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        throw error;
    }
}

export function useUser(){
    return{
        createUser,
        getUsers,
        getUserTrajets
    }
}