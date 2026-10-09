# Le Comptoir Flambé — Direction artistique (UI/UX)

Restaurant de tartes flambées · 9 rue du Général Rieder, Kaysersberg
Document de référence pour toute évolution du site. État au 3 octobre 2026.

---

## 1. L'intention

**Tradition alsacienne + modernité chic, sans jamais surcharger.**

Le site doit faire deux choses, dans cet ordre :

1. **Donner envie de venir** : une grande photo, peu de texte, une ambiance chaleureuse.
2. **Aller vite** : la carte, l'adresse, les horaires et le téléphone se trouvent en un geste.

Il ne fait **pas** de réservation en ligne. Les seules actions sont « Voir la carte », « Appeler » et « Itinéraire ».

**Inspiration** : la page [Libertino de Big Mamma](https://www.bigmammagroup.com/fr/restaurants-italiens/libertino). On en garde la photo plein écran, le nom en très grand, les fonds crème et les coins arrondis. On enlève l'exubérance : moins de couleurs, moins de texte, moins d'effets.

## 2. Les règles d'or

- **Un seul accent de couleur** (le rouge) sur une base brun foncé et crème.
- **Un élément décoratif par zone**, jamais deux côte à côte.
- **Les motifs alsaciens sont dessinés au trait ou en silhouette**, d'une seule couleur. Seule exception : les petits personnages en costume à côté des grands titres, en couleurs.
- **Le mobile passe en premier** : chaque écran doit rester aéré sur téléphone.
- **Chaque lien de navigation ouvre une page.** Aucun lien du menu ne fait défiler la page en cours.
- En cas de doute, on retire.

## 3. Les couleurs

Provisoires : elles seront recalées sur le logo dès sa réception. Tout se règle dans les variables en tête de `style.css`.

| Rôle | Variable | Valeur | Usage |
|---|---|---|---|
| Brun « bois brûlé » | `--ink` | `#1C1410` | Texte, pied de page, menu plein écran, village en silhouette |
| Crème | `--paper` | `#FAF6EF` | Fond de toutes les pages |
| Rouge Alsace | `--red` | `#A8231C` | Bouton principal, nappe à carreaux, bec des cigognes, onglet actif de la carte |
| Rouge foncé | `--red-dark` | `#8A1B15` | Survol du bouton principal |
| Texte secondaire | `--muted` | brun à 72 % (contraste 7:1 sur le crème) | Descriptions des plats, légendes |
| Filets | `--line` | brun à 14 % | Séparateurs fins |
| Crème sur fond sombre | `--on-dark` | `#F4ECDF` | Texte du pied de page et du menu |

Deux couleurs de service, hors charte : vert `#57B96A` (ouvert) et corail `#D9705F` (fermé) pour la pastille d'ouverture.

## 4. La typographie

| Police | Rôle | Détails |
|---|---|---|
| **Instrument Serif** | Titres, nom du restaurant, numéro de téléphone, liens du menu plein écran | Graisse normale uniquement. L'italique sert d'accent : « *Flambé* », « *attend.* » |
| **DM Sans** | Textes, boutons, plats, navigation | 400 pour le texte, 500 pour les boutons, 600 pour les noms de plats |

- **Grands titres** : de 2,6 à 5 rem selon l'écran, interligne très serré (0,98). Titre d'accueil jusqu'à 9,5 rem.
- **Pas de surtitres** : les petits titres en majuscules au-dessus des grands titres (« La maison », « Au feu de bois ») ont été retirés, jugés inutiles.
- **Texte courant** : 1 rem, interligne 1,6.
- Jamais de gras sur les titres, jamais de majuscules sur les grands titres.

## 5. La touche alsacienne

Elle passe **uniquement par le visuel** : couleurs, motifs, animaux, emblèmes. **Aucune expression en alsacien** dans les textes.

| Motif | Où | Règle |
|---|---|---|
| **Village à colombages au trait + cigogne sur son nid** | Au bas du menu plein écran uniquement | Trait fin crème à 30 % sur fond brun, bec rouge. Une seule cigogne. |
| **Village en silhouette + cigogne en vol** | Transition entre le contenu et le pied de page, sur toutes les pages | Le motif signature, et le seul village du bas de page. Silhouette brune, fenêtres crème, une seule cigogne au nid. Une cigogne traverse le ciel puis disparaît avant de repasser. |
| **Nappe à carreaux rouge et crème** | Bande de 24 px sous la photo d'accueil et sous le titre des pages intérieures | Une seule bande par page. |
| **Personnages en costume alsacien** (deux Alsaciennes, deux Alsaciens) | De part et d'autre des grands titres centrés (un couple), à droite du titre « La maison » (un seul) | En couleurs, pieds alignés sur le bas du titre, de 64 à 104 px de haut selon l'écran. Tirés au hasard à chaque visite. Ils se balancent une fois à l'arrivée, comme un salut. Fichiers `images/bonhomme-1.svg` à `4` : à remplacer par de vraies illustrations si besoin. |
| **Maison à colombage** | Icône d'onglet du navigateur | Trait crème sur fond rouge. |

**Écartés, à ne pas reproposer** : bandeau défilant d'expressions, frise de maisons colorées, autocollant bretzel, motifs sur fond de section, second village au trait dans le pied de page, croix de colombage et buste d'Alsacienne en silhouette devant les surtitres.

**En réserve, si besoin un jour** : cœur alsacien découpé, cadre d'enseigne en fer forgé autour du logo, bleu kelsch en seconde couleur.

## 6. Les composants

- **Boutons** : rectangulaires, coins de 4 px, texte en petites majuscules espacées, 50 px de haut (48 sur mobile). Trois variantes : rouge Alsace avec filet crème intérieur, façon plaque d'enseigne (action principale, réservé à l'accès à la carte), contour fin (action secondaire), cadre crème (sur la photo d'accueil). Écartés car trop génériques : forme pilule, verre dépoli, bouton crème ou blanc.
- **En-tête** : fixe, 68 px (62 sur mobile). Transparent sur la photo d'accueil, crème translucide ensuite. Sur ordinateur : nom, trois liens (Accueil, La carte, Infos & horaires) et « Appeler ». Pas de bouton rouge dans l'en-tête : il doublait le lien « La carte ». Sur mobile : le nom et le mot « Menu » (zone tactile de 44 px).
- **Menu plein écran** (mobile et tablette) : fond brun, trois grands liens en Instrument Serif, la page en cours en italique, adresse et téléphone en bas, village au trait tout en bas.
- **Liste de plats** : nom en demi-gras, ingrédients en gris dessous, prix aligné à droite, filet fin entre chaque plat. Pas de photo par plat, pas de pictogramme.
- **Onglets de la carte** (mobile et tablette) : petites majuscules, soulignement rouge sur la catégorie en cours, collés sous l'en-tête pendant le défilement.
- **Pastille d'ouverture** : point vert ou corail + « Ouvert maintenant · jusqu'à 23h » ou « Fermé · ouvre à 8h », calculé à l'heure de Kaysersberg.
- **Photos** : coins arrondis de 18 px, formats portrait (4:5 et 3:4).
- **Pied de page** : fond brun, nom en grand, trois colonnes (adresse, horaires, téléphone). Le village en silhouette le précède ; rien en dessous.
- **Choix de la langue** : « FR · DE · EN » dans l'en-tête (ordinateur et tablette) et au bas du menu plein écran (mobile), la langue en cours soulignée. Il reste discret : la langue se règle toute seule, personne n'a à choisir.
- **Plan Google** (page infos) : un cadre avec le bouton « Afficher le plan ». Le plan ne se charge qu'au clic.

## 7. La structure et le parcours

Trois pages, toutes avec le même en-tête et le même pied de page :

| Page | Fichier | Contenu |
|---|---|---|
| Accueil | `index.html` | Photo plein écran et nom, aperçu de trois tartes flambées, la maison (texte, trois points forts), six photos de la salle et du bar |
| La carte | `carte.html` | Toute la carte, en trois colonnes sur ordinateur, avec onglets sur mobile, en français, allemand ou anglais |
| Infos & horaires | `infos.html` | Adresse et itinéraire, tableau des horaires avec le jour en cours, téléphone, plan |

**Règles de parcours**

- La carte est à **un clic** depuis n'importe où : bouton de la photo d'accueil, lien de l'en-tête, menu mobile.
- Pas de page « La maison » séparée : elle répétait l'accueil. À recréer seulement s'il y a une vraie histoire à raconter.
- L'adresse, les horaires et le téléphone sont dans le pied de page de **chaque** page.
- **Pas de barre d'actions fixe en bas** sur mobile.
- Le téléphone est toujours un lien cliquable, l'adresse renvoie toujours vers Google Maps.

**Points de rupture** : 960 px (la navigation devient le bouton « Menu », la carte passe à deux colonnes) et 680 px (tout passe en une colonne, les photos défilent à l'horizontale).

## 8. Les animations

Peu nombreuses et lentes. Elles sont toutes coupées si le visiteur a demandé à réduire les animations.

- Léger zoom arrière de la photo d'accueil à l'arrivée (14 s).
- Apparition douce des blocs au défilement (fondu + 24 px de montée).
- Pulsation discrète du point vert quand le restaurant est ouvert.
- Vol de la cigogne : elle traverse en 17 s, puis s'absente 17 s.
- Ouverture du menu plein écran en fondu, liens qui arrivent l'un après l'autre.
- Petit balancement des personnages en costume à l'arrivée sur la page (1,6 s, une seule fois).
- Pas de défilement automatique, pas de carrousel, pas de bandeau défilant.

## 9. Les photos

La galerie de l'accueil montre les vraies photos du restaurant (trois de la salle, trois du bar). La photo d'accueil reste provisoire.

- **Lumière chaude**, tons bruns et dorés, pour s'accorder au fond crème et au brun.
- **Photo d'accueil** : de préférence une tarte flambée qui sort du four, car c'est la seule grande photo du produit. Format paysage, sujet lisible même assombri, car le nom s'affiche par-dessus. Elle est recadrée en portrait sur téléphone : sujet au centre, ou fournir une seconde version portrait.
- **Galerie** : la salle, le comptoir, la terrasse, des gens à table. Format portrait 3:4, six photos sur deux rangées (elles défilent sur téléphone). Recadrer pour montrer le moins de plafond possible et aucun reflet du photographe.
- Pas de photo sur fond blanc, pas de montage, pas de texte dans l'image.

## 10. Le ton des textes

- Phrases courtes, chaleureuses, sans jargon. Exemple : « Chaque tarte est flambée minute. » L'expression « sans chichis » a été retirée.
- Trois langues sur tout le site : français, allemand, anglais. Le site s'ouvre dans la langue du téléphone (anglais si elle n'est ni le français ni l'allemand), et le visiteur peut changer avec « FR · DE · EN ». Les noms des tartes restent en français. Tout nouveau texte doit recevoir ses versions `data-de` et `data-en`.
- Un titre, une ou deux phrases, pas plus par bloc.
- Les plats : le nom, puis les ingrédients séparés par des virgules.

## 11. Accessibilité

- Texte brun sur crème et crème sur brun : contrastes élevés.
- Tous les éléments décoratifs sont masqués aux lecteurs d'écran.
- Le menu plein écran se ferme avec la touche Échap, prend le focus clavier à l'ouverture et le garde tant qu'il est ouvert.
- Les boutons et liens ont un contour visible au clavier.
- Les animations respectent le réglage « réduire les animations ».

## 12. En attente

- [ ] Logo en deux versions (claire pour la photo d'accueil, foncée pour le fond crème), puis recalage des couleurs dessus
- [ ] Décider si le grand nom en lettres reste sur la photo d'accueil une fois le logo en place
- [x] Photos de la salle et du bar dans la galerie
- [ ] Photo d'accueil du restaurant (une tarte flambée qui sort du four)
- [x] Vraie carte et vrais prix (repris des quatre cartes imprimées)
- [ ] Relecture des traductions allemande et anglaise de la carte
- [ ] Numéro de téléphone (factice : 03 00 00 00 00)
- [ ] Lien Instagram et mentions légales
- [ ] Confirmer que « week-end » veut dire samedi et dimanche (9h – minuit)

---

**Note technique** : le site est en HTML, CSS et JavaScript simples, sans outil de construction. L'en-tête, le menu plein écran et le pied de page sont copiés dans les trois fichiers HTML : une modification de l'un doit être reportée dans les trois. Les polices sont dans le dossier `fonts/` : rien n'est chargé depuis Google avant un clic sur « Afficher le plan ».
