import { User } from "../user";


// TODO: Peut être plutot des longitudes et latitudes ?
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

