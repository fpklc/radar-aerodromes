# ◎ Radar Aérodromes

Application web mobile (PWA) qui indique en un coup d'œil **dans quelle direction et à quelle distance se trouve l'aérodrome le plus proche**, façon radar, et **si on peut l'atteindre en plané** en cas de panne moteur.

👉 **Ouvrir l'appli : https://fpklc.github.io/radar-aerodromes/**

> ⚠️ Outil d'aide à l'orientation et à la décision. Il ne remplace ni la préparation du vol, ni les cartes VAC / l'AIP, ni le jugement du pilote.

## Fonctionnalités

- **Radar** orienté par la boussole du téléphone (cap en haut), avec balayage, cercles de distance et terrains alentour.
- **Choix automatique de la cible** : le terrain le plus proche **atteignable en plané** (à défaut, le plus proche). Sélection manuelle possible dans la liste.
- **Cadre vert / rouge** : vert si le terrain est atteignable en plané, rouge s'il est hors plané (la flèche de direction prend la même couleur).
- **Distance, cap et piste préférée** (QFU unique, ex. `06L`) affichés en grand.
- **Calcul de plané** : finesse et vitesse de plané de l'avion, altitude (GPS ou QNH saisi), marge d'arrivée, vent. Rayon de plané dessiné sur le radar, hauteur d'arrivée et temps estimé.
- **Zoom automatique** : le terrain choisi reste sur l'avant-dernier cercle ; en approche, les **pistes sont dessinées à l'échelle**, à l'emplacement exact de leurs seuils, la piste préférée en bleu.
- **Vent au doigt** : toucher le bouton `WIND` en haut à gauche du radar, puis glisser le doigt dans le sens du vent (toute la largeur du radar = 30 kt). Toucher l'indicateur pour l'annuler.
- **Pistes et fréquences** du terrain (TWR, AFIS, A/A, ATIS…).
- **Filtres** : aérodromes, aéroports commerciaux, ULM, planeurs, héliports ; longueur de piste minimale ; revêtement.
- **Symbole avion** au choix (triangle ou petit avion à ailes droites).
- **Portrait / paysage** automatique selon l'orientation du téléphone (radar à gauche en paysage).
- **Mise à jour des positions chaque seconde**, indicateur de fraîcheur du GPS.
- **Fonctionne hors ligne** une fois installée (toutes les données sont embarquées).

## Installation sur le téléphone

1. Ouvrir https://fpklc.github.io/radar-aerodromes/ avec du réseau (Chrome sur Android, Safari sur iPhone).
2. Android : menu ⋮ → *Installer l'application*. iPhone : Partager → *Sur l'écran d'accueil*.
3. Lancer l'appli, accepter la localisation (et la boussole sur iPhone via le bouton ⟳).
4. Quand « ✓ Disponible hors ligne » apparaît dans les réglages, l'appli fonctionne en mode avion.

Les mises à jour sont récupérées automatiquement à l'ouverture lorsqu'il y a du réseau.

## Sources des données

| Zone | Source | Contenu |
|---|---|---|
| France | **AIP France – SIA**, eAIP AIRAC du 29 OCT 2026 (AD 1.3, AD 1.6, AD 2.18) | aérodromes, pistes (dimensions, revêtement, orientation, coordonnées des seuils), altitude, fréquences |
| Reste de l'Europe, terrains français hors AIP | [OurAirports](https://ourairports.com/data/) (domaine public, contributif) | position, pistes et fréquences quand elles existent |

Le fichier `sia_airac_2026-10-29.json` contient l'extraction brute des données SIA utilisées.
Dans l'appli, chaque terrain indique sa source (« AIP France (SIA) » ou « OurAirports, non officielle »).
**Les données doivent être mises à jour à chaque cycle AIRAC** ; vérifier toujours la carte VAC en vigueur.

## Limites connues

- Plané calculé en air calme corrigé du vent saisi, **sans relief, obstacles, virages ni circuit d'approche**.
- Altitude GPS approximative : en vol, préférer l'altitude QNH saisie.
- Catégories ULM / planeurs déduites du nom du terrain (hors AIP).
- La boussole du téléphone peut être perturbée dans un cockpit (masses métalliques, électronique).

## Fichiers

- `index.html` : l'application complète (code + données embarquées)
- `sw.js` : service worker (cache hors ligne, mises à jour)
- `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` : installation PWA
- `sia_airac_2026-10-29.json` : extraction des données officielles SIA
