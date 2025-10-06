# 🎮 Pokédex Team Builder

Une application web moderne et complète construite avec Next.js 15 pour créer et partager votre équipe Pokémon idéale.

![Pokédex Team Builder](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Fonctionnalités

- 🔍 **Recherche & Filtres** - Recherchez des Pokémon par nom (français) ou numéro et filtrez par type
- 🌍 **Toutes les Générations** - Accédez aux 1010+ Pokémon de la Génération 1 à 9
- 👥 **Team Builder** - Créez des équipes de 6 Pokémon maximum
- 📊 **Statistiques Détaillées** - Visualisez les stats complètes avec barres de progression colorées
- 🔄 **Chaînes d'Évolution** - Explorez les évolutions (pré, suivantes, méga)
- 🌓 **Mode Sombre** - Thèmes clair et sombre avec détection système
- 📱 **Design Responsive** - Interface parfaite sur tous les appareils
- 🔗 **Partage d'Équipes** - Générez des URLs et QR codes partageables
- 💾 **Sauvegarde Auto** - Équipes sauvegardées automatiquement en localStorage
- ⚡ **Rapide & Optimisé** - Construit avec Next.js 15 App Router + Turbopack
- 🎨 **Interface Élégante** - Composants shadcn/ui avec couleurs officielles des types
- ✨ **Animations Fluides** - Animations avec Framer Motion
- 🇫🇷 **100% Français** - Interface et données en français via API Tyradex

## 🚀 Stack Technique

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router + Turbopack)
- **Langage**: [TypeScript](https://www.typescriptlang.org/) (Mode strict)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Composants UI**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (avec persistence)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **API**: [Tyradex](https://tyradex.vercel.app/) (API française complète)
- **QR Codes**: [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- **Thème**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/pokemon-team-builder.git
cd pokemon-team-builder
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
pokemon-team-builder/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Layout components (Header, Footer)
│   ├── hero/                # Hero section
│   ├── pokemon/             # Pokémon-related components
│   │   ├── PokemonCard.tsx
│   │   ├── PokemonGrid.tsx
│   │   ├── PokemonSearch.tsx
│   │   ├── PokemonFilters.tsx
│   │   └── PokemonDetailModal.tsx
│   └── team/                # Team management components
│       ├── TeamSidebar.tsx
│       ├── TeamMemberCard.tsx
│       ├── TeamActions.tsx
│       └── ShareTeamModal.tsx
├── lib/                     # Utility functions
│   ├── api/                 # API calls
│   │   └── pokemon.ts
│   ├── stores/              # Zustand stores
│   │   └── teamStore.ts
│   ├── utils.ts             # Helper functions
│   └── constants.ts         # Constants (types, colors)
├── types/                   # TypeScript types
│   ├── pokemon.ts
│   └── team.ts
└── hooks/                   # Custom React hooks
    ├── usePokemon.ts
    └── useLocalStorage.ts
```

## 🎯 Key Features Explained

### Team Management

- Add up to 6 Pokémon to your team
- Remove Pokémon with confirmation dialog
- Clear entire team with one click
- Teams persist in localStorage

### Pokémon Details

- High-quality official artwork
- Complete stat breakdown with visual bars
- Full evolution chains
- Pokémon descriptions and info
- Height, weight, and abilities

### Sharing

- Generate shareable URLs with team IDs
- QR code generation for easy mobile sharing
- Teams load automatically from URL parameters

### Search & Filters

- Real-time search with debouncing
- Filter by any Pokémon type
- Combine multiple filters
- Empty states with helpful messages

## 🎨 Design Features

- **Type Colors**: Each Pokémon type has a unique color
- **Smooth Animations**: Page transitions and hover effects
- **Loading States**: Skeleton screens while data loads
- **Responsive Layout**: Mobile-first design
- **Dark Mode**: System preference detection + manual toggle

## 🔌 Intégration API

Cette application utilise l'[API Tyradex](https://tyradex.vercel.app/) :

- ✅ **1010+ Pokémon** disponibles (Générations 1 à 9)
- ✅ **Noms en français** pour tous les Pokémon et types
- ✅ **Images haute qualité** (sprites réguliers + shiny)
- ✅ **Statistiques complètes** (PV, Attaque, Défense, Att. Spé., Déf. Spé., Vitesse)
- ✅ **Évolutions détaillées** (pré-évolutions, évolutions suivantes, méga-évolutions)
- ✅ **Informations complètes** (talents, résistances, catégorie, taille, poids)
- ✅ **Données de reproduction** (groupes d'œufs, ratio mâle/femelle, taux de capture)

### Endpoints utilisés :

```typescript
GET https://tyradex.vercel.app/api/v1/pokemon        // Tous les Pokémon
GET https://tyradex.vercel.app/api/v1/pokemon/{id}   // Pokémon par ID
GET https://tyradex.vercel.app/api/v1/gen/{gen}      // Par génération
GET https://tyradex.vercel.app/api/v1/types          // Liste des types
```

## 🎨 Fonctionnalités Détaillées

### 📊 Modal Détails Pokémon

**Onglet Statistiques** :
- Barres de progression avec gradient de couleur
- Total des statistiques calculé
- Couleurs : Rouge (faible) → Jaune (moyen) → Vert (fort)

**Onglet Évolutions** :
- Affichage des pré-évolutions
- Pokémon actuel mis en surbrillance
- Évolutions suivantes avec conditions
- Méga-évolutions avec orbes
- Images cliquables pour navigation

**Onglet Détails** :
- Accordion avec 4 sections :
  1. **Informations** : Catégorie, génération, taille, poids
  2. **Talents** : Liste avec badge TC pour talents cachés
  3. **Résistances** : Grille colorée par multiplicateur
  4. **Reproduction** : Groupes d'œufs, sexe, taux de capture

### 🎯 Filtres Avancés

- **Par type** : Multi-sélection avec badges colorés
- **Par génération** : Select avec 9 générations (1-1010+)
- **Recherche** : Par nom français ou numéro de Pokédex
- **Tri** : Par numéro, nom A→Z, ou stats totales

### 🔗 Partage d'Équipe

- **URL partageable** : `https://app.com?team=25,6,3,94,130,149`
- **QR Code** : Généré automatiquement avec niveau de correction élevé
- **Copie en un clic** : Bouton avec feedback visuel
- **Chargement auto** : L'équipe se charge depuis l'URL

## 🚢 Déploiement

### Vercel (Recommandé)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/pokemon-team-builder)

1. Poussez votre code sur GitHub
2. Importez le projet sur Vercel
3. Déployez !

### Autres Plateformes

Compatible avec toutes les plateformes supportant Next.js :
- Netlify
- Railway
- Render
- AWS Amplify

## 📝 Licence

Ce projet est open source sous licence [MIT License](LICENSE).

## 🙏 Crédits

- **Données Pokémon** : [Tyradex](https://tyradex.vercel.app/) - API française complète
- **Composants UI** : [shadcn/ui](https://ui.shadcn.com/)
- **Framework** : [Next.js](https://nextjs.org/)
- **Icônes** : [Lucide](https://lucide.dev/)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/SuperFeature`)
3. Commit vos changements (`git commit -m 'Ajout SuperFeature'`)
4. Push sur la branche (`git push origin feature/SuperFeature`)
5. Ouvrir une Pull Request

## 📧 Contact

Pour toute question, ouvrez une issue sur GitHub.

---

Construit avec ❤️ et ⚡ pour les fans de Pokémon 🎮
