# My Task Manager Ionic

Ce projet est un gestionnaire de tâches développé avec Ionic.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js : [Télécharger Node.js](https://nodejs.org)
- Ionic CLI : Exécutez la commande `npm install -g @ionic/cli` pour installer Ionic CLI

## Installation

1. Accédez au répertoire du projet :

   ```bash
   cd MyTaskManagerIonic
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

## Démarrage

Pour lancer le serveur JSON, exécutez la commande suivante :

```bash
npm run start-json-server
```

Pour lancer l'application, exécutez la commande suivante :

```bash
ionic serve
```

## Fonctionnalités

- Créer une tâche
- Supprimer une tâche
- Marquer une tâche comme validée ou invalidée (observable)

- Interdire l'ajout d'une tâche vide Grace au plugin:

  **"Dialog" de capacitor**
