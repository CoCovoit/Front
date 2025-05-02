export interface Trajet {
  id: number;
  depart: string;
  arrivee: string;
  date: string;
  heure: string;
  places: number;
  placesDisponibles: number;
  prix: number;
  conducteur: {
    id: number;
    nom: string;
    prenom: string;
    avatar: string;
    note: number;
  };
  statut: 'à venir' | 'en cours' | 'terminé' | 'annulé';
  voiture: {
    marque: string;
    modele: string;
    couleur: string;
  };
}

export const mockTrajets: Trajet[] = [
  {
    id: '1',
    date: new Date('2024-04-01'),
    adresseDepart: 'Lyon',
    adresseArrivee: 'Paris',
    heureDebut: new Date('2024-04-01T08:00:00'),
    heureFin: new Date('2024-04-01T14:00:00'),
    conducteur: {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
      note: 4.5
    },
    passagers: [],
    nombreDePassagersMax: 4,
    vehicule: 'Peugeot 308',
    kilometrage: 450,
    tempsDeTrajet: 360,
    commentaire: 'Trajet direct sur autoroute'
  },
  {
    id: 2,
    depart: "Marseille",
    arrivee: "Nice",
    date: "2024-04-02",
    heure: "14:30",
    places: 3,
    placesDisponibles: 1,
    prix: 25,
    conducteur: {
      id: 2,
      nom: "Martin",
      prenom: "Sophie",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      note: 4.8
    },
    statut: "à venir",
    voiture: {
      marque: "Renault",
      modele: "Clio",
      couleur: "Rouge"
    }
  },
  {
    id: 3,
    depart: "Bordeaux",
    arrivee: "Toulouse",
    date: "2024-04-03",
    heure: "10:15",
    places: 4,
    placesDisponibles: 3,
    prix: 28,
    conducteur: {
      id: 3,
      nom: "Petit",
      prenom: "Marie",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
      note: 4.2
    },
    statut: "à venir",
    voiture: {
      marque: "Volkswagen",
      modele: "Golf",
      couleur: "Noire"
    }
  },
  {
    id: 4,
    depart: "Lille",
    arrivee: "Paris",
    date: "2024-04-04",
    heure: "16:45",
    places: 3,
    placesDisponibles: 0,
    prix: 30,
    conducteur: {
      id: 4,
      nom: "Bernard",
      prenom: "Lucas",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
      note: 4.6
    },
    statut: "à venir",
    voiture: {
      marque: "Citroën",
      modele: "C3",
      couleur: "Bleue"
    }
  },
  {
    id: 5,
    depart: "Strasbourg",
    arrivee: "Lyon",
    date: "2024-04-05",
    heure: "09:30",
    places: 4,
    placesDisponibles: 2,
    prix: 40,
    conducteur: {
      id: 5,
      nom: "Dubois",
      prenom: "Emma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      note: 4.9
    },
    statut: "à venir",
    voiture: {
      marque: "BMW",
      modele: "Série 1",
      couleur: "Blanche"
    }
  },
  {
    id: 6,
    depart: "Nantes",
    arrivee: "Rennes",
    date: "2024-04-06",
    heure: "11:00",
    places: 3,
    placesDisponibles: 1,
    prix: 20,
    conducteur: {
      id: 6,
      nom: "Moreau",
      prenom: "Thomas",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
      note: 4.3
    },
    statut: "à venir",
    voiture: {
      marque: "Audi",
      modele: "A3",
      couleur: "Grise"
    }
  },
  {
    id: 7,
    depart: "Montpellier",
    arrivee: "Marseille",
    date: "2024-04-07",
    heure: "13:15",
    places: 4,
    placesDisponibles: 3,
    prix: 22,
    conducteur: {
      id: 7,
      nom: "Leroy",
      prenom: "Julie",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julie",
      note: 4.7
    },
    statut: "à venir",
    voiture: {
      marque: "Toyota",
      modele: "Yaris",
      couleur: "Rouge"
    }
  },
  {
    id: 8,
    depart: "Paris",
    arrivee: "Reims",
    date: "2024-04-08",
    heure: "15:30",
    places: 3,
    placesDisponibles: 2,
    prix: 25,
    conducteur: {
      id: 8,
      nom: "Roux",
      prenom: "Antoine",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antoine",
      note: 4.4
    },
    statut: "à venir",
    voiture: {
      marque: "Seat",
      modele: "Leon",
      couleur: "Noire"
    }
  },
  {
    id: 9,
    depart: "Grenoble",
    arrivee: "Lyon",
    date: "2024-04-09",
    heure: "17:45",
    places: 4,
    placesDisponibles: 1,
    prix: 18,
    conducteur: {
      id: 9,
      nom: "Fournier",
      prenom: "Clara",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Clara",
      note: 4.8
    },
    statut: "à venir",
    voiture: {
      marque: "Opel",
      modele: "Corsa",
      couleur: "Bleue"
    }
  },
  {
    id: 10,
    depart: "Dijon",
    arrivee: "Paris",
    date: "2024-04-10",
    heure: "07:30",
    places: 4,
    placesDisponibles: 4,
    prix: 32,
    conducteur: {
      id: 10,
      nom: "Simon",
      prenom: "Léa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lea",
      note: 5.0
    },
    statut: "à venir",
    voiture: {
      marque: "Mercedes",
      modele: "Classe A",
      couleur: "Grise"
    }
  }
]; 