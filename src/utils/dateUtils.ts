export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  const jours = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi'
  ];

  const mois = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre'
  ];

  const jourSemaine = jours[date.getDay()];
  const jourMois = date.getDate();
  const nomMois = mois[date.getMonth()];

  return `${jourSemaine} ${jourMois} ${nomMois}`;
};

// Fonction pour vérifier si une date est aujourd'hui
export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Fonction pour vérifier si une date est demain
export const isTomorrow = (dateString: string): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(dateString);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

// Fonction qui retourne "Aujourd'hui" ou "Demain" si la date correspond
export const getRelativeDate = (dateString: string): string => {
  if (isToday(dateString)) return "Aujourd'hui";
  if (isTomorrow(dateString)) return "Demain";
  return formatDate(dateString);
};

// Fonction pour formater l'heure en format 24h
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  // format « 08:00 » en FR
  return date.toLocaleTimeString('fr-FR', {
    hour:   '2-digit',
    minute: '2-digit'
  });
};
