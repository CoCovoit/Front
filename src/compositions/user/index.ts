export interface User {
    id: string;
    nom: string;
    prenom: string;
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
}



