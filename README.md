# pxt-drone-edu

Extension pédagogique MakeCode pour apprendre le pilotage de drones avec simulateur intégré.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![MakeCode](https://img.shields.io/badge/MakeCode-ready-orange.svg)

## 🚁 Vue d'ensemble

Cette extension permet d'apprendre le pilotage de drones de manière sécurisée grâce à un simulateur intégré. Les élèves peuvent programmer des missions de vol en utilisant des blocs visuels simples, sans avoir besoin d'un drone physique.

### Caractéristiques

-   ✅ **Simulateur intégré** : Physique réaliste avec moteur à 50 Hz
-   ✅ **Blocs visuels** : Interface MakeCode intuitive
-   ✅ **Sécurité** : Auto-cut si inclinaison > 80° ou batterie faible
-   ✅ **Pédagogique** : Variables en unités SI (m, m/s, deg/s)
-   ✅ **Exemples** : Missions pré-configurées pour démarrer
-   ✅ **Vent simulé** : Apprendre à compenser les perturbations

## 📦 Installation

### Méthode 1 : Via MakeCode (recommandé)

1. Ouvrir [MakeCode micro:bit](https://makecode.microbit.org)
2. Cliquer sur **Extensions** (⚙️)
3. Coller l'URL : `https://github.com/votre-org/pxt-drone-edu`
4. L'extension est installée !

### Méthode 2 : Build local

```bash
# Cloner le repo
git clone https://github.com/votre-org/pxt-drone-edu
cd pxt-drone-edu

# Installer les dépendances
npm install

# Build
npm run build
```

## 🎮 Utilisation

### Premier vol

```typescript
// Décoller
drone.takeOff();

// Attendre 2 secondes
drone.wait(2000);

// Atterrir
drone.land();
```

### Vol vers une position

```typescript
// Aller à la position (2m, 1m, 1m) à 1 m/s
drone.goTo(2, 1, 1, 1);

// Attendre l'arrivée
drone.wait(3000);
```

### Contrôle manuel

```typescript
// Définir la puissance
drone.setThrottle(60); // 60%

// Définir l'orientation
drone.setRPY(10, 0, 0); // Roulis 10°, Tangage 0°, Lacet 0°
```

## 📚 Blocs disponibles

### Contrôle de vol

-   `décoller` : Fait décoller le drone
-   `atterrir` : Fait atterrir le drone
-   `définir puissance %pourcentage` : Contrôle le throttle (0-100%)
-   `définir orientation roulis %r tangage %t lacet %l` : Contrôle l'attitude

### Navigation

-   `aller à position X %x Y %y altitude %z vitesse %v` : Va à une position
-   `attendre %ms ms` : Attend un délai

### Capteurs

-   `altitude` : Retourne l'altitude actuelle (m)
-   `batterie` : Retourne le niveau de batterie (%)
-   `position X` : Retourne la position X (m)
-   `position Y` : Retourne la position Y (m)

### Configuration

-   `définir vent X %x Y %y` : Définit les conditions de vent
-   `définir masse %masse g` : Définit la masse du drone
-   `définir inclinaison max %angle°` : Limite l'inclinaison maximale

### Événements

-   `quand événement %event` : Gestionnaire d'événements
    -   `décollage` : Déclenché après le décollage
    -   `atterrissage` : Déclenché après l'atterrissage
    -   `mission terminée` : Déclenché à la fin de la mission

## 🎓 Exemples

### Mission 1 : Vol basique

```typescript
drone.takeOff();
drone.wait(2000);
drone.goTo(2, 0, 1, 1);
drone.wait(3000);
drone.goTo(0, 0, 1, 1);
drone.wait(3000);
drone.land();
```

### Mission 2 : Pattern en carré

```typescript
const altitude = 1;
const cote = 2;

drone.takeOff();
drone.wait(2000);

// Carré
drone.goTo(cote, 0, altitude, 1);
drone.wait(3000);
drone.goTo(cote, cote, altitude, 1);
drone.wait(3000);
drone.goTo(0, cote, altitude, 1);
drone.wait(3000);
drone.goTo(0, 0, altitude, 1);
drone.wait(3000);

drone.land();
```

### Mission 3 : Avec gestion du vent

```typescript
// Sans vent
drone.setWind(0, 0);
drone.takeOff();
drone.goTo(2, 0, 1, 1);
drone.wait(3000);
drone.land();

// Avec vent
drone.setWind(2, 0); // Vent de 2 m/s en X
drone.takeOff();
drone.goTo(2, 0, 1, 1);
drone.wait(3000);

// Compensation
drone.setRPY(0, -10, 0); // Incliner contre le vent
drone.wait(1000);

drone.land();
```

## 🔬 Modèle physique

Le simulateur utilise un modèle physique simplifié avec :

-   **Intégration Euler** à 50 Hz
-   **Forces** : Portance, gravité, traînée
-   **Dynamique** : Roll, pitch, yaw avec amortissement
-   **Limites** : Inclinaison max, taux de rotation max
-   **Batterie** : Consommation basée sur le throttle
-   **Sécurité** : Auto-cut si conditions dangereuses

### Paramètres par défaut

-   Masse : 250g
-   Inclinaison max : 45°
-   Batterie : 850 mAh (4.2V → 3.4V)
-   Gravité : 9.81 m/s²
-   Coefficient de traînée : 0.1
-   Coefficient de portance : 0.5

## 🛡️ Sécurité

### Auto-cut automatique

Le simulateur coupe automatiquement le moteur si :

-   Inclinaison > 80° (roll ou pitch)
-   Batterie < 3.4V
-   Altitude < 0 (au sol)

### Limites de sécurité

-   Throttle : 0-100%
-   Roll/Pitch : -90° à +90°
-   Yaw : -180° à +180°
-   Position : Contrainte au sol (z ≥ 0)

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests spécifiques
npm test -- test/physics.test.ts
```

### Tests physiques

-   ✅ Montée verticale : Throttle 60% → z≈1m en 2-4s
-   ✅ Auto-cut : Tilt > 80° → moteur coupé
-   ✅ Vent : Drift mesurable et compensable
-   ✅ Batterie : Consommation réaliste

## 🚀 Déploiement

### Version locale

```bash
# Build
npm run build

# Tester localement
pxt serve
```

### Version production

```bash
# Créer une release
git tag v0.1.0
git push origin v0.1.0

# Publier sur npm (optionnel)
npm publish
```

## 📖 Documentation pour enseignants

Voir [QUICKSTART.md](QUICKSTART.md) pour un guide de démarrage rapide (5 minutes).

## 🗺️ Roadmap

### Semaine 1 (Actuel)

-   ✅ Blocs de base
-   ✅ Simulateur intégré
-   ✅ Exemples de missions
-   ✅ Documentation

### Semaine 2 (À venir)

-   ⏳ Support ESP32
-   ⏳ Communication MSP/CRSF
-   ⏳ Exemples réels
-   ⏳ Export CSV logs

### Semaine 3 (Future)

-   ⏳ Support micro:bit via UART
-   ⏳ Bluetooth LE
-   ⏳ Mode multi-drones

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md).

### Structure du projet

```
pxt-drone-edu/
├── main.ts              # API publique (blocs)
├── shims.d.ts           # Types TypeScript
├── pxt.json             # Configuration
├── sim/
│   ├── engine.ts        # Moteur physique
│   └── view.ts          # Rendu Canvas
├── examples/            # Exemples de missions
├── test/               # Tests unitaires
└── README.md           # Documentation
```

## 📝 Licence

MIT License - Voir [LICENSE](LICENSE)

## 👥 Auteurs

-   **Équipe MSM Medias** - _Développement initial_

## 🙏 Remerciements

-   MakeCode Team pour le framework
-   Communauté micro:bit pour les retours
-   Enseignants pour les tests en classe

## 📞 Support

-   **Issues** : [GitHub Issues](https://github.com/votre-org/pxt-drone-edu/issues)
-   **Email** : support@msm-medias.com
-   **Forum** : [MakeCode Forum](https://forum.makecode.com)

---

**Version** : 0.1.0  
**Dernière mise à jour** : Octobre 2024
