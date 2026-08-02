# Déploiement Numerika360 SARL

**Stack :** HTML / CSS / JS statique  
**Serveur :** VPS Hostinger · Ubuntu · Nginx  
**Domaine :** numerika360sarl.com (Cloudflare)  
**Code :** GitHub  
**Racine web :** `/var/www/numerika360`

Aucun Node.js en production.

---

## Vue d’ensemble

```
PC (Cursor)  →  push  →  GitHub  →  pull  →  VPS (/var/www/numerika360)
                                              ↓
                                           Nginx
                                              ↓
                                    Cloudflare → visiteurs
```

Votre autre projet sur le VPS **reste inchangé**. Numerika360 s’ajoute à côté.

---

## Étape 1 — Mettre le projet sur GitHub

### 1.1 Créer un dépôt
1. Allez sur [github.com](https://github.com) → **New repository**
2. Nom suggéré : `NumerikaWeb` (ou `numerika360-site`)
3. Privé ou public, au choix
4. **Ne cochez pas** “Add README” si le projet existe déjà en local
5. Créez le dépôt

### 1.2 Envoyer le code depuis votre PC

Ouvrez un terminal **dans le dossier** `NumerikaWeb` (celui qui contient `index.html`) :

```bash
git init
git add .
git commit -m "Site officiel Numerika360 SARL"
git branch -M main
git remote add origin https://github.com/VOTRE_USER/NumerikaWeb.git
git push -u origin main
```

Remplacez `VOTRE_USER/NumerikaWeb` par l’URL réelle de votre dépôt.

Vérifiez sur GitHub que tous les fichiers sont bien présents (`index.html`, `css/`, `js/`, `deploy/`, etc.).

---

## Étape 2 — Préparer le VPS (sans toucher l’autre projet)

Connectez-vous en SSH :

```bash
ssh utilisateur@IP_DU_VPS
```

### 2.1 Voir ce qui existe déjà

```bash
ls /var/www/
ls /etc/nginx/sites-enabled/
```

Notez le dossier et la config de **votre autre projet** — on ne les modifie pas.

### 2.2 Créer le dossier Numerika360

```bash
sudo mkdir -p /var/www/numerika360
sudo chown -R $USER:www-data /var/www/numerika360
```

### 2.3 Installer Nginx si besoin

```bash
sudo apt update
sudo apt install -y nginx git
```

---

## Étape 3 — Cloner le site depuis GitHub

Toujours sur le VPS :

```bash
# Vider le dossier s'il est vide / neuf, puis cloner
cd /var/www
sudo rm -rf numerika360
sudo git clone https://github.com/VOTRE_USER/NumerikaWeb.git numerika360
sudo chown -R www-data:www-data /var/www/numerika360
```

Si le dépôt est **privé**, utilisez un [Personal Access Token](https://github.com/settings/tokens) ou une clé SSH GitHub.

Vérification :

```bash
ls /var/www/numerika360
# Vous devez voir : index.html  accueil.html  css  js  deploy  ...
```

---

## Étape 4 — Configurer Nginx (nouveau site uniquement)

```bash
sudo cp /var/www/numerika360/deploy/nginx.conf /etc/nginx/sites-available/numerika360sarl.com
sudo ln -sf /etc/nginx/sites-available/numerika360sarl.com /etc/nginx/sites-enabled/
```

**Ne supprimez pas** la config de l’autre projet dans `sites-enabled`.

Test et rechargement :

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Si `nginx -t` affiche `syntax is ok` / `test is successful` → OK.

---

## Étape 5 — Cloudflare (DNS)

Dans Cloudflare → zone **numerika360sarl.com** → DNS :

| Type | Nom | Contenu     | Proxy          |
|------|-----|-------------|----------------|
| A    | @   | IP du VPS   | Proxied (orange) |
| A    | www | IP du VPS   | Proxied (orange) |

SSL/TLS Cloudflare :
- Mode **Full** pour commencer  
- Puis **Full (strict)** après Let’s Encrypt (étape 6)

---

## Étape 6 — HTTPS (Let’s Encrypt)

Sur le VPS :

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d numerika360sarl.com -d www.numerika360sarl.com
```

Puis dans Cloudflare : SSL → **Full (strict)**.

Firewall (si ufw est actif) :

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw status
```

---

## Étape 7 — Vérifier

| URL | Résultat attendu |
|-----|------------------|
| `https://numerika360sarl.com/` | Page « en construction » |
| `https://numerika360sarl.com/accueil` | Site complet (aperçu) |
| Votre autre domaine | **Toujours en ligne**, inchangé |

---

## Mises à jour plus tard (via GitHub)

### Sur votre PC
1. Modifiez le site dans Cursor  
2. Puis :

```bash
git add .
git commit -m "Mise à jour du site"
git push
```

### Sur le VPS

```bash
cd /var/www/numerika360
sudo git pull
sudo systemctl reload nginx
```

C’est tout. Pas de build, pas de `npm`.

---

## Checklist finale

- [ ] Code sur GitHub
- [ ] Clone dans `/var/www/numerika360` (pas dans le dossier de l’autre projet)
- [ ] Config Nginx `numerika360sarl.com` ajoutée (l’autre site intact)
- [ ] DNS Cloudflare → IP du VPS
- [ ] HTTPS OK
- [ ] `/` = construction · `/accueil` = site complet
- [ ] Autre projet toujours accessible

---

## En cas de problème

| Problème | À vérifier |
|----------|------------|
| Page blanche / 502 | `sudo nginx -t` et `sudo systemctl status nginx` |
| Mauvais site s’affiche | `server_name` dans la config Nginx + DNS Cloudflare |
| `/accueil` en 404 | Fichier `accueil.html` présent + config `deploy/nginx.conf` bien copiée |
| `git pull` refusé | Droits du dossier ou dépôt privé (token / SSH) |
| Autre projet cassé | Vous avez peut‑être modifié sa config : restaurez son fichier dans `sites-enabled` |
