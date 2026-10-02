# Numerika360 SARL — Site officiel

Site vitrine en HTML, CSS et JavaScript, servi directement par Nginx.
Aucun framework, aucune étape de compilation, aucun serveur applicatif.

## Contenu

L’accueil présente cinq métiers :

1. Digital & Software
2. Intelligence artificielle
3. Infrastructure & Sécurité
4. Formation & Accompagnement
5. Conseil & Consultance

Il comprend également la démarche d’intervention, la présentation de l’entreprise
et un court encart Numerika360 Network. Le slogan reste « Connecter. Innover. Transformer. ».

## Fichiers principaux

- `index.html` : accueil, expertises, approche et entreprise.
- `contact.html` : liens directs vers l’email et le téléphone.
- `mentions.html` : informations légales et confidentialité, RCCM et IDNAT.
- `css/editorial.css` : typographie et mise en page des contenus.
- `css/brand-motifs.css` : intégration des motifs de marque fournis.
- `js/contact.js` : personnalisation du sujet du lien email via `?sujet=...`.
- `deploy/nginx.conf` : configuration du serveur statique.

Les anciennes pages redirigent vers l’accueil ou ses ancres.
`#formation` et `#network` restent accessibles pour les anciens liens.

## Contact

Email : contact@numerika360sarl.com
Téléphone : +243 853 670 299
RCCM : CD/KNG/RCCM/26-B-03815
IDNAT : 01-H5300-N15042Z

Il n’y a pas de formulaire ni d’API d’envoi. Le lien email ouvre la messagerie
du visiteur ; celui-ci rédige et envoie lui-même son message.

## Aperçu local

Avec Python installé, depuis le dossier du projet :

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Ouvrir `http://127.0.0.1:8080/`.

## Ressources et performances

Les pages utilisent des exports WebP adaptés à l’affichage : visuel d’accueil
en 640 ou 1120 pixels selon l’écran, motifs cadrés en 960 × 1600 pixels et
logos en 540 pixels. Les PNG originaux restent disponibles mais ne sont pas
chargés par les pages. Le logo du pied de page est chargé à la demande.
Les icônes de navigateur et Apple ont leurs propres petits exports PNG.

Pour régénérer ces fichiers avec Python et Pillow :
`python tools/optimize-assets.py`.

Les scripts sont locaux et différés. La configuration Nginx fournie active
la compression du HTML/CSS/JavaScript et le cache des ressources ; leur
activation effective reste à contrôler sur le serveur lors de la publication.

## Publication

Le site est destiné à `https://numerika360sarl.com/`.
La racine Nginx est `/var/www/numerika360` ; l’accueil public est `index.html`.
Le guide `deploy/DEPLOY.md` décrit l’installation du VPS, mais conserve des
références historiques à une page de construction et à l’ancien aperçu `/accueil`.

© 2026 Numerika360 SARL. Tous droits réservés.
