# Guide de Contribution

Merci de votre intérêt pour contribuer à pxt-drone-edu !

## 🚀 Comment contribuer

### 1. Fork et Clone

```bash
# Fork le projet sur GitHub
# Puis clonez votre fork
git clone https://github.com/votre-username/pxt-drone-edu.git
cd pxt-drone-edu
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Créer une branche

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

### 4. Faire vos modifications

-   Écrire du code propre et commenté
-   Ajouter des tests pour les nouvelles fonctionnalités
-   Mettre à jour la documentation si nécessaire

### 5. Tester

```bash
npm test
```

### 6. Commiter

```bash
git add .
git commit -m "feat: ajouter ma nouvelle fonctionnalité"
```

### 7. Pousser et créer une PR

```bash
git push origin feature/ma-nouvelle-fonctionnalite
# Créer une Pull Request sur GitHub
```

## 📝 Standards de code

### TypeScript

-   Utiliser TypeScript strict mode
-   Ajouter des types explicites
-   Commenter avec JSDoc

### Nommage

-   **Fonctions** : camelCase (`takeOff`, `setThrottle`)
-   **Classes** : PascalCase (`DroneState`, `PhysicsEngine`)
-   **Constantes** : UPPER_SNAKE_CASE (`MAX_TILT`, `GRAVITY`)

### Documentation

```typescript
/**
 * Fait décoller le drone
 * @param altitude altitude cible en mètres
 */
export function takeOff(altitude: number): void {
    // ...
}
```

## 🧪 Tests

### Écrire des tests

```typescript
// test/my-test.ts
export function testMyFeature() {
    // Arrange
    drone.init();

    // Act
    drone.takeOff();

    // Assert
    const altitude = drone.getAltitude();
    console.assert(altitude > 0, "Le drone doit décoller");
}
```

### Lancer les tests

```bash
npm test
```

## 📚 Documentation

### Mise à jour du README

-   Ajouter les nouvelles fonctionnalités
-   Mettre à jour les exemples
-   Ajouter des captures d'écran si pertinent

### Mise à jour du QUICKSTART

-   Ajouter des exercices pour les nouvelles fonctionnalités
-   Mettre à jour les FAQ

## 🎯 Types de contributions

### Bug fixes

-   Créer une issue décrivant le bug
-   Proposer un fix avec tests
-   Documenter le fix

### Nouvelles fonctionnalités

-   Créer une issue décrivant la fonctionnalité
-   Discuter de l'approche
-   Implémenter avec tests et documentation

### Amélioration de la documentation

-   Corriger les erreurs
-   Améliorer la clarté
-   Ajouter des exemples

### Optimisations

-   Améliorer les performances
-   Réduire la complexité
-   Améliorer la lisibilité

## 🔍 Code Review

### Checklist pour les reviewers

-   [ ] Le code compile sans erreurs
-   [ ] Les tests passent
-   [ ] La documentation est à jour
-   [ ] Le code suit les standards
-   [ ] Pas de code mort ou commenté
-   [ ] Les noms sont clairs

### Checklist pour les contributeurs

-   [ ] J'ai testé mon code
-   [ ] J'ai ajouté des tests
-   [ ] J'ai mis à jour la documentation
-   [ ] J'ai suivi les standards de code
-   [ ] J'ai commenté mon code

## 📞 Support

-   **Issues** : [GitHub Issues](https://github.com/votre-org/pxt-drone-edu/issues)
-   **Email** : dev@msm-medias.com
-   **Forum** : [MakeCode Forum](https://forum.makecode.com)

## 🎉 Merci !

Votre contribution est précieuse pour améliorer pxt-drone-edu !
