# ⚡ Guide de Démarrage Rapide

## 🚀 Installation en 3 étapes

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer le serveur de développement
```bash
npm run dev
```

### 3. Ouvrir l'application
Naviguer vers [http://localhost:3000](http://localhost:3000)

---

## 🎯 Utilisation Basique

### Rechercher un Pokémon
1. Utiliser la barre de recherche en haut de la page
2. Taper le nom français ou le numéro du Pokémon (ex: "Pikachu" ou "25")
3. Les résultats s'affichent en temps réel

### Filtrer par Type
1. Cliquer sur un ou plusieurs badges de type (Feu, Eau, Plante, etc.)
2. Seuls les Pokémon correspondants s'affichent
3. Cliquer à nouveau pour retirer le filtre

### Filtrer par Génération
1. Utiliser le menu déroulant "Génération"
2. Sélectionner une génération (1 à 9)
3. Voir les Pokémon de cette génération

### Créer une Équipe
1. Cliquer sur "Ajouter" sous un Pokémon
2. Le Pokémon apparaît dans la sidebar à droite
3. Maximum 6 Pokémon par équipe

### Voir les Détails
1. Cliquer sur l'icône ℹ️ sur une carte Pokémon
2. Explorer les 3 onglets :
   - **Statistiques** : Barres de stats colorées
   - **Évolutions** : Chaîne d'évolution complète
   - **Détails** : Talents, résistances, reproduction

### Partager une Équipe
1. Créer une équipe de 1 à 6 Pokémon
2. Cliquer sur "Partager l'équipe"
3. Copier l'URL ou scanner le QR code
4. L'équipe se chargera automatiquement pour vos amis

---

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev              # Lancer le serveur (port 3000)

# Build & Production
npm run build            # Créer le build optimisé
npm run start            # Lancer le serveur de production

# Qualité du code
npm run lint             # Vérifier les erreurs ESLint
npx tsc --noEmit         # Vérifier les erreurs TypeScript
```

---

## 🎨 Personnalisation

### Changer le Thème
- Cliquer sur l'icône 🌓 dans le header
- Choisir entre Clair, Sombre, ou Système

### Modifier les Couleurs des Types
Éditer `app/globals.css` :
```css
.type-feu { @apply bg-[#F08030] text-white; }
```

### Ajouter un Nouveau Type de Filtre
1. Ajouter la constante dans `lib/constants.ts`
2. Créer le composant de filtre
3. Mettre à jour `filterPokemon()` dans `lib/api/pokemon.ts`

---

## 🐛 Dépannage

### L'application ne démarre pas
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreurs de build
```bash
# Nettoyer le cache Next.js
rm -rf .next
npm run build
```

### Les Pokémon ne s'affichent pas
- Vérifier la connexion internet (l'API Tyradex doit être accessible)
- Vérifier la console du navigateur pour les erreurs
- Essayer de recharger la page (Ctrl/Cmd + R)

### Le localStorage ne fonctionne pas
- Vérifier que les cookies/localStorage ne sont pas bloqués
- Vider le cache du navigateur
- Essayer en navigation privée

---

## 📚 Ressources Supplémentaires

- 📖 **Documentation complète** : Voir [README.md](./README.md)
- 🛡️ **Corrections de sécurité** : Voir [CORRECTIONS_SECURITE.md](./CORRECTIONS_SECURITE.md)
- 🌐 **API Tyradex** : https://tyradex.vercel.app/
- 💬 **Signaler un bug** : Ouvrir une issue sur GitHub

---

## ✨ Fonctionnalités Avancées

### Chargement d'Équipe depuis URL
```
http://localhost:3000?team=25,6,3,94,130,149
```
Remplacer les numéros par les IDs Pokédex de votre choix

### Utiliser le QR Code
1. Partager l'équipe pour générer le QR code
2. Scanner avec un smartphone
3. L'équipe se charge automatiquement

### Navigation dans les Évolutions
1. Ouvrir les détails d'un Pokémon
2. Aller dans l'onglet "Évolutions"
3. Cliquer sur une pré-évolution ou évolution suivante
4. La modal se met à jour automatiquement

---

**Bon amusement ! 🎮⚡**
