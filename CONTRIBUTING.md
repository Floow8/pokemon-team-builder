# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer au **Pokédex Team Builder** ! Ce guide vous aidera à démarrer.

---

## 🚀 Démarrage Rapide

### 1. Fork & Clone
```bash
# Fork le projet sur GitHub, puis :
git clone https://github.com/VOTRE-USERNAME/pokemon-team-builder.git
cd pokemon-team-builder
```

### 2. Installation
```bash
npm install
```

### 3. Créer une branche
```bash
git checkout -b feature/ma-super-fonctionnalite
```

### 4. Développer
```bash
npm run dev
```

### 5. Tester
```bash
npm run build        # Vérifier que le build passe
npm run lint         # Vérifier ESLint
npx tsc --noEmit     # Vérifier TypeScript
```

### 6. Commit & Push
```bash
git add .
git commit -m "feat: Ajout de ma super fonctionnalité"
git push origin feature/ma-super-fonctionnalite
```

### 7. Pull Request
Ouvrir une PR sur GitHub avec une description claire des changements.

---

## 📝 Standards de Code

### TypeScript
- ✅ **Mode strict activé** : Respecter les types stricts
- ✅ **Optional chaining** : Toujours utiliser `?.` pour les propriétés nullables
- ✅ **Pas de `any`** : Typer explicitement toutes les variables
- ✅ **Interfaces explicites** : Créer des interfaces pour les props

**Exemple** :
```typescript
// ❌ Mauvais
function addPokemon(pokemon: any) {
  pokemon.types.map(t => t.name);
}

// ✅ Bon
function addPokemon(pokemon: TyradexPokemon) {
  pokemon.types?.map(t => t.name);
}
```

### React
- ✅ **Functional Components** : Pas de class components
- ✅ **Hooks** : Utiliser les hooks React modernes
- ✅ **Client Components** : Ajouter `'use client'` quand nécessaire
- ✅ **Props TypeScript** : Typer toutes les props avec des interfaces

**Exemple** :
```typescript
// ✅ Bon
interface PokemonCardProps {
  pokemon: TyradexPokemon;
  onAdd?: (pokemon: TyradexPokemon) => void;
}

export function PokemonCard({ pokemon, onAdd }: PokemonCardProps) {
  // ...
}
```

### Styling
- ✅ **Tailwind CSS** : Utiliser les classes Tailwind
- ✅ **shadcn/ui** : Réutiliser les composants existants
- ✅ **Responsive** : Toujours penser mobile-first
- ✅ **Dark Mode** : Tester les deux thèmes

**Exemple** :
```tsx
// ✅ Bon
<div className="flex items-center gap-2 p-4 rounded-lg bg-card hover:bg-accent dark:bg-card-dark">
  {/* Contenu */}
</div>
```

### Nommage
- ✅ **Fichiers** : PascalCase pour les composants (`PokemonCard.tsx`)
- ✅ **Fonctions** : camelCase (`getPokemonById`)
- ✅ **Constantes** : UPPER_SNAKE_CASE (`MAX_TEAM_SIZE`)
- ✅ **Types** : PascalCase (`TyradexPokemon`)

---

## 🛠️ Architecture

### Structure des Dossiers
```
app/            # Next.js App Router
components/     # Composants React
  ui/          # shadcn/ui components
  layout/      # Layout components
  pokemon/     # Pokemon-specific components
  team/        # Team management components
lib/           # Utilities
  api/         # API calls
  stores/      # State management (Zustand)
types/         # TypeScript types
```

### Ajout d'un Nouveau Composant
1. Créer le fichier dans le bon dossier
2. Ajouter `'use client'` si nécessaire
3. Typer les props avec une interface
4. Utiliser les composants shadcn/ui
5. Ajouter les animations Framer Motion si pertinent

**Template** :
```tsx
'use client';

import { ComponentProps } from '@/types/components';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface MonComposantProps {
  title: string;
  onClick: () => void;
}

export function MonComposant({ title, onClick }: MonComposantProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Button onClick={onClick}>{title}</Button>
    </motion.div>
  );
}
```

---

## 🔒 Règles de Sécurité

### Gestion des Données Null
**CRITIQUE** : L'API Tyradex peut retourner `null` pour certains champs.

✅ **Règles à suivre** :
1. Toujours utiliser `?.` sur les tableaux : `pokemon.types?.map(...)`
2. Vérifier null dans les filtres : `p.types?.some(...)`
3. Utiliser des fallbacks : `{data?.map(...) || <Fallback />}`
4. Marquer les types comme nullable : `types: Array<...> | null`

**Exemple complet** :
```typescript
// ✅ Sécurisé
{pokemon.types?.map((type, index) => (
  <Badge key={`${type.name}-${index}`}>
    {type.name}
  </Badge>
)) || <p>Aucun type disponible</p>}
```

### Clés Uniques
Toujours utiliser des clés uniques dans les `.map()` :
```tsx
// ❌ Mauvais
{items.map(item => <div key={item.id}>...</div>)}

// ✅ Bon (si risque de doublons)
{items.map((item, index) => <div key={`${item.id}-${index}`}>...</div>)}
```

---

## 🧪 Tests

### Avant de Soumettre
Vérifier que :
- [ ] Le build réussit : `npm run build`
- [ ] Aucune erreur TypeScript : `npx tsc --noEmit`
- [ ] Aucune erreur ESLint : `npm run lint`
- [ ] L'application démarre : `npm run dev`
- [ ] Pas d'erreurs dans la console
- [ ] Responsive mobile/desktop
- [ ] Mode sombre fonctionne

### Tests Manuels
1. **Recherche** : Tester avec différents termes
2. **Filtres** : Combiner types et générations
3. **Équipe** : Ajouter/retirer des Pokémon
4. **Modal** : Vérifier les 3 onglets
5. **Partage** : Copier l'URL et tester le chargement
6. **Thème** : Basculer entre clair/sombre

---

## 📦 Ajout de Dépendances

### Avant d'Ajouter
1. Vérifier si une solution existe déjà
2. Évaluer la taille du bundle
3. Vérifier la maintenance du package
4. Documenter pourquoi c'est nécessaire

### Commande
```bash
npm install package-name
npm install -D package-name  # Pour les devDependencies
```

---

## 🐛 Signaler un Bug

### Template d'Issue
```markdown
**Description**
Une description claire du bug.

**Reproduction**
1. Aller sur '...'
2. Cliquer sur '...'
3. Voir l'erreur

**Comportement Attendu**
Ce qui devrait se passer.

**Captures d'Écran**
Si applicable, ajouter des captures.

**Environnement**
- OS: [ex: macOS]
- Navigateur: [ex: Chrome 120]
- Version: [ex: 1.0.0]
```

---

## 💡 Proposer une Fonctionnalité

### Template d'Issue
```markdown
**Problème**
Quel problème cette fonctionnalité résout-elle ?

**Solution Proposée**
Comment implémenter cette fonctionnalité ?

**Alternatives**
Quelles autres solutions avez-vous envisagées ?

**Contexte Additionnel**
Toute autre information utile.
```

---

## 📋 Conventions de Commit

### Format
```
type(scope): description courte

[description longue optionnelle]

[footer optionnel]
```

### Types
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage (pas de changement de code)
- `refactor`: Refactorisation
- `test`: Ajout de tests
- `chore`: Maintenance

### Exemples
```bash
feat(team): Ajouter le drag & drop pour réorganiser l'équipe
fix(api): Corriger la gestion des types null dans filterPokemon
docs(readme): Mettre à jour les instructions d'installation
style(card): Améliorer le design de PokemonCard
refactor(store): Simplifier la logique de teamStore
```

---

## 🎯 Priorités de Contribution

### 🔥 High Priority
- Corrections de bugs critiques
- Problèmes de sécurité
- Amélioration des performances
- Accessibilité (a11y)

### 🌟 Medium Priority
- Nouvelles fonctionnalités
- Amélioration UX/UI
- Documentation
- Refactorisation

### 💭 Low Priority
- Optimisations mineures
- Nettoyage de code
- Commentaires supplémentaires

---

## 🏆 Reconnaissance

Les contributeurs sont listés dans le README. Merci pour votre contribution ! 🙏

---

## 📧 Contact

Questions ? Ouvrez une **Discussion** sur GitHub ou contactez les mainteneurs.

---

**Merci de contribuer à Pokédex Team Builder ! ⚡🎮**
