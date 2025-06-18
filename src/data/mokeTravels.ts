// export interface Trajet {
//   id: number;
//   depart: string;
//   arrivee: string;
//   date: string;
//   heure: string;
//   places: number;
//   placesDisponibles: number;
//   prix: number;
//   conducteur: {
//     id: number;
//     nom: string;
//     prenom: string;
//     avatar: string;
//     note: number;
//   };
//   statut: 'à venir' | 'en cours' | 'terminé' | 'annulé';
//   voiture: {
//     marque: string;
//     modele: string;
//     couleur: string;
//   };
// }
export interface Localisation {
  id: number;
  adresse: string;
  longitude: number;
  latitude: number;
}

export interface Conducteur {
  id: number;
  nom: string;
  email: string;
  localisation: Localisation;
}

export interface Trajet {
  id: number;
  localisationDepart: Localisation;
  localisationArrivee: Localisation;
  conducteur: Conducteur;
  dateHeure: string; // ISO 8601
  nombrePlaces: number;
}

export const mockTrajets: Trajet[] = [
  {
    id: 1,
    localisationDepart: { id: 1, adresse: 'Lyon, Place Bellecour', longitude: 4.835659, latitude: 45.757813 },
    localisationArrivee: { id: 2, adresse: 'Paris, Gare de Lyon', longitude: 2.373047, latitude: 48.844867 },
    conducteur: {
      id: 1,
      nom: 'Dupont',
      email: 'jean.dupont@example.com',
      localisation: { id: 3, adresse: 'Villeurbanne, Rue Paul Bert', longitude: 4.880761, latitude: 45.770542 }
    },
    dateHeure: '2025-06-18T09:45:22.817Z',
    nombrePlaces: 4
  },
  {
    id: 2,
    localisationDepart: { id: 4, adresse: 'Marseille, Vieux-Port', longitude: 5.369780, latitude: 43.296482 },
    localisationArrivee: { id: 5, adresse: 'Nice, Promenade des Anglais', longitude: 7.261953, latitude: 43.695963 },
    conducteur: {
      id: 2,
      nom: 'Martin',
      email: 'sophie.martin@example.com',
      localisation: { id: 6, adresse: 'Aix-en-Provence, Cours Mirabeau', longitude: 5.447427, latitude: 43.529742 }
    },
    dateHeure: '2025-06-19T14:30:00.000Z',
    nombrePlaces: 3
  },
  {
    id: 3,
    localisationDepart: { id: 7, adresse: 'Bordeaux, Place de la Bourse', longitude: -0.579180, latitude: 44.837789 },
    localisationArrivee: { id: 8, adresse: 'Toulouse, Capitole', longitude: 1.444209, latitude: 43.604462 },
    conducteur: {
      id: 3,
      nom: 'Petit',
      email: 'marie.petit@example.com',
      localisation: { id: 9, adresse: 'Pessac, Avenue Michel Ange', longitude: -0.605491, latitude: 44.803093 }
    },
    dateHeure: '2025-06-20T08:15:00.000Z',
    nombrePlaces: 4
  },
  {
    id: 4,
    localisationDepart: { id: 10, adresse: 'Lille, Grand Place', longitude: 3.057256, latitude: 50.637035 },
    localisationArrivee: { id: 11, adresse: 'Paris, Tour Eiffel', longitude: 2.294481, latitude: 48.858370 },
    conducteur: {
      id: 4,
      nom: 'Bernard',
      email: 'lucas.bernard@example.com',
      localisation: { id: 12, adresse: "Roubaix, Rue de l'Alma'", longitude: 3.169696, latitude: 50.692084 }
      },
      dateHeure: '2025-06-21T16:45:00.000Z',
      nombrePlaces: 2
    },
  {
    id: 5,
    localisationDepart: { id: 13, adresse: 'Strasbourg, Petite France', longitude: 7.746253, latitude: 48.584614 },
    localisationArrivee: { id: 14, adresse: 'Colmar, Petite Venise', longitude: 7.358524, latitude: 48.079710 },
    conducteur: {
      id: 5,
      nom: 'Dubois',
      email: 'emma.dubois@example.com',
      localisation: { id: 15, adresse: 'Schiltigheim, Rue Principale', longitude: 7.740288, latitude: 48.613247 }
    },
    dateHeure: '2025-06-22T09:30:00.000Z',
    nombrePlaces: 3
  },
  {
    id: 6,
    localisationDepart: { id: 16, adresse: 'Nantes, Place du Commerce', longitude: -1.554254, latitude: 47.217250 },
    localisationArrivee: { id: 17, adresse: 'Rennes, Place Sainte-Anne', longitude: -1.677792, latitude: 48.111338 },
    conducteur: {
      id: 6,
      nom: 'Moreau',
      email: 'thomas.moreau@example.com',
      localisation: { id: 18, adresse: 'Rezé, Boulevard de la Fraternité', longitude: -1.560550, latitude: 47.195181 }
    },
    dateHeure: '2025-06-23T11:00:00.000Z',
    nombrePlaces: 4
  },
  {
    id: 7,
    localisationDepart: { id: 19, adresse: 'Montpellier, Place de la Comédie', longitude: 3.876716, latitude: 43.610769 },
    localisationArrivee: { id: 20, adresse: 'Marseille, Vieux-Port', longitude: 5.369780, latitude: 43.296482 },
    conducteur: {
      id: 7,
      nom: 'Leroy',
      email: 'julie.leroy@example.com',
      localisation: { id: 21, adresse: 'Sète, Quai Général Durand', longitude: 3.610948, latitude: 43.401831 }
    },
    dateHeure: '2025-06-24T13:15:00.000Z',
    nombrePlaces: 3
  },
  {
    id: 8,
    localisationDepart: { id: 22, adresse: 'Paris, Gare du Nord', longitude: 2.355331, latitude: 48.880948 },
    localisationArrivee: { id: 23, adresse: 'Reims, Cathédrale', longitude: 4.031696, latitude: 49.258329 },
    conducteur: {
      id: 8,
      nom: 'Roux',
      email: 'antoine.roux@example.com',
      localisation: { id: 24, adresse: 'Épernay, Avenue de Champagne', longitude: 3.957024, latitude: 49.046266 }
    },
    dateHeure: '2025-06-25T15:30:00.000Z',
    nombrePlaces: 2
  },
  {
    id: 9,
    localisationDepart: { id: 25, adresse: 'Grenoble, Place Grenette', longitude: 5.726743, latitude: 45.188529 },
    localisationArrivee: { id: 26, adresse: 'Lyon, Part-Dieu', longitude: 4.859498, latitude: 45.760699 },
    conducteur: {
      id: 9,
      nom: 'Fournier',
      email: 'clara.fournier@example.com',
      localisation: { id: 27, adresse: 'Villeurbanne, Avenue Henri Barbusse', longitude: 4.872421, latitude: 45.757050 }
    },
    dateHeure: '2025-06-26T17:45:00.000Z',
    nombrePlaces: 4
  },
  {
    id: 10,
    localisationDepart: { id: 28, adresse: 'Dijon, Place de la Libération', longitude: 5.041484, latitude: 47.322047 },
    localisationArrivee: { id: 29, adresse: 'Paris, Louvre', longitude: 2.336443, latitude: 48.860611 },
    conducteur: {
      id: 10,
      nom: 'Simon',
      email: 'lea.simon@example.com',
      localisation: { id: 30, adresse: 'Auxerre, Place Saint-Vincent', longitude: 3.563261, latitude: 47.798371 }
    },
    dateHeure: '2025-06-27T07:30:00.000Z',
    nombrePlaces: 3
  }
];
