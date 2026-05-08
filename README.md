# Au Cœur des Saveurs — refonte du site

Refonte complète du site de la boulangerie-pâtisserie **Au Cœur des Saveurs** (Nyon · Gland · Crassier).
Site statique HTML/CSS/JS vanilla, déployable sur n'importe quel hébergeur (Infomaniak, Netlify, Vercel, OVH, GitHub Pages…).

## Structure

```
.
├── index.html              Accueil — 9 sections orientées conversion
├── notre-histoire.html     Histoire de Sophie & Daniel Baumgartner depuis 2005
├── nos-produits.html       Pains, viennoiseries, pâtisseries (~25 produits)
├── tea-room.html           Carte du tea-room (Gland & Crassier)
├── nos-boutiques.html      3 fiches détaillées (Nyon, Gland, Crassier)
├── contact.html            Formulaire + coordonnées des 3 boutiques
├── 404.html                Page 404 brandée
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/styles.css      Design system complet (~700 lignes)
    ├── js/main.js          Reveal scroll, mobile drawer, sticky CTA, sticky header
    └── img/                (à remplir avec les vraies photos client — voir ci-dessous)
```

## DA / charte (palette)

| Token | Valeur | Usage |
|---|---|---|
| `--cream` | `#F4ECDC` | Fond principal (boulangerie chaud) |
| `--ivory` | `#FBF5E8` | Sections alternées |
| `--espresso` | `#2A1D11` | Ancrage sombre + footer |
| `--wheat` | `#B8843E` | Accent / CTA principaux |
| `--brick` | `#A03A2C` | Accent secondaire (badges, alertes) |
| `--ink` | `#1B130C` | Texte courant |
| `--mute` | `#6F5F4D` | Texte secondaire |

**Typographie** : Fraunces (variable, expressive — H1/H2 et italiques accentués) + Geist (corps moderne) — chargées via Google Fonts.

## Animations / motion

- Reveal au scroll (`IntersectionObserver`, jamais de listener `scroll`)
- Stagger automatique entre éléments `.reveal` d'un même parent
- Header sticky qui se densifie au scroll (background + blur)
- Sticky CTA mobile (Appeler / Contact) après le hero
- Hover sur cartes : translate-y + shadow
- Respect strict de `prefers-reduced-motion`

## SEO embarqué

- Balises `<title>` et `<meta description>` uniques par page
- Open Graph + Twitter Card sur la home
- `canonical` sur toutes les pages
- **Schema.org `Bakery`** avec les 3 départements (Nyon, Gland, Crassier), horaires, fondateurs, réseaux sociaux
- Hiérarchie sémantique : 1 H1 par page, H2 par section, eyebrows en `<p>` (jamais en H)
- `sitemap.xml` + `robots.txt`
- Lazy-load sur toutes les images en dessous du fold
- Liens téléphone (`tel:`) et email (`mailto:`) cliquables natifs

## Images

⚠️ **Le site utilise actuellement des images placeholder via `picsum.photos`** (avec seeds boulangerie-thématiques).
Pour la mise en production, **remplacer chaque image** par les vraies photos de la boulangerie :

1. Photographier (ou récupérer auprès du client) :
   - Hero : un beau pain de campagne, un fournil, ou Sophie/Daniel au travail
   - 3 vitrines des boutiques (Nyon, Gland, Crassier)
   - 9 photos produits pour la page produits (un pain représentatif par variété)
   - Photos d'ambiance tea-room (salle, café, quiche, crêpe, galette)
   - Galerie homepage (6 photos)

2. **Optimiser** chaque image en WebP/AVIF (1.5-2× résolution finale, qualité 80).
3. Les déposer dans `assets/img/` et remplacer les `src="https://picsum.photos/..."` par les chemins locaux.
4. Renseigner les `alt` avec une description concrète (déjà ébauchée dans le code).
5. Générer une image `assets/img/og-cover.jpg` (1200×630) pour le partage social.

## Formulaire de contact

Le formulaire de `contact.html` est **simulé côté client** (pour la démo). Pour le rendre fonctionnel, brancher l'endpoint dans `assets/js/main.js` au niveau du handler `[data-form]`. Trois options simples :

- **Formspree** (recommandé pour un site statique) : remplacer le `e.preventDefault()` par un `fetch` POST vers `https://formspree.io/f/<ID>`.
- **EmailJS** : envoi direct côté client vers une adresse email.
- **Backend custom** : si l'hébergeur offre du serverless (Netlify Functions, Vercel, etc.).

## Numéros de téléphone

Vérifiés (à reconfirmer avec le client) :
- **Nyon** : 022 361 26 47
- **Gland** : 022 367 08 97
- **Crassier** : numéro à confirmer (lien `tel:` pointe pour l'instant vers Gland)

Email principal : `info@au-coeur-des-saveurs.ch`

## Déploiement

Site 100 % statique, aucune dépendance.

**Infomaniak / OVH (FTP)** : uploader le contenu du dossier à la racine du serveur.
**Netlify / Vercel** : drag-and-drop du dossier ou push Git, aucune configuration build nécessaire.
**GitHub Pages** : push sur la branche `gh-pages` ou activation Pages depuis `main`.

## Performance attendue

- Lighthouse desktop : 95+ toutes catégories (à vérifier après ajout des vraies images optimisées)
- Lighthouse mobile : 85+
- LCP < 2 s avec images optimisées
- CLS quasi-nul (toutes les images ont `width`/`height` ratio via `aspect-ratio` CSS)

## Améliorations futures suggérées

- Page **Blog / actualités** (pain du mois, événements saisonniers)
- Page **Traiteur / événementiel** dédiée (déjà mentionnée dans le CTA final)
- **Click & Collect** ou commande en ligne pour les pains spéciaux
- Intégration d'un **flux Instagram** réel (via API ou plugin embed)
- **Multilangue** FR / EN / DE pour la clientèle internationale de La Côte
