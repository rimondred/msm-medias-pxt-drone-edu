# Guide de Démarrage Rapide - 5 Minutes

Guide pour les enseignants : Comment utiliser pxt-drone-edu en classe

## 🎯 Objectif

Apprendre le pilotage de drones de manière sécurisée avec un simulateur intégré.

## ⚡ Installation (2 minutes)

### Étape 1 : Ouvrir MakeCode

1. Aller sur [makecode.microbit.org](https://makecode.microbit.org)
2. Cliquer sur **Nouveau projet**

### Étape 2 : Installer l'extension

1. Cliquer sur **Extensions** (⚙️ en bas)
2. Coller l'URL : `https://github.com/votre-org/pxt-drone-edu`
3. Cliquer sur **Rechercher**
4. L'extension est installée ! ✅

## 🚁 Premier Vol (3 minutes)

### Exercice 1 : Décollage et atterrissage

```typescript
// Cliquer sur le bloc "décoller"
drone.takeOff();

// Attendre 2 secondes
drone.wait(2000);

// Cliquer sur le bloc "atterrir"
drone.land();
```

**Résultat attendu** : Le drone décolle, monte, et atterrit.

### Exercice 2 : Vol vers une position

```typescript
drone.takeOff();
drone.wait(2000);

// Aller à 2m devant
drone.goTo(2, 0, 1, 1);

// Attendre l'arrivée
drone.wait(3000);

// Revenir
drone.goTo(0, 0, 1, 1);
drone.wait(3000);

drone.land();
```

**Résultat attendu** : Le drone vole en avant, puis revient.

## 📚 Activités pédagogiques

### Niveau 1 : Débutant (30 minutes)

**Objectif** : Comprendre les commandes de base

1. **Décollage/Atterrissage**

    - Faire décoller le drone
    - Attendre 3 secondes
    - Faire atterrir

2. **Contrôle du throttle**

    - Décoller
    - Augmenter la puissance à 80%
    - Attendre 2 secondes
    - Réduire à 40%
    - Attendre 2 secondes
    - Atterrir

3. **Contrôle de l'orientation**
    - Décoller
    - Incliner à 15° (roll)
    - Attendre 2 secondes
    - Stabiliser
    - Atterrir

### Niveau 2 : Intermédiaire (45 minutes)

**Objectif** : Programmer des missions simples

1. **Mission : Carré**

    - Décoller à 1m d'altitude
    - Voler en formant un carré de 2m de côté
    - Atterrir

2. **Mission : Navigation**

    - Décoller
    - Aller au point (3m, 2m)
    - Revenir au point de départ
    - Atterrir

3. **Mission : Exploration**
    - Décoller
    - Explorer une zone de 5m × 5m
    - Revenir au point de départ
    - Atterrir

### Niveau 3 : Avancé (60 minutes)

**Objectif** : Gérer les perturbations

1. **Mission : Avec vent**

    - Voler sans vent
    - Activer le vent (2 m/s)
    - Observer le drift
    - Compenser le vent manuellement

2. **Mission : Optimisation**

    - Trouver la vitesse optimale
    - Minimiser la consommation de batterie
    - Maximiser la stabilité

3. **Mission : Événements**
    - Utiliser les événements "décollage" et "atterrissage"
    - Afficher des messages à chaque étape
    - Logger les données de vol

## 🎓 Compétences développées

### STEM

-   **Science** : Physique du vol, forces aérodynamiques
-   **Technologie** : Programmation, simulation
-   **Engineering** : Contrôle, PID, optimisation
-   **Math** : Géométrie, trigonométrie, coordonnées

### Compétences transversales

-   **Logique** : Séquencement, conditions
-   **Résolution de problèmes** : Debugging, optimisation
-   **Collaboration** : Travail en équipe
-   **Créativité** : Design de missions

## 🛠️ Ressources pédagogiques

### Fiches d'activités

-   [Fiche 1 : Décollage et atterrissage](docs/activity-takeoff-land.pdf)
-   [Fiche 2 : Navigation](docs/activity-navigation.pdf)
-   [Fiche 3 : Pattern de vol](docs/activity-patterns.pdf)
-   [Fiche 4 : Gestion du vent](docs/activity-wind.pdf)

### Vidéos

-   [Tutoriel 1 : Installation](https://youtube.com/watch?v=...)
-   [Tutoriel 2 : Premier vol](https://youtube.com/watch?v=...)
-   [Tutoriel 3 : Missions](https://youtube.com/watch?v=...)

### Projets

-   [Projet 1 : Course de drones](docs/project-race.pdf)
-   [Projet 2 : Livraison](docs/project-delivery.pdf)
-   [Projet 3 : Surveillance](docs/project-surveillance.pdf)

## ❓ FAQ

### Q: Le simulateur ne se lance pas

**R:** Vérifier que :

1. L'extension est bien installée
2. Le navigateur est à jour
3. JavaScript est activé

### Q: Le drone ne décolle pas

**R:** Vérifier que :

1. Le throttle est > 50%
2. Le drone n'est pas en mode sécurité
3. La batterie n'est pas vide

### Q: Le drone dérive

**R:** C'est normal ! Le simulateur inclut :

1. Du vent (configurable)
2. De la turbulence
3. Des imperfections

**Solution** : Compenser avec `setRPY()` ou `goTo()`

### Q: Comment sauvegarder les missions ?

**R:**

1. Cliquer sur **Télécharger** (💾)
2. Le fichier `.hex` est sauvegardé
3. Recharger via **Importer**

### Q: Peut-on utiliser un vrai drone ?

**R:** Oui ! (Semaine 2)

1. Connecter un ESP32
2. Flasher le firmware
3. Utiliser les mêmes blocs

## 📊 Évaluation

### Critères d'évaluation

-   **Code** : Clarté, organisation, commentaires
-   **Mission** : Réalisation, respect des contraintes
-   **Physique** : Compréhension des forces
-   **Optimisation** : Efficacité, consommation

### Grille d'évaluation

| Critère      | Excellent | Bien | Suffisant | Insuffisant |
| ------------ | --------- | ---- | --------- | ----------- |
| Code         | 4         | 3    | 2         | 1           |
| Mission      | 4         | 3    | 2         | 1           |
| Physique     | 4         | 3    | 2         | 1           |
| Optimisation | 4         | 3    | 2         | 1           |

## 🎉 Prochaines étapes

1. **Semaine 1** : Simulateur (actuel)
2. **Semaine 2** : Vrai drone ESP32
3. **Semaine 3** : Missions avancées
4. **Semaine 4** : Projet final

## 📞 Support

-   **Email** : support@msm-medias.com
-   **Forum** : [MakeCode Forum](https://forum.makecode.com)
-   **GitHub** : [Issues](https://github.com/votre-org/pxt-drone-edu/issues)

---

**Version** : 0.1.0  
**Dernière mise à jour** : Octobre 2024  
**Temps de lecture** : 5 minutes
