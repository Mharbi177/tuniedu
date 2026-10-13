export type UserRole = 'STUDENT' | 'PARENT' | 'PROFESSOR' | 'REVIEWER' | 'ADMIN';

export type AccountStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'DELETED';

export type ProfessorStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';

export type BookStatus = 'DRAFT' | 'PROCESSING' | 'IN_REVIEW' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED';

export type ProcessingStatus = 'QUEUED' | 'PROCESSING' | 'READY' | 'FAILED';

export type PurchaseStatus = 'PENDING' | 'PAID' | 'PARTIALLY_REFUNDED' | 'REFUNDED' | 'FAILED' | 'CANCELLED' | 'DISPUTED';

export type PaymentStatus = 'CREATED' | 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'EXPIRED' | 'REFUNDED' | 'DISPUTED';

export type EntitlementStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED';

export type ParentLinkStatus = 'PENDING' | 'ACTIVE' | 'REVOKED' | 'EXPIRED';

export type ExerciseType = 'MULTIPLE_CHOICE' | 'NUMERIC' | 'SHORT_TEXT' | 'LONG_TEXT' | 'FILE_UPLOAD';

export type AttemptStatus = 'IN_PROGRESS' | 'SUBMITTED' | 'GRADED';

export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type PayoutStatus = 'PENDING' | 'APPROVED' | 'PROCESSING' | 'PAID' | 'FAILED' | 'ON_HOLD';

export type LedgerEntryType = 
  | 'SALE'
  | 'PLATFORM_COMMISSION'
  | 'PAYMENT_FEE'
  | 'REFUND'
  | 'COMMISSION_REVERSAL'
  | 'PAYOUT'
  | 'PAYOUT_REVERSAL'
  | 'ADJUSTMENT';

export interface EducationLevelDTO {
  id: string;
  code: string;
  nameFr: string;
  nameAr?: string | null;
  stage: 'PRIMAIRE' | 'COLLEGE' | 'LYCEE' | 'UNIVERSITE';
  sortOrder: number;
  isActive: boolean;
}

export interface SubjectDTO {
  id: string;
  code: string;
  nameFr: string;
  nameAr?: string | null;
  isActive: boolean;
}

export interface AcademicYearDTO {
  id: string;
  name: string;
  startsAt: string; // ISO UTC
  endsAt: string;   // ISO UTC (Africa/Tunis snapshot)
  timezone: string;
  isActive: boolean;
}

export interface BookSummaryDTO {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  language: string;
  priceMillimes: number; // Stored as integer millimes (e.g., 25000 = 25.000 DT)
  currency: string;
  status: BookStatus;
  coverUrl?: string | null;
  pageCount?: number;
  professor: {
    id: string;
    displayName: string;
    verified: boolean;
  };
  level: {
    id: string;
    code: string;
    nameFr: string;
    stage: string;
  };
  subject: {
    id: string;
    code: string;
    nameFr: string;
  };
}

export interface EntitlementDTO {
  id: string;
  userId: string;
  bookId: string;
  academicYearId: string;
  status: EntitlementStatus;
  startsAt: string;
  expiresAt: string;
  grantedAt: string;
  bookTitle?: string;
  bookSlug?: string;
}

export interface PageDeliveryResponse {
  bookId: string;
  pageNumber: number;
  totalPages: number;
  watermark: {
    accountMask: string;
    transactionRef: string;
    timestamp: string;
  };
  svgDataUri?: string;
  imageUrl?: string;
  expiresAt: string;
}

export interface ExerciseDTO {
  id: string;
  chapterId: string;
  type: ExerciseType;
  prompt: string;
  options?: string[];
  difficulty: number;
  points: number;
  sortOrder: number;
  // answerKey and solution are confidential before purchase
}

export interface ExerciseCorrectionDTO {
  id: string;
  answerKey: any;
  solution: string;
  explanationFr: string;
}
