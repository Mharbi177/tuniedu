// Seed script for TuniEdu: Tunisian Education Platform
// Initializes Education levels, Subjects, Academic Years (Africa/Tunis timezone), Verified Professors, Books, and Sample Exercises

export const SEED_DATA = {
  academicYears: [
    {
      id: 'ay_2026_2027',
      name: '2026–2027',
      startsAt: '2026-09-15T00:00:00.000Z',
      endsAt: '2027-06-30T22:59:59.999Z', // 23:59:59 in Africa/Tunis (UTC+1)
      timezone: 'Africa/Tunis',
      isActive: true,
    },
    {
      id: 'ay_2025_2026',
      name: '2025–2026',
      startsAt: '2025-09-15T00:00:00.000Z',
      endsAt: '2026-06-30T22:59:59.999Z',
      timezone: 'Africa/Tunis',
      isActive: false,
    },
  ],

  educationLevels: [
    // Primaire
    { id: 'lvl_1p', code: '1P', nameFr: '1ère Année Primaire', nameAr: 'السنة الأولى ابتدائي', stage: 'PRIMAIRE', sortOrder: 1 },
    { id: 'lvl_2p', code: '2P', nameFr: '2ème Année Primaire', nameAr: 'السنة الثانية ابتدائي', stage: 'PRIMAIRE', sortOrder: 2 },
    { id: 'lvl_3p', code: '3P', nameFr: '3ème Année Primaire', nameAr: 'السنة الثالثة ابتدائي', stage: 'PRIMAIRE', sortOrder: 3 },
    { id: 'lvl_4p', code: '4P', nameFr: '4ème Année Primaire', nameAr: 'السنة الرابعة ابتدائي', stage: 'PRIMAIRE', sortOrder: 4 },
    { id: 'lvl_5p', code: '5P', nameFr: '5ème Année Primaire', nameAr: 'السنة الخامسة ابتدائي', stage: 'PRIMAIRE', sortOrder: 5 },
    { id: 'lvl_6p', code: '6P', nameFr: '6ème Année Primaire (Sixième)', nameAr: 'السنة السادسة ابتدائي (السيزيام)', stage: 'PRIMAIRE', sortOrder: 6 },
    // Collège (Focus MVP)
    { id: 'lvl_7b', code: '7B', nameFr: '7ème Année de Base', nameAr: 'السنة السابعة أساسي', stage: 'COLLEGE', sortOrder: 7 },
    { id: 'lvl_8b', code: '8B', nameFr: '8ème Année de Base', nameAr: 'السنة الثامنة أساسي', stage: 'COLLEGE', sortOrder: 8 },
    { id: 'lvl_9b', code: '9B', nameFr: '9ème Année de Base (Neufième)', nameAr: 'السنة التاسعة أساسي (النوفيام)', stage: 'COLLEGE', sortOrder: 9 },
    // Lycée & Université (Extensible data model)
    { id: 'lvl_bac', code: 'BAC', nameFr: 'Baccalauréat', nameAr: 'البكالوريا', stage: 'LYCEE', sortOrder: 10 },
    { id: 'lvl_univ', code: 'UNIV_MATH', nameFr: 'Université — Mathématiques', nameAr: 'التعليم العالي - رياضيات', stage: 'UNIVERSITE', sortOrder: 11 },
  ],

  subjects: [
    { id: 'subj_math', code: 'MATH', nameFr: 'Mathématiques', nameAr: 'الرياضيات' },
    { id: 'subj_phys', code: 'PHYS', nameFr: 'Sciences Physiques', nameAr: 'العلوم الفيزيائية' },
    { id: 'subj_svt', code: 'SVT', nameFr: 'Sciences de la Vie et de la Terre', nameAr: 'علوم الحياة والأرض' },
    { id: 'subj_ara', code: 'ARA', nameFr: 'Arabe', nameAr: 'اللغة العربية' },
    { id: 'subj_fra', code: 'FRA', nameFr: 'Français', nameAr: 'اللغة الفرنسية' },
    { id: 'subj_eng', code: 'ENG', nameFr: 'Anglais', nameAr: 'اللغة الإنجليزية' },
    { id: 'subj_info', code: 'INFO', nameFr: 'Informatique', nameAr: 'الإعلامية' },
  ],

  books: [
    {
      id: 'book_math_9b',
      title: "L'Excellence en Mathématiques — 9ème Année de Base (Concours Neufième)",
      slug: 'excellence-mathematiques-9eme-annee',
      description: 'Manuel officiel complet avec résumés de cours approfondis, 150 exercices gradués et corrigés détaillés conformes au programme du Ministère de l\'Éducation Tunisien.',
      priceMillimes: 22000, // 22.000 DT
      currency: 'TND',
      language: 'fr',
      status: 'PUBLISHED',
      levelCode: '9B',
      subjectCode: 'MATH',
      professorName: 'Prof. Hichem Ben Salem',
      professorBio: 'Inspecteur pédagogique & Professeur agrégé de Mathématiques, Tunis (22 ans d\'expérience)',
      pageCount: 148,
      chapters: [
        {
          title: 'Chapitre 1 : Les Nombres Réels et Opérations',
          startPage: 1,
          endPage: 32,
          exercises: [
            {
              id: 'ex_math_9_1',
              type: 'MULTIPLE_CHOICE',
              prompt: 'Soit x un nombre réel tel que x² = 7 et x < 0. Quelle est la valeur exacte de x ?',
              options: ['-√7', '√7', '-7/2', 'Impossible'],
              answerKey: '-√7',
              solution: 'Puisque x² = 7, les solutions sont √7 et -√7. La condition x < 0 impose de retenir x = -√7.',
              points: 2,
              difficulty: 1,
            },
            {
              id: 'ex_math_9_2',
              type: 'NUMERIC',
              prompt: 'Calculer la valeur décimale de A = √(36) + √(64) - √(25) :',
              answerKey: '9',
              solution: 'A = 6 + 8 - 5 = 14 - 5 = 9.',
              points: 3,
              difficulty: 1,
            },
          ],
        },
        {
          title: 'Chapitre 2 : Théorème de Thalès et Trigonométrie',
          startPage: 33,
          endPage: 78,
          exercises: [
            {
              id: 'ex_math_9_3',
              type: 'MULTIPLE_CHOICE',
              prompt: 'Dans un triangle ABC rectangle en A, si AB = 3 et AC = 4, quelle est la valeur de cos(ABC) ?',
              options: ['3/5', '4/5', '3/4', '5/3'],
              answerKey: '3/5',
              solution: 'Par le théorème de Pythagore, BC = √(3² + 4²) = √(9 + 16) = √25 = 5. Le cosinus de l\'angle B est égal au côté adjacent sur l\'hypoténuse : cos(B) = AB / BC = 3/5 = 0.6.',
              points: 4,
              difficulty: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'book_phys_8b',
      title: 'Sciences Physiques & Chimie — 8ème Année de Base',
      slug: 'sciences-physiques-8eme-annee',
      description: 'Fiches de révision illustrées, expériences de laboratoire expliquées pas à pas et exercices d\'application avec corrigés type examen.',
      priceMillimes: 18500, // 18.500 DT
      currency: 'TND',
      language: 'fr',
      status: 'PUBLISHED',
      levelCode: '8B',
      subjectCode: 'PHYS',
      professorName: 'Prof. Aida Triki',
      professorBio: 'Professeure Principale de Sciences Physiques, Sousse',
      pageCount: 112,
    },
    {
      id: 'book_math_7b',
      title: 'Fondations Mathématiques — 7ème Année de Base',
      slug: 'fondations-mathematiques-7eme-annee',
      description: 'Transition réussie du primaire vers le collège : nombres décimaux, fractions, angles et constructions géométriques au compas et à la règle.',
      priceMillimes: 19000, // 19.000 DT
      currency: 'TND',
      language: 'fr',
      status: 'PUBLISHED',
      levelCode: '7B',
      subjectCode: 'MATH',
      professorName: 'Prof. Hichem Ben Salem',
      professorBio: 'Inspecteur pédagogique & Professeur agrégé',
      pageCount: 120,
    },
    {
      id: 'book_sixieme_6p',
      title: "Cahier de Réussite Sixième — Concours d'Entrée aux Collèges Pilotes",
      slug: 'cahier-reussite-sixieme-concours',
      description: 'Préparation intensive pour le concours de la 6ème année : calcul mental, problèmes de logique, géométrie et épreuves blanches corrigées.',
      priceMillimes: 16000, // 16.000 DT
      currency: 'TND',
      language: 'fr',
      status: 'PUBLISHED',
      levelCode: '6P',
      subjectCode: 'MATH',
      professorName: 'Prof. Moncef Gharbi',
      professorBio: 'Maître d\'application en enseignement primaire, Sfax',
      pageCount: 96,
    },
    {
      id: 'book_univ_math',
      title: 'Algèbre Linéaire & Analyse Réelle — 1ère Année Universitaire',
      slug: 'algebre-lineaire-analyse-universite',
      description: 'Espaces vectoriels, applications linéaires, séries numériques et calcul différentiel pour étudiants en licence mathématiques, physique et informatique.',
      priceMillimes: 35000, // 35.000 DT
      currency: 'TND',
      language: 'fr',
      status: 'PUBLISHED',
      levelCode: 'UNIV_MATH',
      subjectCode: 'MATH',
      professorName: 'Dr. Yassine Karray',
      professorBio: 'Maître de conférences, Faculté des Sciences de Tunis',
      pageCount: 240,
    },
  ],
};

async function main() {
  console.log('Seeding TuniEdu platform database...');
  console.log(`- Academic years: ${SEED_DATA.academicYears.length}`);
  console.log(`- Education levels: ${SEED_DATA.educationLevels.length}`);
  console.log(`- Subjects: ${SEED_DATA.subjects.length}`);
  console.log(`- Published books: ${SEED_DATA.books.length}`);
  console.log('Seed data definition complete.');
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
