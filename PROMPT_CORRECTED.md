# 🎮 Projet : Pokédex Team Builder avec API Tyradex

Crée une application Next.js 15 complète pour constituer et gérer des équipes Pokémon en français.

## ⚠️ RÈGLES CRITIQUES DE GESTION DES DONNÉES

**IMPORTANT** : L'API Tyradex peut retourner des données null ou undefined. Tu DOIS :

1. **Toujours utiliser l'optional chaining** (`?.`) pour accéder aux tableaux :
   - ✅ `pokemon.types?.map(...)`
   - ❌ `pokemon.types.map(...)`

2. **Ajouter des vérifications null dans les filtres** :
   ```typescript
   // CORRECT
   const matchTypes = !filters.types?.length ||
     filters.types.some(type =>
       p.types?.some(t => t.name === type) // ← Utiliser ?.some()
     );

   // INCORRECT
   p.types.some(...) // ← Peut crasher si types est null
   ```

3. **Utiliser des clés uniques robustes dans les listes** :
   - ✅ `key={index}` ou `key={\`${id}-${index}\`}`
   - ❌ `key={id}` seul (peut avoir des doublons)

## 📦 Stack Technique

- Next.js 15 (App Router + Turbopack)
- TypeScript (mode strict)
- Tailwind CSS v4
- shadcn/ui
- Zustand (state management avec persistence)
- Framer Motion
- **API Tyradex** (https://tyradex.vercel.app/api/v1)
- qrcode.react
- Sonner (toasts)

## 🌐 API Tyradex - Endpoints

```typescript
GET /pokemon        // Tous les Pokémon (1010+)
GET /pokemon/{id}   // Pokémon par ID
GET /gen/{gen}      // Par génération (1-9)
GET /types          // Liste des types
```

## 📝 Types TypeScript SÉCURISÉS

```typescript
// types/tyradex.ts
export interface TyradexPokemon {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string;
  };
  types: Array<{    // ← Peut être null !
    name: string;
    image: string;
  }> | null;        // ← AJOUTER | null
  talents: Array<{
    name: string;
    tc: boolean;
  }>;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
  resistances: Array<{
    name: string;
    multiplier: number;
  }>;
  evolution: {
    pre?: Array<{
      pokedex_id: number;
      name: string;
      condition?: string;
    }>;
    next?: Array<{
      pokedex_id: number;
      name: string;
      condition?: string;
    }>;
    mega?: Array<{
      orbe: string;
      sprites: {
        regular: string;
        shiny: string;
      };
    }>;
  } | null;
  height: string;
  weight: string;
  egg_groups: string[] | null;
  sexe: {
    male: number;
    female: number;
  } | null;
  catch_rate: number;
  level_100: number;
  formes: any | null;
}

export interface TeamMember {
  pokemon: TyradexPokemon;
  addedAt: string;
  slot: number; // 0-5
}

export interface Team {
  members: TeamMember[];
  name?: string;
  createdAt: string;
  updatedAt: string;
}
```

## 🛡️ Fonctions API SÉCURISÉES

```typescript
// lib/api/pokemon.ts
export function filterPokemon(
  pokemon: TyradexPokemon[],
  filters: {
    search?: string;
    types?: string[];
    generation?: number;
  }
): TyradexPokemon[] {
  return pokemon.filter(p => {
    // ✅ Vérification null sur name
    const matchSearch = !filters.search ||
      p.name?.fr?.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.pokedex_id.toString().includes(filters.search);

    // ✅ Double optional chaining sur types
    const matchTypes = !filters.types?.length ||
      filters.types.some(type =>
        p.types?.some(t => t.name.toLowerCase() === type.toLowerCase())
      );

    const matchGen = !filters.generation ||
      p.generation === filters.generation;

    return matchSearch && matchTypes && matchGen;
  });
}
```

## 🎨 Composants SÉCURISÉS

### PokemonCard.tsx
```typescript
// ✅ CORRECT - Optional chaining partout
<div className="flex flex-wrap justify-center gap-2">
  {pokemon.types?.map((type) => (
    <Badge key={type.name}>
      {type.name}
    </Badge>
  ))}
</div>
```

### TeamSidebar.tsx
```typescript
// ✅ CORRECT - Clé unique avec index
{team.map((member, index) => (
  <TeamMemberCard
    key={`${member.pokemon.pokedex_id}-${index}`}
    member={member}
  />
))}
```

### TeamMemberCard.tsx
```typescript
// ✅ CORRECT - Optional chaining + index dans la clé
{pokemon.types?.slice(0, 2).map((type, index) => (
  <Badge key={`${type.name}-${index}`}>
    {type.name}
  </Badge>
))}
```

## 🎯 Checklist de Sécurité TypeScript

Avant de considérer le code terminé, vérifie :

- [ ] Tous les `.map()` sur `types` utilisent `?.map()`
- [ ] Tous les `.some()` sur `types` utilisent `?.some()`
- [ ] Tous les `.filter()` vérifient null avant d'accéder aux propriétés
- [ ] Toutes les clés dans les `.map()` incluent l'index ou sont garanties uniques
- [ ] Aucune erreur "Cannot read properties of null" dans la console
- [ ] Aucune erreur "Each child should have a unique key" dans la console
- [ ] Le build production réussit : `npm run build`
- [ ] Aucune erreur TypeScript stricte

## 🚀 Installation et Démarrage

```bash
npx create-next-app@latest pokemon-team-builder --typescript --tailwind --app
cd pokemon-team-builder

# shadcn/ui
npx shadcn@latest init -y
npx shadcn@latest add button card input select badge dialog tabs skeleton switch avatar dropdown-menu separator alert-dialog scroll-area accordion sheet command popover progress -y

# Dépendances
npm install zustand qrcode.react framer-motion next-themes sonner

# Types
npm install -D @types/qrcode.react

# Démarrer
npm run dev
```

## ✨ Fonctionnalités à Implémenter

1. **Recherche & Filtres** (avec gestion null)
   - Recherche par nom français ou numéro
   - Filtre multi-types avec badges cliquables
   - Filtre par génération (1-9)

2. **Gestion d'Équipe** (max 6, avec slots vides)
   - Ajout/retrait de Pokémon
   - Sauvegarde automatique localStorage
   - Affichage 6 slots (remplis + vides)

3. **Modal Détails** (3 onglets)
   - **Statistiques** : Barres de progression colorées
   - **Évolutions** : Pré, actuel, suivantes, méga
   - **Détails** : Accordion (Infos, Talents, Résistances, Reproduction)

4. **Partage QR Code**
   - Génération URL : `?team=1,25,6`
   - QR Code avec qrcode.react
   - Bouton copier avec feedback

5. **Mode Sombre**
   - Détection système
   - Toggle manuel
   - Thème persistant

6. **Animations Framer Motion**
   - Stagger sur la grille
   - Fade-in sur les modals
   - Hover effects

7. **Sauvegarde localStorage**
   - Zustand persist middleware
   - Équipe sauvegardée auto

8. **Chargement depuis URL**
   - Parse `?team=1,25,6`
   - Fetch des Pokémon
   - Affichage automatique

## 📋 Structure des Fichiers

```
pokemon-team-builder/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css (couleurs types Pokémon)
├── components/
│   ├── ui/ (shadcn auto-générés)
│   ├── layout/ (Header, Footer, ThemeToggle)
│   ├── hero/ (HeroSection)
│   ├── pokemon/ (Card, Grid, Search, Filters, DetailModal)
│   └── team/ (Sidebar, MemberCard, Actions, ShareModal)
├── lib/
│   ├── api/pokemon.ts (avec gestion null)
│   ├── stores/teamStore.ts
│   ├── constants.ts
│   └── utils.ts
├── types/
│   └── tyradex.ts (avec | null sur types)
└── hooks/
    └── useLocalStorage.ts
```

## 🎨 Couleurs Types Pokémon (globals.css)

```css
/* Pokemon Type Colors */
.type-normal { @apply bg-[#A8A878] text-white; }
.type-feu { @apply bg-[#F08030] text-white; }
.type-eau { @apply bg-[#6890F0] text-white; }
.type-plante { @apply bg-[#78C850] text-white; }
.type-electrik { @apply bg-[#F8D030] text-gray-900; }
.type-glace { @apply bg-[#98D8D8] text-gray-900; }
.type-combat { @apply bg-[#C03028] text-white; }
.type-poison { @apply bg-[#A040A0] text-white; }
.type-sol { @apply bg-[#E0C068] text-gray-900; }
.type-vol { @apply bg-[#A890F0] text-white; }
.type-psy { @apply bg-[#F85888] text-white; }
.type-insecte { @apply bg-[#A8B820] text-white; }
.type-roche { @apply bg-[#B8A038] text-white; }
.type-spectre { @apply bg-[#705898] text-white; }
.type-dragon { @apply bg-[#7038F8] text-white; }
.type-tenebres { @apply bg-[#705848] text-white; }
.type-acier { @apply bg-[#B8B8D0] text-gray-900; }
.type-fee { @apply bg-[#EE99AC] text-white; }
```

## ⚠️ Pièges Courants à Éviter

1. ❌ Oublier `?.` sur `pokemon.types.map()`
2. ❌ Utiliser `pokemon.id` au lieu de `pokemon.pokedex_id`
3. ❌ Oublier `unoptimized` sur les Image de Tyradex
4. ❌ Ne pas gérer les cas où `types` est null dans les filtres
5. ❌ Utiliser des clés non-uniques dans les listes
6. ❌ Oublier `lang="fr"` dans le layout.tsx

## ✅ Tests de Validation

Avant de dire "terminé" :
- [ ] L'app charge sans erreur console
- [ ] On peut ajouter/retirer des Pokémon
- [ ] Les filtres fonctionnent (type + génération)
- [ ] Le modal détails s'ouvre correctement
- [ ] Le partage génère un QR code
- [ ] Le build production réussit
- [ ] Aucune erreur TypeScript
- [ ] Responsive mobile/desktop
- [ ] Mode sombre fonctionne

---

**NE COMMENCE PAS** avant d'avoir bien compris ces règles de gestion des données null !
