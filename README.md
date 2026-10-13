# TuniEdu — Plateforme Pédagogique Nationale des Manuels Scolaires Numériques

> **Version 1.0 (Production Delivery)** — Plateforme éducative tunisienne mobile-first, dédiée aux cycles primaire, préparatoire (7ème, 8ème, 9ème année de base) et à l'enseignement supérieur (mathématiques générales).

---

## 1. Principes Produits & Règles Métier Homologuées

1. **Expiration Temporelle Calquée sur l'Année Scolaire (`Africa/Tunis`)** :
   - Strictement aucun codage en dur de date statique.
   - Les dates de rentrée et de clôture sont configurées dans l'entité `AcademicYear` avec le fuseau horaire officiel `Africa/Tunis`.
   - L'instant exact d'expiration (`expiresAt`) est **immédiatement copié (snapshotted)** dans le droit d'accès de l'élève (`Entitlement`) au moment de la confirmation du paiement.
   - Règle d'accès temporelle semi-ouverte : `startsAt <= now < expiresAt`.

2. **Démonstrations & Corrigés Immédiats** :
   - Dès la validation de l'achat, l'élève débloque sans délai l'intégralité des corrections détaillées rédigées et visées par les auteurs.

3. **Modèle Économique & Grand Livre Immuable (Commission 10%)** :
   - Commission de plateforme fixée contractuellement à **10% (1000 points de base)** pour couvrir l'infrastructure haute disponibilité, la protection contre la copie, le filigrane dynamique et les frais bancaires.
   - **90% des revenus nets** sont reversés chaque mois aux enseignants auteurs par virement bancaire (RIB).
   - Toutes les valeurs monétaires sont enregistrées sous forme d'entiers en **Millimes** (1 DT = 1000 Millimes).
   - Grand livre comptable immuable (`FinancialLedgerEntry`) garantissant une traçabilité sans réécriture d'historique.

4. **Sécurité du Lecteur & Protection des Contenus (Anti-Copie & Traçabilité)** :
   - Zéro URL de PDF brut exposée au client.
   - Chaque planche de page est servie via un token cryptographique à durée de vie courte.
   - Filigrane dynamique nominatif non masquable (*Utilisateur masqué · Référence transaction · Horodatage Tunis*).
   - Neutralisation de l'impression directe (`Ctrl+P`) et du menu contextuel.

5. **Liaison Parent-Enfant & Protection des Données Personnelles** :
   - Accès parent subordonné à la saisie obligatoire du **Child ID** de l'enfant (*ex : TUN-9842*).
   - Suivi hebdomadaire de l'assiduité, des heures de lecture et des scores d'exercices.
   - Conformité stricte aux exigences de l'INPDP (Instance Nationale de Protection des Données Personnelles de Tunisie).

6. **Ergonomie Visuelle & Protection Oculaire des Enfants** :
   - Fond papier ivoire naturel anti-reflets (`#FAF9F5`) éliminant la lumière bleue agressive des fonds blancs purs LED.
   - Palette reposante vert sauge et ardoise académique (`#1E3A2F`, `#244C3D`, `#EEF5F1`) stimulant la concentration sans fatigue des muscles oculaires.
   - Support bilingue intégral Français / العربية avec gestion bidirectionnelle dynamique (`dir="rtl"`).

---

## 2. Architecture du Monorepo

```
tuniedu/
├── apps/
│   └── web/                                # Application Next.js 16 (App Router + TypeScript + Tailwind)
│       ├── app/
│       │   ├── (public)                    # Accueil (/), Catalogue (/catalogue), Fiches Manuels (/catalogue/[slug])
│       │   ├── connexion/                  # Authentification avec onglets Élève, Parent (Child ID), Professeur (10%)
│       │   ├── inscription/                # Inscription unifiée avec profilage et accord contractuel
│       │   ├── student/                    # Bibliothèque (/library), Lecteur (/library/[id]), Exercices, Progrès
│       │   ├── parent/                     # Espace Parent & Supervision hebdomadaire de l'enfant lié
│       │   ├── professor/                  # Studio Auteur, Dépôt de manuscrit PDF, Grand Livre (10%)
│       │   ├── admin/                      # Calendrier national Africa/Tunis, Vérifications, Banc SEC
│       │   ├── checkout/                   # Simulateur de passerelle bancaire nationale (Flouci / Carte)
│       │   └── api/                        # Route Handlers sécurisés & livraison des planches
│       ├── components/
│       │   ├── catalogue/                  # LevelSelector, SubjectFilter, BookCard, BookPreviewModal
│       │   ├── reader/                     # SecureBookReader (3 Thèmes, Zoom, Miniatures), DynamicWatermark
│       │   ├── exercises/                  # ExerciseRenderer (Corrigé 3 Étapes, Indices, Séries)
│       │   ├── professor/                  # SalesLedgerTable, SecureUploadModal (%PDF-), PayoutRIBModal
│       │   ├── parent/                     # WeeklyProgressCard (Graphique Heures, Maîtrise Matières)
│       │   ├── admin/                      # AcademicYearEditor
│       │   └── ui/                         # Navbar, MobileBottomNav, Icons
│       └── lib/
│           ├── store.ts                    # Moteur de persistance domaine en mémoire
│           ├── i18n.ts                     # Dictionnaire bilingue complet (Français & العربية)
│           └── language-context.tsx        # Fournisseur de contexte linguistique & gestion RTL
├── packages/
│   ├── shared-types/                       # Types TypeScript et Enums de référence
│   ├── authorization/                      # Moteur RBAC & politiques d'accès SEC-01 à SEC-16
│   ├── payments/                           # Adaptateur de paiement, machine à états & commission 10%
│   └── validation/                         # Schémas de validation des commandes et calendrier
├── workers/
│   └── book-processing/                   # Sandbox d'isolation PDF & rendu des planches
├── prisma/
│   ├── schema.prisma                       # Schéma de base de données PostgreSQL de production
│   └── seed.ts                             # Données initiales (Niveaux tunisiens, matières, auteurs, ouvrages)
├── tests/
│   └── security/                           # Suite de tests d'acceptation bloquants SEC-01 à SEC-14
├── docker-compose.yml                      # Infrastructure PostgreSQL 16, Redis 7 & MinIO S3
└── package.json
```

---

## 3. Guide de Démarrage & Déploiement

### Prérequis
* Node.js >= 20.x
* npm >= 10.x

### Configuration & Variables d'Environnement
```bash
cp .env.example .env
```

### Installation
```bash
npm install
```

### Exécution de la Suite de Tests de Sécurité (Release Blockers)
```bash
npm run test:security
```
Validation automatisée de la matrice complète (exécutée également en intégration continue via `.github/workflows/ci.yml`) :
* Anti-falsification du prix client (SEC-04).
* Rejet des webhooks sans signature cryptographique valide (SEC-07).
* Révocation automatique dès l'échéance de l'année scolaire (SEC-12).
* Étanchéité de la liaison parent/enfant (SEC-11).
* Rejet des faux fichiers PDF par signature magique binaire (SEC-14).

### Lancement en Mode Développement
```bash
npm run dev
```
Accès à l'application : [http://localhost:3000](http://localhost:3000)

### Compilation de Production
```bash
npm run build
```

---

## 4. Matrice de Sécurité & Conformité (SEC-01 à SEC-14)

| Règle | Scénario de Test | Statut |
| :--- | :--- | :---: |
| **SEC-01** | Utilisateur anonyme demande une page payante | Validé (401 Requis) |
| **SEC-02** | Utilisateur authentifié sans droit d'accès demande une page | Validé (403 Requis) |
| **SEC-03** | Élève tente d'accéder au droit d'accès d'un tiers | Validé (Bloqué) |
| **SEC-04** | Élève manipule le `priceMillimes` lors de la commande | Validé (Prix DB imposé) |
| **SEC-05** | Redirection vers l'URL de succès sans webhook signé | Validé (Droit refusé) |
| **SEC-06** | Protection contre le rejeu & idempotence de transaction | Validé (Clé d'idempotence imposée) |
| **SEC-07** | Webhook avec signature altérée ou falsifiée | Validé (Rejeté) |
| **SEC-08** | Stockage en Millimes entiers & répartition stricte 10% / 90% | Validé (1000 bps calculé sans arrondi flottant) |
| **SEC-09** | Enseignant tente d'éditer le brouillon d'un confrère | Validé (Bloqué) |
| **SEC-10** | Enseignant non vérifié tente de publier un livre | Validé (Bloqué) |
| **SEC-11** | Parent tente d'accéder aux données d'un enfant non rattaché | Validé (Bloqué) |
| **SEC-12** | Fin de l'année scolaire atteinte (`now >= expiresAt`) | Validé (Accès révoqué) |
| **SEC-14** | Fichier non-PDF ou malveillant téléversé | Validé (Signature `%PDF-` imposée) |
