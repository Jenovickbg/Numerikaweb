# Numerika360 SARL — Site officiel

Site corporate premium de **Numerika360 SARL**, entreprise technologique basée en République démocratique du Congo.

**Slogan :** Connecter. Innover. Transformer.  
**Domaine :** [numerika360sarl.com](https://numerika360sarl.com)  
**Email :** contact@numerika360sarl.com  
**Téléphone :** +243 853 670 299

## Stack

- HTML5 / CSS3 / JavaScript vanilla
- **Aucun** Node.js, React, Vue, Angular, Bootstrap ou Tailwind
- Servi tel quel par **Nginx** (fichiers statiques)

## Production (Hostinger VPS + Nginx + Cloudflare + GitHub)

Guide détaillé étape par étape : **[deploy/DEPLOY.md](deploy/DEPLOY.md)**

Flux :

1. Push du code sur **GitHub**
2. Clone / pull sur le VPS dans `/var/www/numerika360`
3. Config Nginx dédiée (sans toucher vos autres sites)
4. DNS + SSL via **Cloudflare**

```bash
# Sur le VPS — après le clone GitHub
sudo cp /var/www/numerika360/deploy/nginx.conf /etc/nginx/sites-available/numerika360sarl.com
sudo ln -sf /etc/nginx/sites-available/numerika360sarl.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## Structure

```
├── index.html          Page publique « site en développement »
├── accueil.html        Page vitrine unique (ancres)
├── contact.html        Formulaire de contact
├── mentions.html       Mentions légales + confidentialité
├── about/services/…    Redirections vers les ancres
├── css/  js/  assets/
├── deploy/
├── robots.txt
└── sitemap.xml
```

## Architecture

Site vitrine **one-page** avec navigation par ancres :

`#offre` · `#solutions` · `#formation` · `#network`

Pages séparées : `contact.html`, `mentions.html`.

## Accès pendant le développement

| URL | Résultat |
|-----|----------|
| `/` | Page « en construction » |
| `/accueil` | Site vitrine complet |

Quand le site sera prêt : remplacer `index.html` par le contenu de `accueil.html`.

## Lancer en local

```bash
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Formulaire de contact

Validation côté navigateur uniquement. Prêt pour une future API / service d’envoi (`js/contact.js`).

## Licence

© 2026 Numerika360 SARL. Tous droits réservés.
