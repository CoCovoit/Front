import {UserResponseDTO} from "@/compositions/user";
import {TrajetResponseDTO} from "@/compositions/trajet";

export interface ReservationRequestDTO {
    utilisateurId:  number;
    trajetId: number;
}

export interface ReservationResponseDTO {
    passager: UserResponseDTO;
    trajet : TrajetResponseDTO;
}


const urlApi = import.meta.env.VITE_API_ENDPOINT;

/**
 * Crée une nouvelle réservation.
 */
async function createReservation(
    payload: ReservationRequestDTO
): Promise<ReservationResponseDTO> {
    try {
        const response = await fetch(`${urlApi}/Reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        return (await response.json()) as ReservationResponseDTO;
    } catch (error) {
        console.error('Erreur lors de la création de la réservation', error);
        throw error;
    }
}

export function useReservation() {
    return {
        createReservation
    };
}