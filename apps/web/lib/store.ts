// In-memory persistent data store for TuniEdu domain services
// Simulates PostgreSQL + Prisma models with full relational integrity

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'PARENT' | 'PROFESSOR' | 'REVIEWER' | 'ADMIN';
  phone?: string;
  avatar?: string;
  professorProfile?: {
    id: string;
    displayName: string;
    biography: string;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';
    verifiedAt?: string;
    payoutReference?: string;
  };
}

export interface AcademicYear {
  id: string;
  name: string;
  startsAt: string; // ISO UTC
  endsAt: string;   // ISO UTC (Africa/Tunis snapshot)
  timezone: string;
  isActive: boolean;
}

export interface Book {
  id: string;
  professorId: string;
  professorName: string;
  educationLevelId: string;
  levelNameFr: string;
  levelNameAr?: string;
  stage: 'PRIMAIRE' | 'COLLEGE' | 'LYCEE' | 'UNIVERSITE';
  subjectId: string;
  subjectNameFr: string;
  subjectNameAr?: string;
  title: string;
  slug: string;
  description: string;
  language: string;
  currency: string;
  priceMillimes: number; // Stored as integer millimes
  status: 'DRAFT' | 'PROCESSING' | 'IN_REVIEW' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED';
  coverObjectKey?: string;
  pageCount: number;
  publishedAt?: string;
  chapters: BookChapter[];
}

export interface BookChapter {
  id: string;
  title: string;
  startPage: number;
  endPage: number;
  sortOrder: number;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  chapterId: string;
  type: 'MULTIPLE_CHOICE' | 'NUMERIC' | 'SHORT_TEXT';
  prompt: string;
  options?: string[];
  answerKey: string;
  solution: string;
  difficulty: number;
  points: number;
}

export interface Entitlement {
  id: string;
  userId: string;
  bookId: string;
  academicYearId: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  startsAt: string;
  expiresAt: string; // Snapshot of academic-year end instant in Africa/Tunis
  grantedAt: string;
  purchaseItemId: string;
}

export interface Purchase {
  id: string;
  userId: string;
  status: 'PENDING' | 'PAID' | 'REFUNDED' | 'FAILED';
  currency: string;
  totalMillimes: number;
  subtotalMillimes: number;
  discountMillimes: number;
  idempotencyKey: string;
  createdAt: string;
  paidAt?: string;
  items: PurchaseItem[];
}

export interface PurchaseItem {
  id: string;
  purchaseId: string;
  bookId: string;
  bookTitleSnapshot: string;
  unitPriceMillimes: number;
  commissionBps: number; // 1000 = 10%
}

export interface FinancialLedgerEntry {
  id: string;
  professorId: string;
  purchaseId?: string;
  type: 'SALE' | 'PLATFORM_COMMISSION' | 'PAYOUT' | 'REFUND';
  amountMillimes: number;
  currency: string;
  reference: string;
  description: string;
  createdAt: string;
}

export interface ParentChildLink {
  id: string;
  parentId: string;
  childId: string;
  status: 'PENDING' | 'ACTIVE' | 'REVOKED';
  invitationCode: string;
  createdAt: string;
}

export interface ExerciseAttempt {
  id: string;
  userId: string;
  exerciseId: string;
  submittedAnswer: string;
  isCorrect: boolean;
  score: number;
  submittedAt: string;
}

export interface StudySession {
  id: string;
  userId: string;
  bookId: string;
  activeSeconds: number;
  lastActivityAt: string;
}

// Initial Seed Dataset
const INITIAL_ACADEMIC_YEARS: AcademicYear[] = [
  {
    id: 'ay_2026_2027',
    name: '2026–2027',
    startsAt: '2026-09-15T00:00:00.000Z',
    endsAt: '2027-06-30T22:59:59.000Z', // 23:59:59 Africa/Tunis
    timezone: 'Africa/Tunis',
    isActive: true,
  },
  {
    id: 'ay_2025_2026',
    name: '2025–2026',
    startsAt: '2025-09-15T00:00:00.000Z',
    endsAt: '2026-06-30T22:59:59.000Z',
    timezone: 'Africa/Tunis',
    isActive: false,
  },
];

const INITIAL_USERS: User[] = [
  {
    id: 'user_student_1',
    name: 'Elyes Mansour',
    email: 'elyes@tuniedu.tn',
    role: 'STUDENT',
    avatar: '👨‍🎓',
  },
  {
    id: 'user_parent_1',
    name: 'Sihem Mansour',
    email: 'sihem@tuniedu.tn',
    role: 'PARENT',
    avatar: '👩‍👧',
  },
  {
    id: 'user_prof_1',
    name: 'Prof. Hichem Ben Salem',
    email: 'prof.bensalem@tuniedu.tn',
    role: 'PROFESSOR',
    avatar: '👨‍🏫',
    professorProfile: {
      id: 'prof_profile_1',
      displayName: 'Prof. Hichem Ben Salem',
      biography: 'Inspecteur pédagogique & Professeur agrégé de Mathématiques (22 ans d\'expérience dans les lycées pilotes)',
      status: 'VERIFIED',
      verifiedAt: '2026-09-01T10:00:00Z',
      payoutReference: 'TN59 0401 0000 1234 5678 9012',
    },
  },
  {
    id: 'user_prof_2',
    name: 'Prof. Aida Triki',
    email: 'prof.triki@tuniedu.tn',
    role: 'PROFESSOR',
    avatar: '👩‍🏫',
    professorProfile: {
      id: 'prof_profile_2',
      displayName: 'Prof. Aida Triki',
      biography: 'Professeure de Sciences Physiques, Sousse',
      status: 'VERIFIED',
      verifiedAt: '2026-09-05T09:30:00Z',
      payoutReference: 'TN59 1200 9876 5432 1098 7654',
    },
  },
  {
    id: 'user_admin_1',
    name: 'Mounir Driss (Admin)',
    email: 'admin@tuniedu.tn',
    role: 'ADMIN',
    avatar: '🛡️',
  },
];

const INITIAL_BOOKS: Book[] = [
  {
    id: 'book_math_9b',
    professorId: 'prof_profile_1',
    professorName: 'Prof. Hichem Ben Salem',
    educationLevelId: 'lvl_9b',
    levelNameFr: '9ème Année de Base (Neufième)',
    levelNameAr: 'السنة التاسعة أساسي (مناظرة النوفيام)',
    stage: 'COLLEGE',
    subjectId: 'subj_math',
    subjectNameFr: 'Mathématiques',
    subjectNameAr: 'الرياضيات',
    title: "L'Excellence en Mathématiques — 9ème Année de Base",
    slug: 'excellence-mathematiques-9eme-annee',
    description: 'Le manuel de référence pour réussir l\'examen national du concours d\'accès aux lycées pilotes. 120 pages de résumés clairs, théorèmes expliqués et 150 exercices avec corrigés types.',
    language: 'fr',
    currency: 'TND',
    priceMillimes: 22000, // 22.000 DT
    status: 'PUBLISHED',
    pageCount: 120,
    publishedAt: '2026-09-16T08:00:00Z',
    chapters: [
      {
        id: 'chap_1',
        title: 'Chapitre 1 : Les Nombres Réels et Racines Carrées',
        startPage: 1,
        endPage: 38,
        sortOrder: 1,
        exercises: [
          {
            id: 'ex_1',
            chapterId: 'chap_1',
            type: 'MULTIPLE_CHOICE',
            prompt: 'Soit x un nombre réel négatif tel que x² = 7. Quelle est la valeur de x ?',
            options: ['-√7', '√7', '-7/2', 'Impossible'],
            answerKey: '-√7',
            solution: 'L\'équation x² = 7 admet deux solutions réelles distinctes : √7 et -√7. La condition imposée x < 0 implique immédiatement que x = -√7.',
            points: 2,
            difficulty: 1,
          },
          {
            id: 'ex_2',
            chapterId: 'chap_1',
            type: 'NUMERIC',
            prompt: 'Calculer la valeur décimale exacte de l\'expression : A = √(36) + √(64) - √(25)',
            answerKey: '9',
            solution: 'On calcule successivement chaque racine carrée : √36 = 6, √64 = 8, et √25 = 5. Donc A = 6 + 8 - 5 = 14 - 5 = 9.',
            points: 3,
            difficulty: 1,
          },
          {
            id: 'ex_3',
            chapterId: 'chap_1',
            type: 'MULTIPLE_CHOICE',
            prompt: 'L\'expression développée et réduite de (2x - 3)² est :',
            options: ['4x² - 12x + 9', '4x² - 9', '4x² + 12x + 9', '2x² - 6x + 9'],
            answerKey: '4x² - 12x + 9',
            solution: 'On applique l\'identité remarquable (a - b)² = a² - 2ab + b² avec a = 2x et b = 3. On obtient (2x)² - 2*(2x)*3 + 3² = 4x² - 12x + 9.',
            points: 3,
            difficulty: 2,
          },
        ],
      },
      {
        id: 'chap_2',
        title: 'Chapitre 2 : Théorème de Thalès et Trigonométrie',
        startPage: 39,
        endPage: 82,
        sortOrder: 2,
        exercises: [
          {
            id: 'ex_4',
            chapterId: 'chap_2',
            type: 'MULTIPLE_CHOICE',
            prompt: 'Dans un triangle ABC rectangle en A, si AB = 3 et AC = 4, que vaut le cosinus de l\'angle B (cos ABC) ?',
            options: ['3/5', '4/5', '3/4', '5/3'],
            answerKey: '3/5',
            solution: 'Par le théorème de Pythagore, l\'hypoténuse BC = √(3² + 4²) = 5. Par définition, cos(ABC) = Côté adjacent / Hypoténuse = AB / BC = 3/5.',
            points: 4,
            difficulty: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'book_phys_8b',
    professorId: 'prof_profile_2',
    professorName: 'Prof. Aida Triki',
    educationLevelId: 'lvl_8b',
    levelNameFr: '8ème Année de Base',
    levelNameAr: 'السنة الثامنة أساسي',
    stage: 'COLLEGE',
    subjectId: 'subj_phys',
    subjectNameFr: 'Sciences Physiques',
    subjectNameAr: 'العلوم الفيزيائية',
    title: 'Physique & Chimie — Guide Méthodique 8ème Année',
    slug: 'physique-chimie-8eme-annee',
    description: 'Comprendre l\'électricité, la pression, la structure atomique et les réactions chimiques avec des schémas d\'expériences interactifs.',
    language: 'fr',
    currency: 'TND',
    priceMillimes: 18500, // 18.500 DT
    status: 'PUBLISHED',
    pageCount: 96,
    publishedAt: '2026-09-20T11:00:00Z',
    chapters: [],
  },
  {
    id: 'book_math_7b',
    professorId: 'prof_profile_1',
    professorName: 'Prof. Hichem Ben Salem',
    educationLevelId: 'lvl_7b',
    levelNameFr: '7ème Année de Base',
    levelNameAr: 'السنة السابعة أساسي',
    stage: 'COLLEGE',
    subjectId: 'subj_math',
    subjectNameFr: 'Mathématiques',
    subjectNameAr: 'الرياضيات',
    title: 'Fondations Mathématiques — 7ème Année de Base',
    slug: 'fondations-mathematiques-7eme-annee',
    description: 'Une passerelle rassurante pour maîtriser les décimaux, les fractions, les médiatrices et angles au collège.',
    language: 'fr',
    currency: 'TND',
    priceMillimes: 19000, // 19.000 DT
    status: 'PUBLISHED',
    pageCount: 110,
    publishedAt: '2026-09-18T14:00:00Z',
    chapters: [],
  },
  {
    id: 'book_sixieme_6p',
    professorId: 'prof_profile_1',
    professorName: 'Prof. Hichem Ben Salem',
    educationLevelId: 'lvl_6p',
    levelNameFr: '6ème Année Primaire (Sixième)',
    levelNameAr: 'السنة السادسة ابتدائي (السيزيام)',
    stage: 'PRIMAIRE',
    subjectId: 'subj_math',
    subjectNameFr: 'Mathématiques',
    subjectNameAr: 'الرياضيات',
    title: 'Le Passeport Sixième — Concours Pilote Primaire',
    slug: 'passeport-sixieme-concours-pilote',
    description: '200 problèmes de logique, calcul mental et géométrie pour préparer les enfants au concours d\'entrée aux collèges pilotes.',
    language: 'fr',
    currency: 'TND',
    priceMillimes: 16000, // 16.000 DT
    status: 'PUBLISHED',
    pageCount: 88,
    publishedAt: '2026-09-12T09:00:00Z',
    chapters: [],
  },
  {
    id: 'book_univ_math',
    professorId: 'prof_profile_1',
    professorName: 'Prof. Hichem Ben Salem',
    educationLevelId: 'lvl_univ',
    levelNameFr: 'Université — Mathématiques',
    levelNameAr: 'التعليم العالي — رياضيات عامة',
    stage: 'UNIVERSITE',
    subjectId: 'subj_math',
    subjectNameFr: 'Mathématiques',
    subjectNameAr: 'الرياضيات',
    title: 'Algèbre Linéaire & Calcul Différentiel — Université',
    slug: 'algebre-lineaire-calcul-differentiel',
    description: 'Espaces vectoriels de dimension finie, diagonalisation et intégrales multiples pour étudiants en licence universitaire et prépa.',
    language: 'fr',
    currency: 'TND',
    priceMillimes: 35000, // 35.000 DT
    status: 'PUBLISHED',
    pageCount: 220,
    publishedAt: '2026-10-01T10:00:00Z',
    chapters: [],
  },
];

// Seeded Initial Entitlement for Student Elyes on 9ème Math book!
const INITIAL_ENTITLEMENTS: Entitlement[] = [
  {
    id: 'ent_elyes_math9',
    userId: 'user_student_1',
    bookId: 'book_math_9b',
    academicYearId: 'ay_2026_2027',
    status: 'ACTIVE',
    startsAt: '2026-09-16T09:00:00.000Z',
    expiresAt: '2027-06-30T22:59:59.000Z', // Snapshot of academic year end
    grantedAt: '2026-09-16T09:00:00.000Z',
    purchaseItemId: 'item_init_1',
  },
];

const INITIAL_PARENT_LINKS: ParentChildLink[] = [
  {
    id: 'link_sihem_elyes',
    parentId: 'user_parent_1',
    childId: 'user_student_1',
    status: 'ACTIVE',
    invitationCode: 'TUN-9842',
    createdAt: '2026-09-17T10:00:00Z',
  },
];

const INITIAL_STUDY_SESSIONS: StudySession[] = [
  {
    id: 'sess_1',
    userId: 'user_student_1',
    bookId: 'book_math_9b',
    activeSeconds: 5400, // 1h 30m
    lastActivityAt: '2026-10-11T17:30:00Z',
  },
];

const INITIAL_ATTEMPTS: ExerciseAttempt[] = [
  {
    id: 'att_1',
    userId: 'user_student_1',
    exerciseId: 'ex_1',
    submittedAnswer: '-√7',
    isCorrect: true,
    score: 2,
    submittedAt: '2026-10-10T14:20:00Z',
  },
  {
    id: 'att_2',
    userId: 'user_student_1',
    exerciseId: 'ex_2',
    submittedAnswer: '9',
    isCorrect: true,
    score: 3,
    submittedAt: '2026-10-10T14:25:00Z',
  },
];

const INITIAL_LEDGER: FinancialLedgerEntry[] = [
  {
    id: 'led_1',
    professorId: 'prof_profile_1',
    type: 'SALE',
    amountMillimes: 22000,
    currency: 'TND',
    reference: 'SALE-2026-0001',
    description: 'Vente: L\'Excellence en Mathématiques — 9ème Année',
    createdAt: '2026-09-16T09:00:00Z',
  },
  {
    id: 'led_2',
    professorId: 'prof_profile_1',
    type: 'PLATFORM_COMMISSION',
    amountMillimes: 2200, // 10% of 22000 = 2200 millimes
    currency: 'TND',
    reference: 'COMM-2026-0001',
    description: 'Commission TuniEdu (1000 bps = 10%)',
    createdAt: '2026-09-16T09:00:00Z',
  },
];

// Singleton Store Pattern for dev session persistence
class TuniEduStore {
  users: User[] = [...INITIAL_USERS];
  academicYears: AcademicYear[] = [...INITIAL_ACADEMIC_YEARS];
  books: Book[] = [...INITIAL_BOOKS];
  entitlements: Entitlement[] = [...INITIAL_ENTITLEMENTS];
  purchases: Purchase[] = [];
  ledger: FinancialLedgerEntry[] = [...INITIAL_LEDGER];
  parentLinks: ParentChildLink[] = [...INITIAL_PARENT_LINKS];
  studySessions: StudySession[] = [...INITIAL_STUDY_SESSIONS];
  attempts: ExerciseAttempt[] = [...INITIAL_ATTEMPTS];

  // Active simulated user for testing personas
  currentUserId: string = 'user_student_1';

  getCurrentUser(): User {
    return this.users.find((u) => u.id === this.currentUserId) || this.users[0];
  }

  setCurrentUser(userId: string) {
    const found = this.users.find((u) => u.id === userId);
    if (found) {
      this.currentUserId = userId;
    }
  }

  getActiveAcademicYear(): AcademicYear {
    const active = this.academicYears.find((ay) => ay.isActive);
    if (!active) {
      return this.academicYears[0];
    }
    return active;
  }

  hasActiveEntitlement(userId: string, bookId: string, currentInstant?: string): boolean {
    const now = currentInstant || '2026-10-12T12:00:00.000Z';
    return this.entitlements.some((e) => {
      return (
        e.userId === userId &&
        e.bookId === bookId &&
        e.status === 'ACTIVE' &&
        e.startsAt <= now &&
        now < e.expiresAt
      );
    });
  }

  getEntitlement(userId: string, bookId: string): Entitlement | undefined {
    return this.entitlements.find((e) => e.userId === userId && e.bookId === bookId);
  }

  /**
   * Executes Checkout & Payment atomic reconciliation
   * SEC-04: Server fetches book prices from database/store, NEVER trusts client-submitted price
   * Rule: Snapshot academic year end into entitlement
   * Rule: 10% platform commission ledger entry (1000 bps)
   */
  processCheckout(params: {
    userId: string;
    bookIds: string[];
    paymentProvider: 'FLOUCI' | 'KONNECT' | 'GPG';
    idempotencyKey: string;
  }): { purchase: Purchase; entitlements: Entitlement[]; error?: string } {
    // Check idempotency
    const existing = this.purchases.find((p) => p.idempotencyKey === params.idempotencyKey);
    if (existing) {
      const userEntitlements = this.entitlements.filter((e) =>
        existing.items.some((item) => item.bookId === e.bookId && e.userId === params.userId)
      );
      return { purchase: existing, entitlements: userEntitlements };
    }

    const activeYear = this.getActiveAcademicYear();
    const purchasedBooks: Book[] = [];

    let subtotalMillimes = 0;
    for (const bId of params.bookIds) {
      const book = this.books.find((b) => b.id === bId);
      if (!book) {
        return { purchase: null as any, entitlements: [], error: `Manuel introuvable: ${bId}` };
      }
      purchasedBooks.push(book);
      subtotalMillimes += book.priceMillimes; // Price from server only!
    }

    const purchaseId = `purch_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const nowIso = new Date().toISOString();

    const items: PurchaseItem[] = purchasedBooks.map((b, idx) => ({
      id: `item_${purchaseId}_${idx + 1}`,
      purchaseId,
      bookId: b.id,
      bookTitleSnapshot: b.title,
      unitPriceMillimes: b.priceMillimes,
      commissionBps: 1000, // 10%
    }));

    const newPurchase: Purchase = {
      id: purchaseId,
      userId: params.userId,
      status: 'PAID', // In real sandbox, webhook sets PAID; simulator marks confirmed
      currency: 'TND',
      totalMillimes: subtotalMillimes,
      subtotalMillimes,
      discountMillimes: 0,
      idempotencyKey: params.idempotencyKey,
      createdAt: nowIso,
      paidAt: nowIso,
      items,
    };
    this.purchases.push(newPurchase);

    // Grant Entitlements with explicit snapshot of academic-year end instant
    const createdEntitlements: Entitlement[] = [];
    for (let i = 0; i < purchasedBooks.length; i++) {
      const book = purchasedBooks[i];
      const item = items[i];

      // Remove any prior expired entitlement for clean record
      this.entitlements = this.entitlements.filter(
        (e) => !(e.userId === params.userId && e.bookId === book.id && e.academicYearId === activeYear.id)
      );

      const ent: Entitlement = {
        id: `ent_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        userId: params.userId,
        bookId: book.id,
        academicYearId: activeYear.id,
        status: 'ACTIVE',
        startsAt: nowIso,
        expiresAt: activeYear.endsAt, // CRITICAL: Snapshotted instant in Africa/Tunis!
        grantedAt: nowIso,
        purchaseItemId: item.id,
      };
      this.entitlements.push(ent);
      createdEntitlements.push(ent);

      // Financial Ledger: Gross Sale
      this.ledger.push({
        id: `led_sale_${Date.now()}_${i}`,
        professorId: book.professorId,
        purchaseId: newPurchase.id,
        type: 'SALE',
        amountMillimes: book.priceMillimes,
        currency: 'TND',
        reference: `SALE-${newPurchase.id}-${i + 1}`,
        description: `Vente: ${book.title}`,
        createdAt: nowIso,
      });

      // Financial Ledger: 10% Platform Commission
      const commissionMillimes = Math.round((book.priceMillimes * 1000) / 10000);
      this.ledger.push({
        id: `led_comm_${Date.now()}_${i}`,
        professorId: book.professorId,
        purchaseId: newPurchase.id,
        type: 'PLATFORM_COMMISSION',
        amountMillimes: commissionMillimes,
        currency: 'TND',
        reference: `COMM-${newPurchase.id}-${i + 1}`,
        description: `Commission plateforme (10%) pour ${book.title}`,
        createdAt: nowIso,
      });
    }

    return { purchase: newPurchase, entitlements: createdEntitlements };
  }

  submitExerciseAttempt(userId: string, exerciseId: string, answer: string): ExerciseAttempt {
    let targetEx: Exercise | undefined;
    for (const b of this.books) {
      for (const ch of b.chapters) {
        const found = ch.exercises.find((e) => e.id === exerciseId);
        if (found) {
          targetEx = found;
          break;
        }
      }
    }

    const isCorrect = targetEx ? targetEx.answerKey.trim().toLowerCase() === answer.trim().toLowerCase() : false;
    const score = isCorrect ? (targetEx?.points || 1) : 0;

    const attempt: ExerciseAttempt = {
      id: `att_${Date.now()}`,
      userId,
      exerciseId,
      submittedAnswer: answer,
      isCorrect,
      score,
      submittedAt: new Date().toISOString(),
    };
    this.attempts.push(attempt);
    return attempt;
  }

  recordPayout(professorId: string, amountMillimes: number, reference?: string): FinancialLedgerEntry {
    const entry: FinancialLedgerEntry = {
      id: `led_payout_${Date.now()}`,
      professorId,
      type: 'PAYOUT',
      amountMillimes,
      currency: 'TND',
      reference: reference || `BCT-VIR-${Date.now().toString().slice(-6)}`,
      description: `Virement bancaire de redevances (${(amountMillimes / 1000).toFixed(3)} DT)`,
      createdAt: new Date().toISOString(),
    };
    this.ledger.push(entry);
    return entry;
  }
}

// Global Singleton to preserve data across HMR in development
const globalForStore = globalThis as unknown as { tunieduStore?: TuniEduStore };

export const store = globalForStore.tunieduStore ?? new TuniEduStore();
if (process.env.NODE_ENV !== 'production') globalForStore.tunieduStore = store;
