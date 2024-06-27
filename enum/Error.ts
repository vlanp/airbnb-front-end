enum EErrorFrench {
  UNKNOWN_LOAD_ERROR = "Impossible de charger le contenu de la page. Merci de réessayer ultérieurement",
  UNKNOWN_SIGN_ERROR = "Une erreur inconnue est survenue. Merci de réessayer ultérieurement",
  MISSING_PERMISSIONS = "Impossible de charger toutes les fonctionnalités car une permission est manquante",
}

enum EErrorEnglish {
  UNKNOWN_LOAD_ERROR = "Unable to load the page content. Please try again later",
  UNKNOWN_SIGN_ERROR = "An unknown error occured. Please try again later",
  MISSING_PERMISSIONS = "Unable to load all features because a permission is missing",
}

export { EErrorEnglish, EErrorFrench };
