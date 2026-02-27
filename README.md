# Zen Value — Guide de prise en main

## Structure du projet

```
zenvalue/
├── index.html                   ← Page principale (ne pas modifier)
├── admin/
│   └── index.html               ← Interface d'administration custom
├── assets/
│   ├── css/                     ← Styles (ne pas modifier sans dev)
│   │   ├── tokens.css           ← Couleurs et variables charte
│   │   ├── layout.css           ← Structure et grilles
│   │   ├── components.css       ← Boutons, cards, etc.
│   │   ├── navigation.css       ← Nav et footer
│   │   ├── animations.css       ← Effets au scroll
│   │   └── forms.css            ← Formulaire contact
│   └── js/                      ← Scripts (ne pas modifier sans dev)
│       ├── theme-loader.js      ← Charge et applique le thème
│       ├── cms-loader.js        ← Charge les JSON dans le HTML
│       ├── router.js
│       ├── animations.js
│       └── nav.js
└── content/                     ← ✅ CONTENU MODIFIABLE VIA LE CMS
    ├── settings/
    │   ├── global.json          ← Email, adresse, LinkedIn, copyright
    │   ├── theme.json           ← Thème graphique (couleurs, police, style)
    │   ├── resultats.json       ← Les 4 chiffres clés
    │   └── users.json           ← Comptes utilisateurs admin (géré via l'admin)
    └── pages/
        ├── accueil.json         ← Tagline, sous-titre, stats
        ├── qui-sommes-nous.json ← Discours, vision, histoire
        ├── offres.json          ← 4 offres de service
        ├── cas-clients.json     ← 4 cas clients + résultats
        ├── principes.json       ← 7 principes fondateurs
        ├── formation.json       ← Textes page formation
        ├── recrutement.json     ← Engagements, profils, processus
        └── rse.json             ← Axes, mesures concrètes
```

---

## Hébergement

Le site est publié via **GitHub Pages** depuis le dépôt `llmdev-ops/llmdev-ops.github.io`.
Aucun service tiers (Netlify, Vercel…) n'est nécessaire.

Le contenu est versionné dans Git. Chaque modification via l'admin crée automatiquement un commit sur la branche `main`, et le site se met à jour sous quelques secondes.

---

## Déploiement (une seule fois)

### Étape 1 — Activer GitHub Pages

1. Aller sur le dépôt GitHub → **Settings → Pages**
2. Source : **Deploy from a branch** → branche `main` → dossier `/` (root)
3. Cliquer **Save** — le site est en ligne sur `https://llmdev-ops.github.io`

### Étape 2 — Connecter un nom de domaine (optionnel)

1. Dans **Settings → Pages → Custom domain**, entrer `zenvalue.fr`
2. Chez votre registrar (OVH, Gandi…), créer un enregistrement DNS :
   - Type `CNAME` : `www` → `llmdev-ops.github.io`
   - ou Type `A` pointant vers les IPs GitHub Pages (185.199.108/109/110/111.153)
3. HTTPS automatique activé sous 24h ✅

---

## Accès à l'interface d'administration

L'interface est accessible sur : **`/admin`** (ex: `https://llmdev-ops.github.io/admin`)

### Premier lancement — Créer le compte administrateur

Au premier accès, l'interface affiche un formulaire de création de compte.
Vous devrez fournir :

| Champ | Valeur |
|---|---|
| **Nom** | Votre prénom et nom |
| **Email** | `prenom@zenvalue.fr` |
| **Mot de passe** | Choisissez un mot de passe solide |
| **Token GitHub** | Votre Personal Access Token (voir ci-dessous) |

#### Créer un Personal Access Token GitHub (PAT)

1. Se connecter sur [github.com](https://github.com) avec le compte propriétaire du dépôt
2. Aller dans **Settings → Developer settings → Personal access tokens → Tokens (classic)**
3. Cliquer **Generate new token (classic)**
4. Nom : `Zen Value Admin`
5. Expiration : selon vos préférences (90 jours, 1 an, ou sans expiration)
6. Cocher la permission **`repo`** (accès complet aux dépôts)
7. Cliquer **Generate token** — copier immédiatement le token (`ghp_…`)

> ⚠️ Le token ne s'affiche qu'une seule fois. Conservez-le en lieu sûr.
> Il sera stocké de manière chiffrée dans votre navigateur (localStorage).

### Connexions suivantes

Renseignez simplement votre **email** et **mot de passe**.
Si le token a expiré ou a été supprimé, un code de réaccès vous sera fourni par le dev.

---

## Modifier le contenu

1. Aller sur `/admin`
2. Se connecter avec votre email et mot de passe
3. Choisir la section dans le menu gauche
4. Modifier les champs → cliquer **Enregistrer**
5. Le site se met à jour automatiquement en quelques secondes ✅

### Ce que vous pouvez modifier librement

- ✅ Tous les textes (tagline, descriptions, discours, histoire)
- ✅ Les 4 chiffres clés de résultats
- ✅ Les cas clients (citation, résultats chiffrés)
- ✅ Les offres de service
- ✅ Les principes fondateurs
- ✅ Les engagements recrutement (profils, processus)
- ✅ Les engagements RSE et les mesures
- ✅ Les informations de contact (email, adresse, LinkedIn)
- ✅ Le thème graphique (couleurs, police, arrondi des boutons)

### Ce qui nécessite un développeur

- ⚠️ Modifier la mise en page ou les sections
- ⚠️ Ajouter une nouvelle page
- ⚠️ Intégrer un nouveau logo principal
- ⚠️ Ajouter un utilisateur admin supplémentaire

---

## Thème graphique

Le thème est géré dans **Thème graphique** dans l'interface admin.

### Presets disponibles

| Preset | Couleur primaire | Style |
|---|---|---|
| ✳️ Zen Value (défaut) | Vert `#AAC335` | Jakarta Sans, arrondi 4px |
| 🌊 Ardoise | Bleu `#2563EB` | Inter, arrondi 6px |
| 🌿 Mineral | Vert émeraude `#059669` | Manrope, arrondi 8px |

### Système 9 couleurs (mode personnalisé)

Chaque thème définit 3 couleurs × 3 nuances :

- **C1** — Couleur primaire (boutons, accents) + foncée + claire
- **C2** — Couleur sombre (textes, nav) + très foncée + grise
- **C3** — Couleur accent (badges, hover) + foncée + très claire

---

## Coût mensuel

| Service | Plan | Prix |
|---|---|---|
| GitHub | Free | 0 € |
| GitHub Pages | Inclus | 0 € |
| Domaine | Déjà possédé | 0 € |
| **Total** | | **0 €/mois** |

---

## Support

Pour toute évolution du site, contacter le développeur en fournissant :
- La section concernée
- Le type de modification souhaitée
- Les éléments visuels (maquette, image) si applicable
