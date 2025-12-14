# 🎓 TechCampus API - Backend

> API REST robuste et scalable pour la plateforme TechCampus

[![NestJS](https://img.shields.io/badge/NestJS-10+-E0234E?logo=nestjs)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5+-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?logo=postgresql)](https://www.postgresql.org/)

[Frontend Repository →](https://github.com/yeonoel/front-university) 

---

## 📋 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#️-architecture)
- [Installation](#️-installation)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Base de Données](#-base-de-données)
- [Authentification](#-authentification)
- [Déploiement](#-déploiement)

---

## ✨ Fonctionnalités

### Authentification & Autorisation
- ✅ Inscription/Connexion sécurisée (JWT)
- ✅ Hash de mots de passe (bcrypt)
- ✅ Guards pour routes protégées
- ✅ Gestion de sessions

### Gestion des Écoles
- ✅ CRUD complet (Create, Read, Update, Delete)
- ✅ Recherche multi-critères (nom, commune, filière)
- ✅ Upload et gestion d'images
- ✅ Géolocalisation (latitude/longitude)

### Système d'Avis
- ✅ Utilisateurs peuvent noter (1-5 étoiles)
- ✅ Commentaires textuels
- ✅ Calcul moyenne des notes



### Techniques
- ✅ Validation des données (class-validator)
- ✅ Gestion d'erreurs centralisée
- ✅ CORS configuré pour frontend
- ✅ Rate limiting (protection DDoS)
- ✅ Logging structuré

---

## 🏗️ Architecture

### Stack Technique

**Framework & Runtime**
- **NestJS 10+** - Framework Node.js progressif et modulaire
- **Node.js 18+** - Runtime JavaScript côté serveur
- **TypeScript 5+** - Langage typé pour robustesse

**Base de Données**
- **PostgreSQL 14+** - Base de données relationnelle
- **Prisma 5+** - ORM moderne et type-safe
- **Supabase** - Hébergement PostgreSQL (gratuit)

**Authentification & Sécurité**
- **Passport JWT** - Stratégie d'authentification
- **bcrypt** - Hashage sécurisé des mots de passe
- **class-validator** - Validation des DTOs
- **helmet** - Sécurisation des headers HTTP


---

## ⚙️ Installation

### Prérequis

- Node.js 18+ et npm/yarn
- PostgreSQL 14+ (local ou Supabase)
- Git

### 1. Cloner le Repository

```bash
git clone https://github.com/yeonoel/InfoEdu
cd backend
```

### 2. Installer les Dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configuration Base de Données

#### Option A : PostgreSQL Local

```bash
# Installer PostgreSQL (si pas déjà fait)
# macOS
brew install postgresql

# Linux (Ubuntu/Debian)
sudo apt-get install postgresql

# Démarrer le service
# macOS
brew services start postgresql

# Linux
sudo service postgresql start

# Créer la base de données
createdb techcampus_db
```

#### Option B : Supabase (Recommandé)

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Copiez l'URL de connexion PostgreSQL (disponible dans Settings → Database)

---

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
# Exemple local:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/techcampus_db?schema=public"
# Exemple Supabase:
# DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"

# JWT Secret (générez une clé aléatoire forte)
JWT_SECRET="votre_secret_jwt_super_securise_min_32_caracteres"
JWT_EXPIRATION="7d"

# Application
NODE_ENV="development"
PORT=3000

# CORS (URL de votre frontend)
CORS_ORIGIN="http://localhost:3000"
# En production: "https://votre-frontend.vercel.app"

# Upload d'images (optionnel si Cloudinary utilisé)
CLOUDINARY_CLOUD_NAME="votre_cloud_name"
CLOUDINARY_API_KEY="votre_api_key"
CLOUDINARY_API_SECRET="votre_api_secret"
```

> ⚠️ **Sécurité** : Ne commitez JAMAIS le fichier `.env` ! Il est dans `.gitignore`

### Générer un JWT Secret Sécurisé

```bash
# Dans votre terminal
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🗄️ Base de Données

### Initialisation avec Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Créer et appliquer les migrations
npx prisma migrate dev --name init

# Ouvrir Prisma Studio (interface graphique DB)
npx prisma studio
```

### Schéma Prisma (prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Users {
  id        Int       @id @default(autoincrement())
  username  String?
  email     String    @unique
  password  String
  role      String    @default("student")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  reviews   Reviews[]
}

model Schools {
  id           Int        @id @default(autoincrement())
  name         String
  type         String?
  commune      String?
  stateSupport String?
  priceLevel   String?
  category     String?
  logo         String?
  longitude    String?
  latitude     String?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  filieres     Filieres[]
  images       Images[]
  reviews      Reviews[]
}

model Filieres {
  id        Int      @id @default(autoincrement())
  name      String
  schoolId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  school    Schools  @relation(fields: [schoolId], references: [id], onDelete: Cascade)
}

model Reviews {
  id           Int            @id @default(autoincrement())
  userId       Int
  schoolId     Int
  comment      String?
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  reviewScores ReviewScores[]
  school       Schools        @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  user         Users          @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Criterias {
  id           Int            @id @default(autoincrement())
  label        String
  icon         String?
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  reviewScores ReviewScores[]
}

model ReviewScores {
  id         Int       @id @default(autoincrement())
  reviewId   Int
  criteriaId Int
  value      String
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
  criteria   Criterias @relation(fields: [criteriaId], references: [id], onDelete: Cascade)
  review     Reviews   @relation(fields: [reviewId], references: [id], onDelete: Cascade)

  @@unique([reviewId, criteriaId])
}

model Images {
  id       Int     @id @default(autoincrement())
  url      String
  schoolId Int
  schools  Schools @relation(fields: [schoolId], references: [id], onDelete: Cascade)
}



## 🚀 Lancement de l'Application

### Mode Développement

```bash
npm run start:dev
# ou
yarn start:dev
```

API accessible sur **http://localhost:3000**  
Documentation Swagger sur **http://localhost:3000/api**

### Mode Production

```bash
# Build
npm run build

# Lancer
npm run start:prod
```

---

## 📡 API Endpoints

### Base URL
```
Développement : http://localhost:3000
Production     : https://votre-api.render.com
```

### 🔐 Authentication

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/auth/signup` | Créer un compte | ❌ |
| POST | `/auth/signin` | Se connecter | ❌ |

**Exemple : Register**
```bash
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "usernam": "John",
  "role": "user"
}

# Réponse
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "USER"
  }
}
```

### 🏫 Schools

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/schools/all-university` | Liste toutes les écoles | ❌ |
| GET | `/schools/search?q=lycee&city=abidjan` | Rechercher | ❌ |
| GET | `/schools/detail-university/:id` | Détails d'une école | ❌ |
| POST | `/new-university` | Créer une école | ✅ Admin |
| PATCH | `/schools/update-university/:id` | Modifier une école | ✅ Admin |
| DELETE | `/schools/delete-university/:id` | Supprimer une école | ✅ Admin |

### ⭐ Reviews

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/reviews/new-review` | Créer un avis | ✅ |
| GET | `/reviews/avis-university/:schoolId` | Avis d'une école | ❌ |
| PATCH | `/reviews/update-university/:id` | Modifier son avis | ✅ |
| DELETE | `/reviews/delete-university/:id` | Supprimer son avis | ✅ |


### 2. Déploiement via GitHub

1. **Push ton code sur GitHub**

2. **Connecte-toi sur [render.com](https://render.com)**

3. **New → Web Service**

4. **Connecte ton repo GitHub**

5. **Configuration :**
   - **Name :** `techcampus-api`
   - **Environment :** `Node`
   - **Build Command :** `npm install && npm run build && npx prisma generate && npx prisma migrate deploy`
   - **Start Command :** `npm run start:prod`
   - **Instance Type :** Free (pour commencer)

6. **Variables d'environnement :**
   Ajoute dans l'onglet "Environment" :
   ```
   DATABASE_URL=postgresql://... (Supabase URL)
   JWT_SECRET=ton_secret_production
   NODE_ENV=production
   CORS_ORIGIN=https://ton-frontend.vercel.app
   ```

7. **Deploy !** ✅

### 3. Post-Déploiement

```bash
# Tester l'API en production
curl https://techcampus-api.onrender.com/health

# Vérifier Swagger
# https://techcampus-api.onrender.com/api
```

---

## 🐛 Troubleshooting

### Erreur de connexion Base de Données

**Problème :** `PrismaClientKnownRequestError: Can't reach database server`

**Solutions :**
1. Vérifiez `DATABASE_URL` dans `.env`
2. Testez la connexion : `npx prisma db pull`
3. Pour Supabase, vérifiez que l'IP de Render est autorisée

### CORS Errors

**Problème :** Frontend ne peut pas appeler l'API

**Solution :** Vérifiez `CORS_ORIGIN` dans `.env` correspond à l'URL de votre frontend

```typescript
// src/main.ts
app.enableCors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
});
```

### JWT Token Invalid

**Problème :** `401 Unauthorized` sur routes protégées

**Solutions :**
1. Vérifiez que le token est bien envoyé dans le header
2. Le `JWT_SECRET` doit être identique à celui utilisé lors de la génération du token
3. Vérifiez l'expiration du token

---

## 📁 Structure du Projet

```
backend/
├── .vscode/
├── dist/
├── generated/
├── node_modules/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── deleteAccountDto.ts
│   │   │   ├── resetPasswordConfirmation.ts
│   │   │   ├── resetPasswordDemanDto.ts
│   │   │   ├── signinDto.ts
│   │   │   └── signupDto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── strategy-service.ts
│   ├── criteria/
│   ├── health/
│   ├── mailler/
│   ├── prisma/
│   ├── review/
│   │   ├── Dto/
│   │   ├── review.controller.ts
│   │   ├── review.module.ts
│   │   └── review.service.ts
│   ├── school/
│   │   ├── Dto/
│   │   │   ├── school.controller.ts
│   │   │   ├── school.module.ts
│   │   │   └── school.service.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
├── .env
├── .env.production
├── .gitignore
├── copy-react-build.sh
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json

```

---

## 🤝 Contribution

Contributions bienvenues ! Voir [Frontend README](https://github.com/yeonoel/front-university) pour guidelines.

---

## 👨‍💻 Auteur

**[Yeo pevrogui noel]**  
Backend Developer - NestJS, node js PostgreSQL, TypeScript, Spring boot

- Email : yeopevroguinoel@gmail.com

---

## 🔗 Liens Connexes

- [Frontend Repository](https://github.com/yeonoel/front-university)
- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs)

---

**🌟 N'oubliez pas de star le repo si vous le trouvez utile !**