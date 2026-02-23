# Zen Value — Guide de prise en main

## Structure du projet

```
zenvalue/
├── index.html                   ← Page principale (ne pas modifier)
├── netlify.toml                 ← Configuration Netlify
├── admin/
│   ├── index.html               ← Interface d'administration
│   └── config.yml               ← Configuration du CMS (champs éditables)
├── assets/
│   ├── css/                     ← Styles (ne pas modifier sans dev)
│   │   ├── tokens.css           ← Couleurs et variables charte
│   │   ├── layout.css           ← Structure et grilles
│   │   ├── components.css       ← Boutons, cards, etc.
│   │   ├── navigation.css       ← Nav et footer
│   │   ├── animations.css       ← Effets au scroll
│   │   └── forms.css            ← Formulaire contact
│   ├── js/                      ← Scripts (ne pas modifier sans dev)
│   │   ├── animations.js
│   │   ├── router.js
│   │   ├── cms-loader.js        ← Charge les JSON dans le HTML
│   │   └── nav.js
│   └── images/logo/             ← Logos (remplacer ici si nouveau logo)
└── content/                     ← ✅ CONTENU MODIFIABLE VIA LE CMS
    ├── settings/
    │   ├── global.json          ← Email, adresse, LinkedIn, copyright
    │   └── resultats.json       ← Les 4 chiffres clés
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

## Déploiement (une seule fois — ~30 min)

### Étape 1 — GitHub
1. Créer un compte sur [github.com](https://github.com)
2. Créer un nouveau dépôt privé : **"zenvalue-site"**
3. Uploader tous les fichiers du projet dedans

### Étape 2 — Netlify
1. Créer un compte sur [netlify.com](https://netlify.com) *(gratuit)*
2. Cliquer **"Add new site" → "Import an existing project"**
3. Connecter votre compte GitHub → choisir **zenvalue-site**
4. Laisser les paramètres par défaut → **Deploy site**
5. Votre site est en ligne sur une URL temporaire `*.netlify.app`

### Étape 3 — Activer l'interface d'administration
1. Dans Netlify → **Site settings → Identity → Enable Identity**
2. Aller dans **Identity → Registration → Invite only**
3. **Identity → Services → Enable Git Gateway**
4. Inviter votre adresse email : **Identity → Invite users**
5. Accepter l'invitation reçue par email → créer votre mot de passe

### Étape 4 — Connecter votre nom de domaine
1. Dans Netlify → **Domain settings → Add custom domain**
2. Entrer `zenvalue.fr`
3. Modifier les DNS chez votre registrar (OVH, Gandi…) :
   - Pointer vers les serveurs DNS Netlify fournis
4. HTTPS automatique activé sous 24h ✅

---

## Modifier le contenu

1. Aller sur `zenvalue.fr/admin`
2. Se connecter avec votre email et mot de passe Netlify Identity
3. Choisir la section à modifier dans le menu gauche
4. Modifier le texte → cliquer **"Publish"**
5. Le site se met à jour automatiquement en ~30 secondes ✅

### Ce que vous pouvez modifier librement
- ✅ Tous les textes (tagline, descriptions, discours, histoire)
- ✅ Les 4 chiffres clés de résultats
- ✅ Les cas clients (citation, résultats chiffrés)
- ✅ Les offres de service
- ✅ Les engagements RSE et les mesures
- ✅ Les informations de contact (email, adresse, LinkedIn)
- ✅ Upload d'images (logos clients, photos)

### Ce qui nécessite un développeur
- ⚠️ Modifier la mise en page ou les couleurs
- ⚠️ Ajouter une nouvelle page ou section
- ⚠️ Intégrer un nouveau logo principal

---

## Formulaire de contact

Les messages envoyés via le formulaire arrivent directement dans :  
**Netlify → Forms → contact**

Pour recevoir les soumissions par email :
1. Netlify → **Forms → Form notifications**
2. Ajouter votre adresse email → Save

---

## Coût mensuel

| Service | Plan | Prix |
|---|---|---|
| GitHub | Free | 0 € |
| Netlify | Starter | 0 € |
| Domaine | Déjà possédé | 0 € |
| **Total** | | **0 €/mois** |

---

## Support

Pour toute évolution du site, contacter le développeur en fournissant :
- La section concernée
- Le type de modification souhaitée
- Les éléments visuels (maquette, image) si applicable
