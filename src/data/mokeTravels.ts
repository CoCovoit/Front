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
import {TrajetResponseDTO} from "@/compositions/trajet";

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

export const mockTrajets: TrajetResponseDTO[] = [
  {
    id: 51,
    dateHeure: new Date('2025-06-21T08:00:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 1,
      adresse: 'matteo',
      longitude: 0,
      latitude: 0
    },
    localisationArrivee: {
      id: 2,
      adresse: '1 place Bellecour, Lyon',
      longitude: 4.832,
      latitude: 45.7578
    },
    role: 'C'
  },
  {
    id: 101,
    dateHeure: new Date('2025-07-16T08:00:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 1,
      adresse: 'matteo',
      longitude: 0,
      latitude: 0
    },
    localisationArrivee: {
      id: 6,
      adresse: '5 cours Lafayette, Lyon',
      longitude: 4.8585,
      latitude: 45.7633
    },
    role: 'C'
  },
  {
    id: 131,
    dateHeure: new Date('2025-07-31T08:00:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 1,
      adresse: 'matteo',
      longitude: 0,
      latitude: 0
    },
    localisationArrivee: {
      id: 9,
      adresse: '8 rue Mercière, Lyon',
      longitude: 4.8325,
      latitude: 45.7611
    },
    role: 'C'
  },
  {
    id: 214,
    dateHeure: new Date('2025-03-23T14:15:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 19,
      adresse: '18 rue Saint-Jean, Lyon',
      longitude: 4.8279,
      latitude: 45.7615
    },
    localisationArrivee: {
      id: 104,
      adresse: '3 quai Saint-Antoine, Lyon',
      longitude: 4.8287,
      latitude: 45.762
    },
    role: 'C'
  },
  {
    id: 242,
    dateHeure: new Date('2025-04-20T21:30:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 2,
      adresse: '1 place Bellecour, Lyon',
      longitude: 4.832,
      latitude: 45.7578
    },
    localisationArrivee: {
      id: 51,
      adresse: '50 montée Saint-Sébastien, Lyon',
      longitude: 4.8326,
      latitude: 45.7657
    },
    role: 'C'
  },
  {
    id: 284,
    dateHeure: new Date('2025-02-24T15:30:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 23,
      adresse: '22 cours Vitton, Lyon',
      longitude: 4.8557,
      latitude: 45.7678
    },
    localisationArrivee: {
      id: 129,
      adresse: '28 cours de la Liberté, Lyon',
      longitude: 4.8413,
      latitude: 45.7559
    },
    role: 'C'
  },
  {
    id: 349,
    dateHeure: new Date('2025-03-16T10:30:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 113,
      adresse: '12 rue Garibaldi, Lyon',
      longitude: 4.8446,
      latitude: 45.7512
    },
    localisationArrivee: {
      id: 41,
      adresse: '40 rue Bugeaud, Lyon',
      longitude: 4.8496,
      latitude: 45.7652
    },
    role: 'C'
  },
  {
    id: 372,
    dateHeure: new Date('2025-01-26T22:15:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 62,
      adresse: '11 avenue Jean Jaurès, Lyon',
      longitude: 4.8427,
      latitude: 45.7395
    },
    localisationArrivee: {
      id: 12,
      adresse: '11 avenue Jean Jaurès, Lyon',
      longitude: 4.8427,
      latitude: 45.7395
    },
    role: 'C'
  },
  {
    id: 407,
    dateHeure: new Date('2025-03-17T20:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 61,
      adresse: '10 quai du Rhône, Lyon',
      longitude: 4.8423,
      latitude: 45.7643
    },
    localisationArrivee: {
      id: 92,
      adresse: '41 avenue du Point du Jour, Lyon',
      longitude: 4.8025,
      latitude: 45.748
    },
    role: 'C'
  },
  {
    id: 416,
    dateHeure: new Date('2025-03-04T07:15:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 5,
      adresse: '4 rue Victor Hugo, Lyon',
      longitude: 4.8299,
      latitude: 45.7535
    },
    localisationArrivee: {
      id: 125,
      adresse: '24 rue de Bonnel, Lyon',
      longitude: 4.8536,
      latitude: 45.7593
    },
    role: 'C'
  },
  {
    id: 473,
    dateHeure: new Date('2025-03-16T18:30:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 86,
      adresse: '35 cours Charlemagne, Lyon',
      longitude: 4.8231,
      latitude: 45.7403
    },
    localisationArrivee: {
      id: 115,
      adresse: '14 cours Gambetta, Lyon',
      longitude: 4.8433,
      latitude: 45.7481
    },
    role: 'C'
  },
  {
    id: 487,
    dateHeure: new Date('2025-03-24T22:15:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 127,
      adresse: '26 rue Montgolfier, Lyon',
      longitude: 4.848,
      latitude: 45.7711
    },
    localisationArrivee: {
      id: 49,
      adresse: '48 rue Bossuet, Lyon',
      longitude: 4.8493,
      latitude: 45.7576
    },
    role: 'C'
  },
  {
    id: 538,
    dateHeure: new Date('2025-04-07T19:00:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 122,
      adresse: '21 rue Servient, Lyon',
      longitude: 4.8541,
      latitude: 45.7602
    },
    localisationArrivee: {
      id: 34,
      adresse: '33 montée de la Grande-Côte, Lyon',
      longitude: 4.8305,
      latitude: 45.7666
    },
    role: 'C'
  },
  {
    id: 606,
    dateHeure: new Date('2025-05-08T07:00:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 93,
      adresse: '42 rue des Trois Maries, Lyon',
      longitude: 4.8267,
      latitude: 45.7619
    },
    localisationArrivee: {
      id: 31,
      adresse: '30 rue Sainte-Hélène, Lyon',
      longitude: 4.8295,
      latitude: 45.7565
    },
    role: 'C'
  },
  {
    id: 620,
    dateHeure: new Date('2025-04-09T08:00:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 21,
      adresse: '20 avenue Maréchal de Saxe, Lyon',
      longitude: 4.8441,
      latitude: 45.7577
    },
    localisationArrivee: {
      id: 113,
      adresse: '12 rue Garibaldi, Lyon',
      longitude: 4.8446,
      latitude: 45.7512
    },
    role: 'C'
  },
  {
    id: 716,
    dateHeure: new Date('2025-04-04T12:00:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 105,
      adresse: '4 rue Victor Hugo, Lyon',
      longitude: 4.8299,
      latitude: 45.7535
    },
    localisationArrivee: {
      id: 41,
      adresse: '40 rue Bugeaud, Lyon',
      longitude: 4.8496,
      latitude: 45.7652
    },
    role: 'C'
  },
  {
    id: 724,
    dateHeure: new Date('2025-01-28T19:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 63,
      adresse: '12 rue Garibaldi, Lyon',
      longitude: 4.8446,
      latitude: 45.7512
    },
    localisationArrivee: {
      id: 71,
      adresse: '20 avenue Maréchal de Saxe, Lyon',
      longitude: 4.8441,
      latitude: 45.7577
    },
    role: 'C'
  },
  {
    id: 746,
    dateHeure: new Date('2025-01-30T21:30:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 11,
      adresse: '10 quai du Rhône, Lyon',
      longitude: 4.8423,
      latitude: 45.7643
    },
    localisationArrivee: {
      id: 97,
      adresse: '46 rue Jean Jaurès, Lyon',
      longitude: 4.8429,
      latitude: 45.739
    },
    role: 'C'
  },
  {
    id: 784,
    dateHeure: new Date('2025-02-06T18:45:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 14,
      adresse: '13 place Carnot, Lyon',
      longitude: 4.8271,
      latitude: 45.7488
    },
    localisationArrivee: {
      id: 80,
      adresse: '29 place Gabriel Péri, Lyon',
      longitude: 4.8452,
      latitude: 45.7541
    },
    role: 'C'
  },
  {
    id: 921,
    dateHeure: new Date('2025-05-28T12:15:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 33,
      adresse: '32 rue du Président Édouard Herriot, Lyon',
      longitude: 4.8317,
      latitude: 45.7599
    },
    localisationArrivee: {
      id: 88,
      adresse: '37 place Voltaire, Lyon',
      longitude: 4.843,
      latitude: 45.752
    },
    role: 'C'
  },
  {
    id: 923,
    dateHeure: new Date('2025-01-05T06:45:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 132,
      adresse: '31 rue Burdeau, Lyon',
      longitude: 4.8329,
      latitude: 45.769
    },
    localisationArrivee: {
      id: 148,
      adresse: '47 avenue Félix Faure, Lyon',
      longitude: 4.8535,
      latitude: 45.7561
    },
    role: 'C'
  },
  {
    id: 984,
    dateHeure: new Date('2025-04-17T18:00:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 10,
      adresse: '9 rue Édouard Herriot, Lyon',
      longitude: 4.8318,
      latitude: 45.7597
    },
    localisationArrivee: {
      id: 90,
      adresse: '39 rue de l’Arbre Sec, Lyon',
      longitude: 4.8322,
      latitude: 45.7634
    },
    role: 'C'
  },
  {
    id: 1140,
    dateHeure: new Date('2025-01-29T08:45:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 145,
      adresse: '44 rue Pierre Corneille, Lyon',
      longitude: 4.8474,
      latitude: 45.76
    },
    localisationArrivee: {
      id: 12,
      adresse: '11 avenue Jean Jaurès, Lyon',
      longitude: 4.8427,
      latitude: 45.7395
    },
    role: 'C'
  },
  {
    id: 1151,
    dateHeure: new Date('2025-01-22T06:45:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 77,
      adresse: '26 rue Montgolfier, Lyon',
      longitude: 4.848,
      latitude: 45.7711
    },
    localisationArrivee: {
      id: 52,
      adresse: '1 place Bellecour, Lyon',
      longitude: 4.832,
      latitude: 45.7578
    },
    role: 'C'
  },
  {
    id: 1160,
    dateHeure: new Date('2025-01-04T08:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 134,
      adresse: '33 montée de la Grande-Côte, Lyon',
      longitude: 4.8305,
      latitude: 45.7666
    },
    localisationArrivee: {
      id: 106,
      adresse: '5 cours Lafayette, Lyon',
      longitude: 4.8585,
      latitude: 45.7633
    },
    role: 'C'
  },
  {
    id: 1176,
    dateHeure: new Date('2025-02-13T13:00:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 50,
      adresse: '49 cours Franklin Roosevelt, Lyon',
      longitude: 4.8553,
      latitude: 45.767
    },
    localisationArrivee: {
      id: 52,
      adresse: '1 place Bellecour, Lyon',
      longitude: 4.832,
      latitude: 45.7578
    },
    role: 'C'
  },
  {
    id: 1203,
    dateHeure: new Date('2025-01-30T21:00:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 9,
      adresse: '8 rue Mercière, Lyon',
      longitude: 4.8325,
      latitude: 45.7611
    },
    localisationArrivee: {
      id: 8,
      adresse: '7 place des Terreaux, Lyon',
      longitude: 4.8347,
      latitude: 45.7674
    },
    role: 'C'
  },
  {
    id: 1370,
    dateHeure: new Date('2025-04-02T15:30:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 134,
      adresse: '33 montée de la Grande-Côte, Lyon',
      longitude: 4.8305,
      latitude: 45.7666
    },
    localisationArrivee: {
      id: 28,
      adresse: '27 rue de l’Université, Lyon',
      longitude: 4.8354,
      latitude: 45.7498
    },
    role: 'C'
  },
  {
    id: 1371,
    dateHeure: new Date('2025-05-03T14:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 107,
      adresse: '6 rue de Créqui, Lyon',
      longitude: 4.8444,
      latitude: 45.7572
    },
    localisationArrivee: {
      id: 86,
      adresse: '35 cours Charlemagne, Lyon',
      longitude: 4.8231,
      latitude: 45.7403
    },
    role: 'C'
  },
  {
    id: 1455,
    dateHeure: new Date('2025-04-22T09:15:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 29,
      adresse: '28 cours de la Liberté, Lyon',
      longitude: 4.8413,
      latitude: 45.7559
    },
    localisationArrivee: {
      id: 60,
      adresse: '9 rue Édouard Herriot, Lyon',
      longitude: 4.8318,
      latitude: 45.7597
    },
    role: 'C'
  },
  {
    id: 1459,
    dateHeure: new Date('2025-02-02T08:00:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 130,
      adresse: '29 place Gabriel Péri, Lyon',
      longitude: 4.8452,
      latitude: 45.7541
    },
    localisationArrivee: {
      id: 82,
      adresse: '31 rue Burdeau, Lyon',
      longitude: 4.8329,
      latitude: 45.769
    },
    role: 'C'
  },
  {
    id: 1514,
    dateHeure: new Date('2025-04-08T06:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 94,
      adresse: '43 place Sathonay, Lyon',
      longitude: 4.8302,
      latitude: 45.767
    },
    localisationArrivee: {
      id: 113,
      adresse: '12 rue Garibaldi, Lyon',
      longitude: 4.8446,
      latitude: 45.7512
    },
    role: 'C'
  },
  {
    id: 1678,
    dateHeure: new Date('2025-02-05T21:00:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 115,
      adresse: '14 cours Gambetta, Lyon',
      longitude: 4.8433,
      latitude: 45.7481
    },
    localisationArrivee: {
      id: 25,
      adresse: '24 rue de Bonnel, Lyon',
      longitude: 4.8536,
      latitude: 45.7593
    },
    role: 'C'
  },
  {
    id: 1679,
    dateHeure: new Date('2025-03-04T10:15:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 80,
      adresse: '29 place Gabriel Péri, Lyon',
      longitude: 4.8452,
      latitude: 45.7541
    },
    localisationArrivee: {
      id: 43,
      adresse: '42 rue des Trois Maries, Lyon',
      longitude: 4.8267,
      latitude: 45.7619
    },
    role: 'C'
  },
  {
    id: 1742,
    dateHeure: new Date('2025-01-18T17:15:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 49,
      adresse: '48 rue Bossuet, Lyon',
      longitude: 4.8493,
      latitude: 45.7576
    },
    localisationArrivee: {
      id: 113,
      adresse: '12 rue Garibaldi, Lyon',
      longitude: 4.8446,
      latitude: 45.7512
    },
    role: 'C'
  },
  {
    id: 1755,
    dateHeure: new Date('2025-04-10T08:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 150,
      adresse: '49 cours Franklin Roosevelt, Lyon',
      longitude: 4.8553,
      latitude: 45.767
    },
    localisationArrivee: {
      id: 51,
      adresse: '50 montée Saint-Sébastien, Lyon',
      longitude: 4.8326,
      latitude: 45.7657
    },
    role: 'C'
  },
  {
    id: 1790,
    dateHeure: new Date('2025-05-25T19:00:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 7,
      adresse: '6 rue de Créqui, Lyon',
      longitude: 4.8444,
      latitude: 45.7572
    },
    localisationArrivee: {
      id: 142,
      adresse: '41 avenue du Point du Jour, Lyon',
      longitude: 4.8025,
      latitude: 45.748
    },
    role: 'C'
  },
  {
    id: 1950,
    dateHeure: new Date('2025-03-15T08:45:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 28,
      adresse: '27 rue de l’Université, Lyon',
      longitude: 4.8354,
      latitude: 45.7498
    },
    localisationArrivee: {
      id: 80,
      adresse: '29 place Gabriel Péri, Lyon',
      longitude: 4.8452,
      latitude: 45.7541
    },
    role: 'C'
  },
  {
    id: 2003,
    dateHeure: new Date('2025-01-04T09:30:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 93,
      adresse: '42 rue des Trois Maries, Lyon',
      longitude: 4.8267,
      latitude: 45.7619
    },
    localisationArrivee: {
      id: 6,
      adresse: '5 cours Lafayette, Lyon',
      longitude: 4.8585,
      latitude: 45.7633
    },
    role: 'C'
  },
  {
    id: 2048,
    dateHeure: new Date('2025-01-23T22:00:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 48,
      adresse: '47 avenue Félix Faure, Lyon',
      longitude: 4.8535,
      latitude: 45.7561
    },
    localisationArrivee: {
      id: 96,
      adresse: '45 quai Jean Moulin, Lyon',
      longitude: 4.8345,
      latitude: 45.7626
    },
    role: 'C'
  },
  {
    id: 2094,
    dateHeure: new Date('2025-02-06T15:00:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 10,
      adresse: '9 rue Édouard Herriot, Lyon',
      longitude: 4.8318,
      latitude: 45.7597
    },
    localisationArrivee: {
      id: 26,
      adresse: '25 quai Claude Bernard, Lyon',
      longitude: 4.836,
      latitude: 45.7524
    },
    role: 'C'
  },
  {
    id: 2178,
    dateHeure: new Date('2025-05-11T11:45:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 64,
      adresse: '13 place Carnot, Lyon',
      longitude: 4.8271,
      latitude: 45.7488
    },
    localisationArrivee: {
      id: 76,
      adresse: '25 quai Claude Bernard, Lyon',
      longitude: 4.836,
      latitude: 45.7524
    },
    role: 'C'
  },
  {
    id: 2254,
    dateHeure: new Date('2025-01-17T07:30:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 101,
      adresse: '50 montée Saint-Sébastien, Lyon',
      longitude: 4.8326,
      latitude: 45.7657
    },
    localisationArrivee: {
      id: 143,
      adresse: '42 rue des Trois Maries, Lyon',
      longitude: 4.8267,
      latitude: 45.7619
    },
    role: 'C'
  },
  {
    id: 2317,
    dateHeure: new Date('2025-04-16T18:15:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 123,
      adresse: '22 cours Vitton, Lyon',
      longitude: 4.8557,
      latitude: 45.7678
    },
    localisationArrivee: {
      id: 63,
      adresse: '12 rue Garibaldi, Lyon',
      longitude: 4.8446,
      latitude: 45.7512
    },
    role: 'C'
  },
  {
    id: 2359,
    dateHeure: new Date('2025-01-29T19:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 121,
      adresse: '20 avenue Maréchal de Saxe, Lyon',
      longitude: 4.8441,
      latitude: 45.7577
    },
    localisationArrivee: {
      id: 144,
      adresse: '43 place Sathonay, Lyon',
      longitude: 4.8302,
      latitude: 45.767
    },
    role: 'C'
  },
  {
    id: 2401,
    dateHeure: new Date('2025-05-09T08:45:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 106,
      adresse: '5 cours Lafayette, Lyon',
      longitude: 4.8585,
      latitude: 45.7633
    },
    localisationArrivee: {
      id: 81,
      adresse: '30 rue Sainte-Hélène, Lyon',
      longitude: 4.8295,
      latitude: 45.7565
    },
    role: 'C'
  },
  {
    id: 2459,
    dateHeure: new Date('2025-05-06T14:45:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 3,
      adresse: '2 rue de la République, Lyon',
      longitude: 4.8341,
      latitude: 45.7594
    },
    localisationArrivee: {
      id: 53,
      adresse: '2 rue de la République, Lyon',
      longitude: 4.8341,
      latitude: 45.7594
    },
    role: 'C'
  },
  {
    id: 2504,
    dateHeure: new Date('2025-05-29T20:00:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 49,
      adresse: '48 rue Bossuet, Lyon',
      longitude: 4.8493,
      latitude: 45.7576
    },
    localisationArrivee: {
      id: 28,
      adresse: '27 rue de l’Université, Lyon',
      longitude: 4.8354,
      latitude: 45.7498
    },
    role: 'C'
  },
  {
    id: 2508,
    dateHeure: new Date('2025-03-27T13:45:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 1,
      adresse: 'matteo',
      longitude: 0,
      latitude: 0
    },
    localisationArrivee: {
      id: 10,
      adresse: '9 rue Édouard Herriot, Lyon',
      longitude: 4.8318,
      latitude: 45.7597
    },
    role: 'C'
  },
  {
    id: 2601,
    dateHeure: new Date('2025-04-15T12:00:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 81,
      adresse: '30 rue Sainte-Hélène, Lyon',
      longitude: 4.8295,
      latitude: 45.7565
    },
    localisationArrivee: {
      id: 32,
      adresse: '31 rue Burdeau, Lyon',
      longitude: 4.8329,
      latitude: 45.769
    },
    role: 'C'
  },
  {
    id: 2607,
    dateHeure: new Date('2025-05-13T15:45:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 107,
      adresse: '6 rue de Créqui, Lyon',
      longitude: 4.8444,
      latitude: 45.7572
    },
    localisationArrivee: {
      id: 82,
      adresse: '31 rue Burdeau, Lyon',
      longitude: 4.8329,
      latitude: 45.769
    },
    role: 'C'
  },
  {
    id: 2621,
    dateHeure: new Date('2025-05-25T14:00:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 28,
      adresse: '27 rue de l’Université, Lyon',
      longitude: 4.8354,
      latitude: 45.7498
    },
    localisationArrivee: {
      id: 61,
      adresse: '10 quai du Rhône, Lyon',
      longitude: 4.8423,
      latitude: 45.7643
    },
    role: 'C'
  },
  {
    id: 2695,
    dateHeure: new Date('2025-05-08T09:45:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 148,
      adresse: '47 avenue Félix Faure, Lyon',
      longitude: 4.8535,
      latitude: 45.7561
    },
    localisationArrivee: {
      id: 15,
      adresse: '14 cours Gambetta, Lyon',
      longitude: 4.8433,
      latitude: 45.7481
    },
    role: 'C'
  },
  {
    id: 2715,
    dateHeure: new Date('2025-03-06T12:00:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 24,
      adresse: '23 rue Vendôme, Lyon',
      longitude: 4.8501,
      latitude: 45.7605
    },
    localisationArrivee: {
      id: 37,
      adresse: '36 rue des Capucins, Lyon',
      longitude: 4.8328,
      latitude: 45.7662
    },
    role: 'C'
  },
  {
    id: 2832,
    dateHeure: new Date('2025-04-02T12:00:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 41,
      adresse: '40 rue Bugeaud, Lyon',
      longitude: 4.8496,
      latitude: 45.7652
    },
    localisationArrivee: {
      id: 103,
      adresse: '2 rue de la République, Lyon',
      longitude: 4.8341,
      latitude: 45.7594
    },
    role: 'C'
  },
  {
    id: 2836,
    dateHeure: new Date('2025-05-28T19:30:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 110,
      adresse: '9 rue Édouard Herriot, Lyon',
      longitude: 4.8318,
      latitude: 45.7597
    },
    localisationArrivee: {
      id: 35,
      adresse: '34 rue Royale, Lyon',
      longitude: 4.8312,
      latitude: 45.7669
    },
    role: 'C'
  },
  {
    id: 2925,
    dateHeure: new Date('2025-02-28T21:15:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 39,
      adresse: '38 rue de Marseille, Lyon',
      longitude: 4.8388,
      latitude: 45.7513
    },
    localisationArrivee: {
      id: 105,
      adresse: '4 rue Victor Hugo, Lyon',
      longitude: 4.8299,
      latitude: 45.7535
    },
    role: 'C'
  },
  {
    id: 3107,
    dateHeure: new Date('2025-01-15T16:00:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 3,
      adresse: '2 rue de la République, Lyon',
      longitude: 4.8341,
      latitude: 45.7594
    },
    localisationArrivee: {
      id: 126,
      adresse: '25 quai Claude Bernard, Lyon',
      longitude: 4.836,
      latitude: 45.7524
    },
    role: 'C'
  },
  {
    id: 3209,
    dateHeure: new Date('2025-05-19T14:30:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 126,
      adresse: '25 quai Claude Bernard, Lyon',
      longitude: 4.836,
      latitude: 45.7524
    },
    localisationArrivee: {
      id: 41,
      adresse: '40 rue Bugeaud, Lyon',
      longitude: 4.8496,
      latitude: 45.7652
    },
    role: 'C'
  },
  {
    id: 3212,
    dateHeure: new Date('2025-05-15T22:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 52,
      adresse: '1 place Bellecour, Lyon',
      longitude: 4.832,
      latitude: 45.7578
    },
    localisationArrivee: {
      id: 96,
      adresse: '45 quai Jean Moulin, Lyon',
      longitude: 4.8345,
      latitude: 45.7626
    },
    role: 'C'
  },
  {
    id: 3430,
    dateHeure: new Date('2025-06-11T07:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 107,
      adresse: '6 rue de Créqui, Lyon',
      longitude: 4.8444,
      latitude: 45.7572
    },
    localisationArrivee: {
      id: 130,
      adresse: '29 place Gabriel Péri, Lyon',
      longitude: 4.8452,
      latitude: 45.7541
    },
    role: 'C'
  },
  {
    id: 3497,
    dateHeure: new Date('2025-01-24T22:00:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 118,
      adresse: '17 quai Romain Rolland, Lyon',
      longitude: 4.8273,
      latitude: 45.7648
    },
    localisationArrivee: {
      id: 114,
      adresse: '13 place Carnot, Lyon',
      longitude: 4.8271,
      latitude: 45.7488
    },
    role: 'C'
  },
  {
    id: 3508,
    dateHeure: new Date('2025-02-01T20:00:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 131,
      adresse: '30 rue Sainte-Hélène, Lyon',
      longitude: 4.8295,
      latitude: 45.7565
    },
    localisationArrivee: {
      id: 1,
      adresse: 'matteo',
      longitude: 0,
      latitude: 0
    },
    role: 'C'
  },
  {
    id: 3552,
    dateHeure: new Date('2025-06-13T18:45:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 143,
      adresse: '42 rue des Trois Maries, Lyon',
      longitude: 4.8267,
      latitude: 45.7619
    },
    localisationArrivee: {
      id: 62,
      adresse: '11 avenue Jean Jaurès, Lyon',
      longitude: 4.8427,
      latitude: 45.7395
    },
    role: 'C'
  },
  {
    id: 3556,
    dateHeure: new Date('2025-04-06T18:45:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 7,
      adresse: '6 rue de Créqui, Lyon',
      longitude: 4.8444,
      latitude: 45.7572
    },
    localisationArrivee: {
      id: 53,
      adresse: '2 rue de la République, Lyon',
      longitude: 4.8341,
      latitude: 45.7594
    },
    role: 'C'
  },
  {
    id: 3561,
    dateHeure: new Date('2025-01-07T15:00:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 128,
      adresse: '27 rue de l’Université, Lyon',
      longitude: 4.8354,
      latitude: 45.7498
    },
    localisationArrivee: {
      id: 62,
      adresse: '11 avenue Jean Jaurès, Lyon',
      longitude: 4.8427,
      latitude: 45.7395
    },
    role: 'C'
  },
  {
    id: 3657,
    dateHeure: new Date('2025-06-04T22:00:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 93,
      adresse: '42 rue des Trois Maries, Lyon',
      longitude: 4.8267,
      latitude: 45.7619
    },
    localisationArrivee: {
      id: 35,
      adresse: '34 rue Royale, Lyon',
      longitude: 4.8312,
      latitude: 45.7669
    },
    role: 'C'
  },
  {
    id: 3690,
    dateHeure: new Date('2025-06-04T15:45:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 131,
      adresse: '30 rue Sainte-Hélène, Lyon',
      longitude: 4.8295,
      latitude: 45.7565
    },
    localisationArrivee: {
      id: 127,
      adresse: '26 rue Montgolfier, Lyon',
      longitude: 4.848,
      latitude: 45.7711
    },
    role: 'C'
  },
  {
    id: 3718,
    dateHeure: new Date('2025-05-17T15:45:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 4,
      adresse: '3 quai Saint-Antoine, Lyon',
      longitude: 4.8287,
      latitude: 45.762
    },
    localisationArrivee: {
      id: 36,
      adresse: '35 cours Charlemagne, Lyon',
      longitude: 4.8231,
      latitude: 45.7403
    },
    role: 'C'
  },
  {
    id: 3795,
    dateHeure: new Date('2025-03-25T16:30:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 4,
      adresse: '3 quai Saint-Antoine, Lyon',
      longitude: 4.8287,
      latitude: 45.762
    },
    localisationArrivee: {
      id: 119,
      adresse: '18 rue Saint-Jean, Lyon',
      longitude: 4.8279,
      latitude: 45.7615
    },
    role: 'C'
  },
  {
    id: 3852,
    dateHeure: new Date('2025-06-01T20:00:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 78,
      adresse: '27 rue de l’Université, Lyon',
      longitude: 4.8354,
      latitude: 45.7498
    },
    localisationArrivee: {
      id: 139,
      adresse: '38 rue de Marseille, Lyon',
      longitude: 4.8388,
      latitude: 45.7513
    },
    role: 'C'
  },
  {
    id: 3872,
    dateHeure: new Date('2025-06-15T07:30:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 1,
      adresse: 'matteo',
      longitude: 0,
      latitude: 0
    },
    localisationArrivee: {
      id: 28,
      adresse: '27 rue de l’Université, Lyon',
      longitude: 4.8354,
      latitude: 45.7498
    },
    role: 'C'
  },
  {
    id: 3905,
    dateHeure: new Date('2025-03-25T11:45:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 12,
      adresse: '11 avenue Jean Jaurès, Lyon',
      longitude: 4.8427,
      latitude: 45.7395
    },
    localisationArrivee: {
      id: 6,
      adresse: '5 cours Lafayette, Lyon',
      longitude: 4.8585,
      latitude: 45.7633
    },
    role: 'C'
  },
  {
    id: 3911,
    dateHeure: new Date('2025-03-28T20:45:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 43,
      adresse: '42 rue des Trois Maries, Lyon',
      longitude: 4.8267,
      latitude: 45.7619
    },
    localisationArrivee: {
      id: 95,
      adresse: '44 rue Pierre Corneille, Lyon',
      longitude: 4.8474,
      latitude: 45.76
    },
    role: 'C'
  },
  {
    id: 3924,
    dateHeure: new Date('2025-05-23T16:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 62,
      adresse: '11 avenue Jean Jaurès, Lyon',
      longitude: 4.8427,
      latitude: 45.7395
    },
    localisationArrivee: {
      id: 21,
      adresse: '20 avenue Maréchal de Saxe, Lyon',
      longitude: 4.8441,
      latitude: 45.7577
    },
    role: 'C'
  },
  {
    id: 3980,
    dateHeure: new Date('2025-05-26T08:30:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 65,
      adresse: '14 cours Gambetta, Lyon',
      longitude: 4.8433,
      latitude: 45.7481
    },
    localisationArrivee: {
      id: 36,
      adresse: '35 cours Charlemagne, Lyon',
      longitude: 4.8231,
      latitude: 45.7403
    },
    role: 'C'
  },
  {
    id: 4042,
    dateHeure: new Date('2025-01-29T08:30:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 100,
      adresse: '49 cours Franklin Roosevelt, Lyon',
      longitude: 4.8553,
      latitude: 45.767
    },
    localisationArrivee: {
      id: 38,
      adresse: '37 place Voltaire, Lyon',
      longitude: 4.843,
      latitude: 45.752
    },
    role: 'C'
  },
  {
    id: 4052,
    dateHeure: new Date('2025-01-28T13:00:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 33,
      adresse: '32 rue du Président Édouard Herriot, Lyon',
      longitude: 4.8317,
      latitude: 45.7599
    },
    localisationArrivee: {
      id: 71,
      adresse: '20 avenue Maréchal de Saxe, Lyon',
      longitude: 4.8441,
      latitude: 45.7577
    },
    role: 'C'
  },
  {
    id: 4064,
    dateHeure: new Date('2025-04-04T21:15:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 93,
      adresse: '42 rue des Trois Maries, Lyon',
      longitude: 4.8267,
      latitude: 45.7619
    },
    localisationArrivee: {
      id: 82,
      adresse: '31 rue Burdeau, Lyon',
      longitude: 4.8329,
      latitude: 45.769
    },
    role: 'C'
  },
  {
    id: 4068,
    dateHeure: new Date('2025-06-04T08:45:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 55,
      adresse: '4 rue Victor Hugo, Lyon',
      longitude: 4.8299,
      latitude: 45.7535
    },
    localisationArrivee: {
      id: 67,
      adresse: '16 rue Paul Bert, Lyon',
      longitude: 4.8582,
      latitude: 45.7588
    },
    role: 'C'
  },
  {
    id: 4090,
    dateHeure: new Date('2025-01-10T16:30:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 82,
      adresse: '31 rue Burdeau, Lyon',
      longitude: 4.8329,
      latitude: 45.769
    },
    localisationArrivee: {
      id: 97,
      adresse: '46 rue Jean Jaurès, Lyon',
      longitude: 4.8429,
      latitude: 45.739
    },
    role: 'C'
  },
  {
    id: 4105,
    dateHeure: new Date('2025-05-10T09:30:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 76,
      adresse: '25 quai Claude Bernard, Lyon',
      longitude: 4.836,
      latitude: 45.7524
    },
    localisationArrivee: {
      id: 93,
      adresse: '42 rue des Trois Maries, Lyon',
      longitude: 4.8267,
      latitude: 45.7619
    },
    role: 'C'
  },
  {
    id: 4108,
    dateHeure: new Date('2025-01-15T18:45:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 133,
      adresse: '32 rue du Président Édouard Herriot, Lyon',
      longitude: 4.8317,
      latitude: 45.7599
    },
    localisationArrivee: {
      id: 26,
      adresse: '25 quai Claude Bernard, Lyon',
      longitude: 4.836,
      latitude: 45.7524
    },
    role: 'C'
  },
  {
    id: 4131,
    dateHeure: new Date('2025-05-12T19:30:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 49,
      adresse: '48 rue Bossuet, Lyon',
      longitude: 4.8493,
      latitude: 45.7576
    },
    localisationArrivee: {
      id: 134,
      adresse: '33 montée de la Grande-Côte, Lyon',
      longitude: 4.8305,
      latitude: 45.7666
    },
    role: 'C'
  },
  {
    id: 4184,
    dateHeure: new Date('2025-05-04T07:15:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 134,
      adresse: '33 montée de la Grande-Côte, Lyon',
      longitude: 4.8305,
      latitude: 45.7666
    },
    localisationArrivee: {
      id: 1,
      adresse: 'matteo',
      longitude: 0,
      latitude: 0
    },
    role: 'C'
  },
  {
    id: 4228,
    dateHeure: new Date('2025-04-10T13:00:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 146,
      adresse: '45 quai Jean Moulin, Lyon',
      longitude: 4.8345,
      latitude: 45.7626
    },
    localisationArrivee: {
      id: 106,
      adresse: '5 cours Lafayette, Lyon',
      longitude: 4.8585,
      latitude: 45.7633
    },
    role: 'C'
  },
  {
    id: 4252,
    dateHeure: new Date('2025-05-27T09:15:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 138,
      adresse: '37 place Voltaire, Lyon',
      longitude: 4.843,
      latitude: 45.752
    },
    localisationArrivee: {
      id: 98,
      adresse: '47 avenue Félix Faure, Lyon',
      longitude: 4.8535,
      latitude: 45.7561
    },
    role: 'C'
  },
  {
    id: 4304,
    dateHeure: new Date('2025-05-11T22:00:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 92,
      adresse: '41 avenue du Point du Jour, Lyon',
      longitude: 4.8025,
      latitude: 45.748
    },
    localisationArrivee: {
      id: 22,
      adresse: '21 rue Servient, Lyon',
      longitude: 4.8541,
      latitude: 45.7602
    },
    role: 'C'
  },
  {
    id: 4320,
    dateHeure: new Date('2025-03-19T08:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 68,
      adresse: '17 quai Romain Rolland, Lyon',
      longitude: 4.8273,
      latitude: 45.7648
    },
    localisationArrivee: {
      id: 9,
      adresse: '8 rue Mercière, Lyon',
      longitude: 4.8325,
      latitude: 45.7611
    },
    role: 'C'
  },
  {
    id: 4349,
    dateHeure: new Date('2025-03-20T10:45:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 29,
      adresse: '28 cours de la Liberté, Lyon',
      longitude: 4.8413,
      latitude: 45.7559
    },
    localisationArrivee: {
      id: 16,
      adresse: '15 rue Duguesclin, Lyon',
      longitude: 4.8459,
      latitude: 45.7603
    },
    role: 'C'
  },
  {
    id: 4375,
    dateHeure: new Date('2025-02-06T17:00:00'),
    nombrePlaces: 4,
    localisationDepart: {
      id: 145,
      adresse: '44 rue Pierre Corneille, Lyon',
      longitude: 4.8474,
      latitude: 45.76
    },
    localisationArrivee: {
      id: 87,
      adresse: '36 rue des Capucins, Lyon',
      longitude: 4.8328,
      latitude: 45.7662
    },
    role: 'C'
  },
  {
    id: 4502,
    dateHeure: new Date('2025-04-24T15:45:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 13,
      adresse: '12 rue Garibaldi, Lyon',
      longitude: 4.8446,
      latitude: 45.7512
    },
    localisationArrivee: {
      id: 11,
      adresse: '10 quai du Rhône, Lyon',
      longitude: 4.8423,
      latitude: 45.7643
    },
    role: 'C'
  },
  {
    id: 4527,
    dateHeure: new Date('2025-01-27T09:30:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 84,
      adresse: '33 montée de la Grande-Côte, Lyon',
      longitude: 4.8305,
      latitude: 45.7666
    },
    localisationArrivee: {
      id: 51,
      adresse: '50 montée Saint-Sébastien, Lyon',
      longitude: 4.8326,
      latitude: 45.7657
    },
    role: 'C'
  },
  {
    id: 4615,
    dateHeure: new Date('2025-06-12T13:45:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 122,
      adresse: '21 rue Servient, Lyon',
      longitude: 4.8541,
      latitude: 45.7602
    },
    localisationArrivee: {
      id: 107,
      adresse: '6 rue de Créqui, Lyon',
      longitude: 4.8444,
      latitude: 45.7572
    },
    role: 'C'
  },
  {
    id: 4668,
    dateHeure: new Date('2025-02-26T14:00:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 147,
      adresse: '46 rue Jean Jaurès, Lyon',
      longitude: 4.8429,
      latitude: 45.739
    },
    localisationArrivee: {
      id: 38,
      adresse: '37 place Voltaire, Lyon',
      longitude: 4.843,
      latitude: 45.752
    },
    role: 'C'
  },
  {
    id: 4720,
    dateHeure: new Date('2025-06-02T19:30:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 127,
      adresse: '26 rue Montgolfier, Lyon',
      longitude: 4.848,
      latitude: 45.7711
    },
    localisationArrivee: {
      id: 36,
      adresse: '35 cours Charlemagne, Lyon',
      longitude: 4.8231,
      latitude: 45.7403
    },
    role: 'C'
  },
  {
    id: 4755,
    dateHeure: new Date('2025-05-24T09:45:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 70,
      adresse: '19 rue des Marronniers, Lyon',
      longitude: 4.832,
      latitude: 45.759
    },
    localisationArrivee: {
      id: 47,
      adresse: '46 rue Jean Jaurès, Lyon',
      longitude: 4.8429,
      latitude: 45.739
    },
    role: 'C'
  },
  {
    id: 4778,
    dateHeure: new Date('2025-05-24T17:15:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 22,
      adresse: '21 rue Servient, Lyon',
      longitude: 4.8541,
      latitude: 45.7602
    },
    localisationArrivee: {
      id: 105,
      adresse: '4 rue Victor Hugo, Lyon',
      longitude: 4.8299,
      latitude: 45.7535
    },
    role: 'C'
  },
  {
    id: 4785,
    dateHeure: new Date('2025-06-14T07:15:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 106,
      adresse: '5 cours Lafayette, Lyon',
      longitude: 4.8585,
      latitude: 45.7633
    },
    localisationArrivee: {
      id: 108,
      adresse: '7 place des Terreaux, Lyon',
      longitude: 4.8347,
      latitude: 45.7674
    },
    role: 'C'
  },
  {
    id: 4870,
    dateHeure: new Date('2025-01-15T06:45:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 99,
      adresse: '48 rue Bossuet, Lyon',
      longitude: 4.8493,
      latitude: 45.7576
    },
    localisationArrivee: {
      id: 15,
      adresse: '14 cours Gambetta, Lyon',
      longitude: 4.8433,
      latitude: 45.7481
    },
    role: 'C'
  },
  {
    id: 4957,
    dateHeure: new Date('2025-02-10T09:00:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 12,
      adresse: '11 avenue Jean Jaurès, Lyon',
      longitude: 4.8427,
      latitude: 45.7395
    },
    localisationArrivee: {
      id: 38,
      adresse: '37 place Voltaire, Lyon',
      longitude: 4.843,
      latitude: 45.752
    },
    role: 'C'
  },
  {
    id: 4983,
    dateHeure: new Date('2025-02-07T06:30:00'),
    nombrePlaces: 3,
    localisationDepart: {
      id: 32,
      adresse: '31 rue Burdeau, Lyon',
      longitude: 4.8329,
      latitude: 45.769
    },
    localisationArrivee: {
      id: 120,
      adresse: '19 rue des Marronniers, Lyon',
      longitude: 4.832,
      latitude: 45.759
    },
    role: 'C'
  },
  {
    id: 4990,
    dateHeure: new Date('2025-05-31T08:00:00'),
    nombrePlaces: 2,
    localisationDepart: {
      id: 20,
      adresse: '19 rue des Marronniers, Lyon',
      longitude: 4.832,
      latitude: 45.759
    },
    localisationArrivee: {
      id: 1,
      adresse: 'matteo',
      longitude: 0,
      latitude: 0
    },
    role: 'C'
  },
  {
    id: 5097,
    dateHeure: new Date('2025-06-06T10:15:00'),
    nombrePlaces: 5,
    localisationDepart: {
      id: 141,
      adresse: '40 rue Bugeaud, Lyon',
      longitude: 4.8496,
      latitude: 45.7652
    },
    localisationArrivee: {
      id: 12,
      adresse: '11 avenue Jean Jaurès, Lyon',
      longitude: 4.8427,
      latitude: 45.7395
    },
    role: 'C'
  }
];