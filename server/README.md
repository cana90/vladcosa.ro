# API blog vladcosa.ro

Server Express pentru administrarea și publicarea articolelor blogului. Datele sunt păstrate într-un fișier SQLite, iar migrările de schemă rulează automat la pornire.

## Configurare locală

Necesită Node.js 20 sau o versiune mai nouă.

```bash
npm install
cp .env.example .env
npm run hash-password
npm start
```

Copiază hash-ul generat în `ADMIN_PASSWORD_HASH` și înlocuiește `SESSION_SECRET` cu un secret aleatoriu de cel puțin 32 de caractere.

## Variabile de mediu

| Variabilă | Obligatorie | Valoare implicită | Descriere |
| --- | --- | --- | --- |
| `PORT` | nu | `4000` | Portul pe care ascultă API-ul. |
| `NODE_ENV` | nu | `development` | În `production`, cookie-ul de sesiune este transmis numai prin HTTPS. |
| `DB_PATH` | nu | `./data/blog.db` | Calea fișierului SQLite, relativă la directorul de lucru. |
| `UPLOADS_DIR` | nu | `./data/uploads` | Directorul în care sunt salvate imaginile. |
| `ADMIN_USERNAME` | da | — | Numele contului unic de administrator. |
| `ADMIN_PASSWORD_HASH` | da | — | Hash bcrypt generat cu `npm run hash-password`. |
| `SESSION_SECRET` | da | — | Secret de minimum 32 de caractere pentru semnarea cookie-ului JWT. |

## Autentificare

Sesiunea este un JWT semnat, păstrat într-un cookie `httpOnly`, `SameSite=Strict`, valabil opt ore. Autentificarea este limitată la cinci încercări în 15 minute pentru fiecare adresă IP.

| Metodă | Rută | Descriere |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Primește `{ "username", "password" }` și creează sesiunea. |
| `POST` | `/api/auth/logout` | Șterge cookie-ul de sesiune. |
| `GET` | `/api/auth/me` | Returnează administratorul autentificat sau răspuns `401`. |

## Articole publice

| Metodă | Rută | Descriere |
| --- | --- | --- |
| `GET` | `/api/articles?page=1&limit=10` | Listează numai articolele publicate, de la cel mai nou. `limit` este plafonat la 100. |
| `GET` | `/api/articles/:slug` | Returnează un articol publicat, inclusiv conținutul Markdown. |

## Administrare

Toate rutele de mai jos necesită autentificare.

| Metodă | Rută | Descriere |
| --- | --- | --- |
| `GET` | `/api/admin/articles` | Listează toate articolele, inclusiv schițele. |
| `POST` | `/api/admin/articles` | Creează un articol. Câmpuri: `title`, `excerpt`, `content_md`, `cover_image`, `status`. Slug-ul este generat automat din titlu. |
| `PUT` | `/api/admin/articles/:id` | Actualizează câmpurile furnizate. Slug-ul rămâne stabil când se schimbă titlul. |
| `DELETE` | `/api/admin/articles/:id` | Șterge articolul. |
| `POST` | `/api/admin/uploads` | Încarcă formular multipart cu câmpul `image`; acceptă JPEG, PNG și WebP de maximum 5 MB. |

Imaginile încărcate sunt servite la `/uploads/<nume-fișier>`. Câmpul `cover_image` acceptă numai căi aflate sub `/uploads`.

## Sănătate și Docker

`GET /api/health` răspunde cu codul `200` când procesul rulează.

Construire și pornire container:

```bash
docker build -t vladcosa-blog-api .
docker run --env-file .env -e NODE_ENV=production -p 4000:4000 -v vladcosa-blog-data:/app/data vladcosa-blog-api
```
