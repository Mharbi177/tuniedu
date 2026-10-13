export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export interface CreateBookInput {
  title: string;
  educationLevelId: string;
  subjectId: string;
  priceMillimes: number;
  description?: string;
  language?: string;
}

export function validateCreateBook(input: any): ValidationResult<CreateBookInput> {
  const errors: Record<string, string> = {};
  if (!input.title || typeof input.title !== 'string' || input.title.trim().length < 3) {
    errors.title = 'Le titre doit comporter au moins 3 caractères';
  }
  if (!input.educationLevelId || typeof input.educationLevelId !== 'string') {
    errors.educationLevelId = 'Niveau scolaire obligatoire';
  }
  if (!input.subjectId || typeof input.subjectId !== 'string') {
    errors.subjectId = 'Matière obligatoire';
  }
  const price = Number(input.priceMillimes);
  if (isNaN(price) || !Number.isInteger(price) || price <= 0) {
    errors.priceMillimes = 'Le prix doit être un entier positif en millimes (ex: 20000 = 20 DT)';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, error: 'Validation échouée', fieldErrors: errors };
  }
  return {
    success: true,
    data: {
      title: input.title.trim(),
      educationLevelId: input.educationLevelId,
      subjectId: input.subjectId,
      priceMillimes: price,
      description: input.description?.trim(),
      language: input.language || 'fr',
    },
  };
}

// CRITICAL SECURITY RULE: SEC-04 - Server MUST ignore client priceMillimes!
export interface CheckoutInput {
  bookIds: string[];
  paymentProvider: 'FLOUCI' | 'KONNECT' | 'GPG';
  idempotencyKey: string;
}

export function validateCheckout(input: any): ValidationResult<CheckoutInput> {
  const errors: Record<string, string> = {};
  if (!input.bookIds || !Array.isArray(input.bookIds) || input.bookIds.length === 0) {
    errors.bookIds = 'Au moins un manuel doit être sélectionné pour le panier';
  }
  if (!input.paymentProvider || !['FLOUCI', 'KONNECT', 'GPG'].includes(input.paymentProvider)) {
    errors.paymentProvider = 'Fournisseur de paiement invalide (options: FLOUCI, KONNECT, GPG)';
  }
  if (!input.idempotencyKey || typeof input.idempotencyKey !== 'string') {
    errors.idempotencyKey = 'Clé d\'idempotence obligatoire';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, error: 'Données de paiement invalides', fieldErrors: errors };
  }
  return {
    success: true,
    data: {
      bookIds: input.bookIds,
      paymentProvider: input.paymentProvider,
      idempotencyKey: input.idempotencyKey,
    },
  };
}
