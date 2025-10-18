# Guide d'Installation - pxt-drone-edu

## 🚀 Publier sur GitHub (5 minutes)

### Étape 1 : Créer le repo sur GitHub

1. Allez sur : https://github.com/new
2. Remplissez :
   - **Repository name** : `pxt-drone-edu`
   - **Description** : `Extension MakeCode pour pilotage de drones avec simulateur intégré`
   - **Visibilité** : ✅ **Public** (obligatoire pour MakeCode)
   - **NE PAS cocher** "Add a README file" (déjà créé)
   - **NE PAS cocher** "Add .gitignore" (déjà créé)
   - **NE PAS cocher** "Choose a license" (déjà créé)
3. Cliquez sur **Create repository**

### Étape 2 : Pousser le code

Après avoir créé le repo, GitHub affichera une URL. Utilisez-la :

```bash
cd "/Users/macbook/Documents/badr/ai-msm-media-v2/swisstransfer_d36b7460-928f-4901-8ffb-e3e881203feb 2/scratch-gui/pxt-drone-edu"

# Remplacer VOTRE-USERNAME par votre nom d'utilisateur GitHub
git remote add origin https://github.com/VOTRE-USERNAME/pxt-drone-edu.git
git branch -M main
git push -u origin main
```

**Exemple** : Si votre username est `badr123`, la commande sera :

```bash
git remote add origin https://github.com/badr123/pxt-drone-edu.git
git push -u origin main
```

### Étape 3 : Vérifier

Allez sur votre repo : `https://github.com/VOTRE-USERNAME/pxt-drone-edu`

Vous devriez voir tous les fichiers !

---

## 🎮 Ajouter l'extension dans MakeCode

### Dans MakeCode local (http://localhost:8601/makecode/)

1. **Ouvrir MakeCode** : http://localhost:8601/makecode/
2. **Cliquer sur Extensions** (⚙️ en bas à gauche)
3. **Coller l'URL** :
   ```
   https://github.com/VOTRE-USERNAME/pxt-drone-edu
   ```
4. **Cliquer sur la carte** de l'extension
5. **L'extension est installée !** ✅

### Dans MakeCode en ligne (makecode.microbit.org)

1. **Ouvrir** : https://makecode.microbit.org
2. **Cliquer sur Extensions** (⚙️)
3. **Coller l'URL** :
   ```
   https://github.com/VOTRE-USERNAME/pxt-drone-edu
   ```
4. **Cliquer sur la carte**
5. **L'extension est installée !** ✅

---

## 🧪 Tester l'extension

### Premier test

1. Dans MakeCode, cherchez les blocs **Drone** (catégorie bleue)
2. Glissez ces blocs :

```blocks
drone.décoller()
drone.attendre(2000)
drone.atterrir()
```

3. **Cliquez sur "Run"** (▶️)
4. Le simulateur devrait afficher le drone qui décolle et atterrit !

### Test avancé

```blocks
drone.décoller()
drone.attendre(1000)
drone.aller à position X 2 Y 0 altitude 1 vitesse 1
drone.attendre(3000)
drone.aller à position X 0 Y 0 altitude 1 vitesse 1
drone.attendre(3000)
drone.atterrir()
```

---

## 📚 Exemples

Les exemples sont dans le dossier `examples/` :

- `mission-basic.ts` - Mission de base
- `pattern-square.ts` - Vol en carré
- `mission-with-wind.ts` - Gestion du vent

Pour les utiliser :

1. Dans MakeCode, cliquer sur **Projects** → **Import File**
2. Choisir un fichier `.ts` du dossier `examples/`
3. Cliquer sur **Run**

---

## 🐛 Dépannage

### L'extension ne s'installe pas

**Problème** : MakeCode ne trouve pas l'extension

**Solutions** :

1. Vérifier que le repo GitHub est **Public**
2. Vérifier que l'URL est correcte (sans `.git` à la fin)
3. Attendre quelques secondes après la publication sur GitHub
4. Rafraîchir la page MakeCode (Ctrl+Shift+R)

### Les blocs n'apparaissent pas

**Problème** : L'extension est installée mais pas de blocs

**Solutions** :

1. Rafraîchir la page (Ctrl+Shift+R)
2. Vérifier la console (F12) pour les erreurs
3. Réinstaller l'extension

### Le simulateur ne fonctionne pas

**Problème** : Le simulateur ne s'affiche pas

**Solutions** :

1. Vérifier que le navigateur supporte Canvas
2. Ouvrir la console (F12) pour voir les erreurs
3. Vérifier que `sim/engine.ts` et `sim/view.ts` sont bien dans le repo

---

## 📞 Support

- **Issues** : https://github.com/VOTRE-USERNAME/pxt-drone-edu/issues
- **Email** : support@msm-medias.com

---

**Version** : 0.1.0  
**Date** : Octobre 2024
