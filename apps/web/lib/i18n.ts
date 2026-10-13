// Bilingual Internationalization (Français & العربية) for TuniEdu Production Platform

export type Language = 'fr' | 'ar';

export interface Translations {
  appName: string;
  appSubtitle: string;
  tagline: string;
  officialProgramme: string;
  nav: {
    home: string;
    catalogue: string;
    library: string;
    progress: string;
    parent: string;
    professor: string;
    admin: string;
    search: string;
    mySpace: string;
    signIn: string;
    signUp: string;
    signOut: string;
  };
  levels: {
    all: string;
    primary: string;
    college: string;
    secondary: string;
    university: string;
    p6: string;
    c7: string;
    c8: string;
    c9: string;
    univMath: string;
  };
  subjects: {
    all: string;
    math: string;
    phys: string;
    svt: string;
    ara: string;
    fra: string;
    eng: string;
    info: string;
  };
  reader: {
    contents: string;
    page: string;
    of: string;
    previous: string;
    next: string;
    exercises: string;
    zoom: string;
    watermarkNotice: string;
    copyrightNotice: string;
    expiredTitle: string;
    expiredDesc: string;
    renewAction: string;
  };
  exercises: {
    title: string;
    instruction: string;
    multipleChoice: string;
    numericCalculation: string;
    points: string;
    difficulty: string;
    submitAnswer: string;
    retry: string;
    nextExercise: string;
    correctAnswer: string;
    incorrectAnswer: string;
    officialSolution: string;
    lockedSolution: string;
    unlockCta: string;
  };
  professor: {
    studioTitle: string;
    verifiedStatus: string;
    uploadPdf: string;
    publishedBooks: string;
    drafts: string;
    salesBreakdown: string;
    grossSales: string;
    platformCommission: string;
    netEarnings: string;
    requestPayout: string;
    ribLabel: string;
    ledgerTitle: string;
  };
  parent: {
    title: string;
    subtitle: string;
    linkedChild: string;
    weeklyStudyHours: string;
    completedExercises: string;
    quizAverage: string;
    weakTopics: string;
    inviteCode: string;
    copyCode: string;
    privacyNotice: string;
  };
  admin: {
    title: string;
    subtitle: string;
    calendarTab: string;
    securityTab: string;
    professorsTab: string;
    activeYear: string;
    endInstant: string;
    timezoneLabel: string;
    runSecurityTests: string;
  };
  footer: {
    legal: string;
    ministryCompliance: string;
    terms: string;
    privacy: string;
    minorProtection: string;
  };
}

export const DICTIONARY: Record<Language, Translations> = {
  fr: {
    appName: 'TuniEdu',
    appSubtitle: 'Plateforme Pédagogique Nationale',
    tagline: 'Ouvrages scolaires officiels, exercices types et corrections pas à pas rédigés par les enseignants tunisiens.',
    officialProgramme: 'Conforme aux programmes du Ministère de l\'Éducation',
    nav: {
      home: 'Accueil',
      catalogue: 'Catalogue des Manuels',
      library: 'Ma Bibliothèque',
      progress: 'Mes Progrès & Évaluations',
      parent: 'Espace Parents',
      professor: 'Studio Enseignant',
      admin: 'Administration',
      search: 'Rechercher un manuel...',
      mySpace: 'Mon Espace',
      signIn: 'Connexion',
      signUp: 'Inscription',
      signOut: 'Déconnexion',
    },
    levels: {
      all: 'Tous les niveaux',
      primary: 'Enseignement Primaire',
      college: 'Collège (7ème, 8ème, 9ème)',
      secondary: 'Enseignement Secondaire (Lycée)',
      university: 'Enseignement Supérieur',
      p6: '6ème Année Primaire (Concours Sixième)',
      c7: '7ème Année de Base',
      c8: '8ème Année de Base',
      c9: '9ème Année de Base (Concours Neufième)',
      univMath: 'Université — Mathématiques Générales',
    },
    subjects: {
      all: 'Toutes les matières',
      math: 'Mathématiques',
      phys: 'Sciences Physiques & Chimie',
      svt: 'Sciences de la Vie et de la Terre',
      ara: 'Langue Arabe',
      fra: 'Langue Française',
      eng: 'Langue Anglaise',
      info: 'Informatique & Algorithmique',
    },
    reader: {
      contents: 'Sommaire & Chapitres',
      page: 'Page',
      of: 'sur',
      previous: 'Page précédente',
      next: 'Page suivante',
      exercises: 'Exercices & Corrigés',
      zoom: 'Zoom',
      watermarkNotice: 'Document protégé par le droit d\'auteur · Traçabilité active',
      copyrightNotice: 'Reproduction et diffusion interdites sans autorisation écrite de l\'auteur.',
      expiredTitle: 'Période de validité expirée',
      expiredDesc: 'L\'accès à cet ouvrage a pris fin au terme de l\'année scolaire configurée (fuseau Africa/Tunis).',
      renewAction: 'Renouveler l\'accès pour l\'année en cours',
    },
    exercises: {
      title: 'Travaux Pratiques & Évaluation',
      instruction: 'Résolvez l\'exercice puis accédez à la démonstration pédagogique officielle.',
      multipleChoice: 'Question à Choix Multiple (QCM)',
      numericCalculation: 'Calcul Numérique Exact',
      points: 'points',
      difficulty: 'Niveau d\'exigence',
      submitAnswer: 'Valider la réponse',
      retry: 'Recommencer',
      nextExercise: 'Exercice suivant',
      correctAnswer: 'Réponse exacte. Démonstration validée.',
      incorrectAnswer: 'Réponse erronée. Consultez la démarche détaillée ci-dessous.',
      officialSolution: 'Corrigé officiel détaillé et méthode de rédaction',
      lockedSolution: 'Démonstration réservée aux élèves disposant du droit d\'accès à l\'ouvrage.',
      unlockCta: 'Acquérir l\'accès au manuel pour débloquer les corrigés',
    },
    professor: {
      studioTitle: 'Espace Pédagogique Auteur',
      verifiedStatus: 'Enseignant Agréé & Vérifié',
      uploadPdf: 'Déposer une nouvelle édition (PDF)',
      publishedBooks: 'Ouvrages en distribution',
      drafts: 'Manuscrit en révision',
      salesBreakdown: 'Bilan comptable des ventes',
      grossSales: 'Ventes Brutes (100%)',
      platformCommission: 'Commission Plateforme (10% · 1000 bps)',
      netEarnings: 'Rémunération Nette Auteur (90%)',
      requestPayout: 'Demander un virement bancaire (RIB)',
      ribLabel: 'Référence Bancaire (RIB Tunisie)',
      ledgerTitle: 'Grand Livre Comptable Immuable',
    },
    parent: {
      title: 'Espace Parents & Tuteurs Légaux',
      subtitle: 'Suivi rigoureux de l\'assiduité et des performances scolaires de l\'élève.',
      linkedChild: 'Élève rattaché au compte',
      weeklyStudyHours: 'Temps d\'étude hebdomadaire',
      completedExercises: 'Exercices résolus',
      quizAverage: 'Taux de réussite aux évaluations',
      weakTopics: 'Notions fondamentales à consolider',
      inviteCode: 'Code d\'appairage sécurisé',
      copyCode: 'Copier le code',
      privacyNotice: 'Conformité INPDP : protection stricte des données personnelles des mineurs.',
    },
    admin: {
      title: 'Direction Pédagogique & Administration',
      subtitle: 'Gestion du calendrier scolaire national, modération des publications et conformité financière.',
      calendarTab: 'Calendrier National (Africa/Tunis)',
      securityTab: 'Matrice de Sécurité (SEC-01 à SEC-14)',
      professorsTab: 'Homologation des Enseignants',
      activeYear: 'Année scolaire active',
      endInstant: 'Instant d\'expiration contractuel',
      timezoneLabel: 'Fuseau horaire imposé',
      runSecurityTests: 'Exécuter l\'audit de conformité sécurité',
    },
    footer: {
      legal: 'Tous droits réservés. Plateforme homologuée.',
      ministryCompliance: 'Conforme aux orientations méthodologiques du Ministère de l\'Éducation de la République Tunisienne.',
      terms: 'Conditions Générales d\'Utilisation',
      privacy: 'Politique de Confidentialité',
      minorProtection: 'Protection des Données des Mineurs',
    },
  },
  ar: {
    appName: 'توني إيدو',
    appSubtitle: 'المنصة البيداغوجية الوطنية',
    tagline: 'الكتب المدرسية الرسمية، التمارين النموذجية والإصلاحات المفصلة خطوة بخطوة من إعداد أساتذة تونسيين معتمدين.',
    officialProgramme: 'مطابق للبرامج الرسمية لوزارة التربية بالجمهورية التونسية',
    nav: {
      home: 'الرئيسية',
      catalogue: 'دليل الكتب المدرسية',
      library: 'مكتبتي الرقمية',
      progress: 'تقدمي والتقييمات',
      parent: 'فضاء الولي',
      professor: 'فضاء الأستاذ المؤلّف',
      admin: 'الإدارة المركزية',
      search: 'بحث عن كتاب أو أستاذ...',
      mySpace: 'فضائي الخاص',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب جديد',
      signOut: 'تسجيل الخروج',
    },
    levels: {
      all: 'جميع المستويات',
      primary: 'التعليم الابتدائي',
      college: 'التعليم الأساسي (السابعة، الثامنة، والتاسعة)',
      secondary: 'التعليم الثانوي',
      university: 'التعليم العالي',
      p6: 'السنة السادسة ابتدائي (مناظرة السيزيام)',
      c7: 'السنة السابعة أساسي',
      c8: 'السنة الثامنة أساسي',
      c9: 'السنة التاسعة أساسي (مناظرة النوفيام)',
      univMath: 'التعليم العالي — رياضيات عامة',
    },
    subjects: {
      all: 'جميع المواد',
      math: 'الرياضيات',
      phys: 'العلوم الفيزيائية والتكنولوجيا',
      svt: 'علوم الحياة والأرض',
      ara: 'اللغة العربية',
      fra: 'اللغة الفرنسية',
      eng: 'اللغة الإنجليزية',
      info: 'الإعلامية والبرمجة',
    },
    reader: {
      contents: 'الفهرس والمحاور',
      page: 'صفحة',
      of: 'من أصل',
      previous: 'الصفحة السابقة',
      next: 'الصفحة التالية',
      exercises: 'تمارين مع الإصلاح',
      zoom: 'تكبير العرض',
      watermarkNotice: 'محتوى محمي بحقوق التأليف والنشر · التتبع الرقمي مفعل',
      copyrightNotice: 'يمنع منعا باتا نسخ أو تصوير أو تداول هذا المصنف دون إذن كتابي من المؤلف.',
      expiredTitle: 'انتهت فترة الصلاحية السنوية',
      expiredDesc: 'انتهت صلاحية النفاذ إلى هذا الكتاب بانقضاء السنة الدراسية المحددة بتوقيت تونس (Africa/Tunis).',
      renewAction: 'تجديد النفاذ للسنة الدراسية الحالية',
    },
    exercises: {
      title: 'التمارين التطبيقية والتقييم',
      instruction: 'أجب عن السؤال للاطلاع على الإصلاح البيداغوجي والتعليل النموذجي.',
      multipleChoice: 'سؤال متعدد الخيارات (QCM)',
      numericCalculation: 'حساب عددي دقيق',
      points: 'نقاط',
      difficulty: 'درجة الصعوبة',
      submitAnswer: 'تأكيد الإجابة',
      retry: 'إعادة المحاولة',
      nextExercise: 'التمرين الموالي',
      correctAnswer: 'إجابة صحيحة. تم اعتماد التعليل بنجاح.',
      incorrectAnswer: 'إجابة غير صحيحة. راجع الإصلاح المفصل أسفله.',
      officialSolution: 'الإصلاح النموذجي المفصل وطريقة التحرير',
      lockedSolution: 'الإصلاح محجوز للتلاميذ الحاصلين على حق النفاذ للكتاب.',
      unlockCta: 'اقتناء الكتاب للاطلاع على كامل الإصلاحات والتعليلات',
    },
    professor: {
      studioTitle: 'فضاء الأستاذ المؤلف',
      verifiedStatus: 'أستاذ معتمد وموثق بيداغوجيا',
      uploadPdf: 'إيداع طبعة رقمية جديدة (PDF)',
      publishedBooks: 'المؤلفات المنشورة قيد التداول',
      drafts: 'مسودات قيد المراجعة',
      salesBreakdown: 'التقرير المالي للمبيعات',
      grossSales: 'المبيعات الإجمالية (100%)',
      platformCommission: 'عمولة المنصة (10% · 1000 نقطة أساس)',
      netEarnings: 'المستحقات الصافية للأستاذ (90%)',
      requestPayout: 'طلب تحويل بنكي للمستحقات (RIB)',
      ribLabel: 'المعرف البنكي التونسي (RIB)',
      ledgerTitle: 'دفتر الحسابات المالي الثابت',
    },
    parent: {
      title: 'فضاء الأولياء والمتابعة التربوية',
      subtitle: 'متابعة دقيقة لمواظبة التلميذ، ساعات المراجعة ونتائج الاختبارات.',
      linkedChild: 'التلميذ المرتبط بالحساب',
      weeklyStudyHours: 'ساعات الدراسة الأسبوعية',
      completedExercises: 'التمارين المنجزة',
      quizAverage: 'نسبة النجاح في التقييمات',
      weakTopics: 'المفاهيم البيداغوجية الواجب تدعيمها',
      inviteCode: 'رمز الربط العائلي الآمن',
      copyCode: 'نسخ الرمز',
      privacyNotice: 'مطابق للتشريعات التونسية لحماية المعطيات الشخصية للأطفال (INPDP).',
    },
    admin: {
      title: 'الإدارة المركزية وضبط البرامج',
      subtitle: 'ضبط التقويم الدراسي الوطني، المصادقة على المؤلفات ومطابقة المعاملات المالية.',
      calendarTab: 'التقويم المدرسي الوطني (توقيت تونس)',
      securityTab: 'مصفوفة الأمان والتدقيق (SEC-01 إلى SEC-14)',
      professorsTab: 'ملفات اعتماد الأساتذة الجدد',
      activeYear: 'السنة الدراسية الجارية',
      endInstant: 'أجل الانتهاء التعاقدي للحقوق',
      timezoneLabel: 'النطاق الزمني الإجباري',
      runSecurityTests: 'بدء التدقيق الأمني الآلي',
    },
    footer: {
      legal: 'جميع الحقوق محفوظة. منصة تعليمية وطنية معتمدة.',
      ministryCompliance: 'مطابق للتوجيهات البيداغوجية لوزارة التربية بالجمهورية التونسية.',
      terms: 'شروط الاستخدام العامة',
      privacy: 'سياسة الخصوصية وحماية المعطيات',
      minorProtection: 'حماية معطيات القصر',
    },
  },
};
