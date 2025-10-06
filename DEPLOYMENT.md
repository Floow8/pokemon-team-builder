# 🚀 Guide de Déploiement

## Option 1 : Vercel (⭐ Recommandé)

### Méthode A : GitHub + Vercel (Automatique)

#### Étape 1 : Créer un Repository GitHub

**1.1 - Sur GitHub.com**
1. Va sur https://github.com/new
2. Nom du repo : `pokemon-team-builder`
3. Description : `Application Next.js pour créer et partager des équipes Pokémon`
4. Visibilité : Public ou Private
5. **NE PAS** cocher "Initialize this repository"
6. Clique sur "Create repository"

**1.2 - Dans ton terminal**
```bash
# Ajouter tous les fichiers
git add .

# Créer le commit initial
git commit -m "feat: Application Pokédex Team Builder complète

✨ Fonctionnalités
- Recherche et filtres Pokémon (1010+ Pokémon)
- Team Builder (max 6 Pokémon)
- Modal détails avec 3 onglets
- Partage d'équipe (URL + QR code)
- Mode sombre
- Sauvegarde localStorage

🔒 Sécurité
- Gestion complète des données null
- Optional chaining partout
- Types TypeScript stricts

📚 Documentation
- 8 fichiers de documentation
- Guides complets
- Prêt pour production

🚀 Tech Stack
- Next.js 15 + React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- Zustand + Framer Motion

✅ Status: Production Ready
"

# Configurer le remote (remplace TON-USERNAME)
git branch -M main
git remote add origin https://github.com/TON-USERNAME/pokemon-team-builder.git

# Pousser sur GitHub
git push -u origin main
```

#### Étape 2 : Déployer sur Vercel

**2.1 - Créer un compte Vercel**
1. Va sur https://vercel.com/signup
2. Clique sur "Continue with GitHub"
3. Autorise Vercel à accéder à ton compte GitHub

**2.2 - Importer le projet**
1. Sur le dashboard Vercel, clique sur "Add New..."
2. Sélectionne "Project"
3. Clique sur "Import" à côté de `pokemon-team-builder`

**2.3 - Configuration (Automatique)**
Vercel détecte automatiquement :
- ✅ Framework: Next.js
- ✅ Build Command: `next build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

**Laisse tout par défaut et clique sur "Deploy"**

**2.4 - Attendre le déploiement**
```
Building... ⏳ (~2 minutes)
✓ Build completed
✓ Deploying...
🎉 Deployed to https://pokemon-team-builder.vercel.app
```

#### Étape 3 : Visiter ton site

Ton application est maintenant en ligne ! 🎉
- URL principale : `https://pokemon-team-builder-[ton-id].vercel.app`
- HTTPS automatique ✅
- CDN global ✅
- Mises à jour automatiques à chaque push ✅

---

### Méthode B : Vercel CLI (Sans GitHub)

#### Étape 1 : Installer Vercel CLI
```bash
npm install -g vercel
```

#### Étape 2 : Se connecter
```bash
vercel login
```
Une page s'ouvre dans ton navigateur, connecte-toi.

#### Étape 3 : Déployer
```bash
# Depuis le dossier du projet
vercel
```

**Répondre aux questions :**
```
? Set up and deploy? [Y/n] Y
? Which scope? Ton compte (sélectionne avec les flèches)
? Link to existing project? [y/N] N
? What's your project's name? pokemon-team-builder
? In which directory is your code located? ./
? Want to override settings? [y/N] N
```

**Vercel va :**
1. ⬆️  Uploader les fichiers
2. 🔨 Builder l'application
3. 🚀 Déployer en production
4. 📋 Te donner l'URL

#### Étape 4 : Déploiement en Production
```bash
vercel --prod
```

**Résultat** : URL de production (stable) fournie !

---

## Option 2 : Netlify

### Étape 1 : Push sur GitHub
(Utilise les mêmes commandes que Vercel Méthode A, Étape 1)

### Étape 2 : Connecter Netlify

**2.1 - Créer un compte**
1. Va sur https://app.netlify.com/signup
2. Continue avec GitHub

**2.2 - Nouveau site**
1. Clique sur "Add new site"
2. Sélectionne "Import an existing project"
3. Clique sur "GitHub"
4. Autorise Netlify
5. Sélectionne ton repo `pokemon-team-builder`

**2.3 - Configuration**
```
Build command:       npm run build
Publish directory:   .next
```

**2.4 - Déployer**
Clique sur "Deploy site"

**Résultat** : `https://pokemon-team-builder-xyz.netlify.app`

---

## Option 3 : Railway

### Étape 1 : Push sur GitHub
(Même étape que précédemment)

### Étape 2 : Railway

**2.1 - Compte**
1. Va sur https://railway.app
2. Sign up avec GitHub

**2.2 - Nouveau projet**
1. Clique sur "New Project"
2. Sélectionne "Deploy from GitHub repo"
3. Choisis `pokemon-team-builder`

**2.3 - Configuration automatique**
Railway détecte Next.js automatiquement.

**2.4 - Déployer**
Clique sur "Deploy"

**Résultat** : URL fournie dans les settings

---

## Option 4 : Render

### Étape 1 : Push sur GitHub

### Étape 2 : Render

**2.1 - Compte**
https://dashboard.render.com/register

**2.2 - Nouveau service**
1. New → Static Site
2. Connect GitHub
3. Sélectionne ton repo

**2.3 - Configuration**
```
Build Command:    npm run build && npm run export
Publish Directory: out
```

**Note** : Render nécessite une configuration export pour les sites statiques.

---

## 🌐 Domaine Personnalisé

### Avec Vercel

**Étape 1 : Acheter un domaine**
- Namecheap, Google Domains, OVH, etc.
- Ex: `monpokedex.com`

**Étape 2 : Ajouter dans Vercel**
1. Projet → Settings → Domains
2. Clique sur "Add"
3. Entre ton domaine : `monpokedex.com`
4. Vercel te donne les enregistrements DNS

**Étape 3 : Configurer DNS**
Chez ton registrar (Namecheap, etc.) :
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

**Étape 4 : Attendre**
- Propagation DNS : 24-48h max
- HTTPS automatique après validation

**Résultat** : `https://monpokedex.com` 🎉

---

## 🔄 Mises à Jour Automatiques

### Avec Vercel + GitHub

Chaque fois que tu push du code :
```bash
git add .
git commit -m "feat: Nouvelle fonctionnalité"
git push
```

**Vercel va automatiquement :**
1. 🔍 Détecter le nouveau commit
2. 🔨 Rebuilder l'application
3. ✅ Tester le build
4. 🚀 Déployer en production
5. 📧 T'envoyer un email de confirmation

**Environnements :**
- `main` branch → Production (`pokemon-team-builder.vercel.app`)
- Autres branches → Preview (`pokemon-team-builder-git-feature.vercel.app`)

---

## 📊 Monitoring et Analytics

### Vercel Analytics (Gratuit)

**Activer Analytics**
1. Projet → Analytics
2. Enable Vercel Analytics

**Installation**
```bash
npm install @vercel/analytics
```

**Ajouter dans app/layout.tsx :**
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Redéployer :**
```bash
git add .
git commit -m "feat: Add Vercel Analytics"
git push
```

**Résultat** : Dashboard avec :
- Nombre de visiteurs
- Pages vues
- Temps de chargement
- Pays des visiteurs

---

## 🔒 Variables d'Environnement (Si Besoin)

**Pour ce projet** : Aucune variable requise ! 🎉
L'API Tyradex est publique.

**Mais pour l'avenir :**

### Dans Vercel
1. Projet → Settings → Environment Variables
2. Ajoute tes variables :
   - `API_KEY`: ta-clé-secrète
   - `DATABASE_URL`: url-database
3. Redéploie

### Dans le code
```tsx
// Accès aux variables
const apiKey = process.env.API_KEY;
```

---

## ✅ Checklist de Déploiement

### Avant de Déployer
- [x] Build réussit localement (`npm run build`)
- [x] Aucune erreur TypeScript
- [x] Aucune erreur console
- [x] Tests manuels OK
- [x] Mode sombre fonctionne
- [x] Responsive OK

### Après le Déploiement
- [ ] Visiter l'URL de production
- [ ] Tester toutes les fonctionnalités
- [ ] Vérifier le responsive mobile
- [ ] Tester le partage d'équipe
- [ ] Vérifier le chargement depuis URL
- [ ] Tester le QR code
- [ ] Partager avec des amis ! 🎉

---

## 🐛 Dépannage

### Build échoue sur Vercel

**Erreur : Module not found**
```bash
# Localement, vérifier que le build passe
npm run build

# Si OK, vérifier package.json
# Toutes les dépendances en "dependencies", pas "devDependencies"
```

**Erreur : Out of memory**
```bash
# Ajouter dans package.json
"scripts": {
  "build": "NODE_OPTIONS='--max_old_space_size=4096' next build"
}
```

### Site en ligne mais erreurs

**Ouvrir la console**
1. F12 sur le site
2. Onglet Console
3. Regarder les erreurs

**Logs Vercel**
1. Dashboard Vercel
2. Ton projet
3. Deployments
4. Cliquer sur le dernier déploiement
5. Voir les logs

---

## 📈 Optimisations Post-Déploiement

### 1. Edge Functions
Vercel optimise automatiquement avec Edge Functions.

### 2. Image Optimization
Next.js optimise les images automatiquement.

### 3. Caching
Vercel configure le cache automatiquement.

**Résultat** : Performance optimale sans configuration ! ⚡

---

## 🎉 Félicitations !

Ton application est maintenant en ligne et accessible dans le monde entier ! 🌍

**Prochaines étapes** :
1. Partage l'URL avec tes amis
2. Partage sur Twitter/LinkedIn
3. Ajoute-la à ton portfolio
4. Continue à améliorer l'app

---

## 📚 Ressources

- **Documentation Vercel** : https://vercel.com/docs
- **Next.js Deployment** : https://nextjs.org/docs/deployment
- **Vercel CLI** : https://vercel.com/docs/cli

---

**Bon déploiement ! 🚀**
