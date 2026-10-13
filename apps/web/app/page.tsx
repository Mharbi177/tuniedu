'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { store } from '@/lib/store';
import { BookCard } from '@/components/catalogue/BookCard';
import { BookPreviewModal } from '@/components/catalogue/BookPreviewModal';
import { Icons } from '@/components/ui/icons';
import { Book } from '@/lib/store';

export default function HomePage() {
  const { lang, t, isRtl } = useLanguage();
  const [selectedStage, setSelectedStage] = useState('ALL');
  const [previewBook, setPreviewBook] = useState<Book | null>(null);

  const books = store.books;
  const filteredBooks = selectedStage === 'ALL'
    ? books
    : books.filter((b) => b.stage === selectedStage);

  const STAGE_OPTIONS = [
    { id: 'ALL', label: t.levels.all },
    { id: 'COLLEGE', label: t.levels.college, badge: lang === 'ar' ? 'الأولوية الوطنية' : 'Priorité Concours' },
    { id: 'PRIMAIRE', label: t.levels.primary },
    { id: 'UNIVERSITE', label: t.levels.university },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Eye-Comfort Certified Visual Ergonomics Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-[11px] text-blue-950 shadow-xs">
          <div className="flex items-center gap-2 font-medium">
            <Icons.Eye className="w-4 h-4 text-blue-700 shrink-0" />
            <span>
              {lang === 'ar'
                ? 'منظومة بيداغوجية بيضاء وزرقاء مريحة للعينين · مصممة علمياً لحماية نظر التلاميذ والأطفال أثناء الدراسة'
                : 'Ergonomie visuelle certifiée pour les élèves · Palette blanche et bleue reposante pour préserver la vue des enfants'}
            </span>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-white px-2.5 py-0.5 rounded-lg border border-blue-200">
            {lang === 'ar' ? 'معتمد رسمياً' : 'Homologué'}
          </span>
        </div>
      </div>

      {/* Institutional Hero Banner - White & Blue Palette */}
      <section className="bg-gradient-to-b from-blue-50/60 via-white to-white border-b border-blue-100/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-900 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{t.officialProgramme}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-tight font-serif">
              {lang === 'ar'
                ? 'المنصة الوطنية للكتب المدرسية الرقمية والإعداد للمناظرات'
                : 'Portail National des Manuels Scolaires et de Préparation aux Concours'}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              {t.tagline}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/catalogue"
                className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs tracking-wide transition shadow-sm flex items-center justify-center gap-2"
              >
                <Icons.Book className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تصفح دليل الكتب الرسمية' : 'Consulter le Catalogue Officiel'}</span>
              </Link>

              <Link
                href="/student/library"
                className="px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-blue-900 border border-blue-200 font-semibold text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <Icons.User className="w-4 h-4 text-blue-600" />
                <span>{lang === 'ar' ? 'فضاء التلميذ ومكتبتي' : 'Espace Élève & Bibliothèque'}</span>
              </Link>
            </div>
          </div>

          {/* Institutional Trust Metrics */}
          <div className="mt-12 pt-8 border-t border-blue-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-700">
            <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs space-y-1">
              <div className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
                <Icons.Calendar className="w-4 h-4 text-blue-700" />
                <span>{lang === 'ar' ? 'صلاحية سنوية مؤكدة' : 'Accès Annuel Contractuel'}</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {lang === 'ar' ? 'تنتهي مع نهاية السنة الدراسية بتوقيت تونس' : 'Snapshot instantané selon le calendrier officiel'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs space-y-1">
              <div className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
                <Icons.CheckCircle className="w-4 h-4 text-blue-700" />
                <span>{lang === 'ar' ? 'إصلاحات نموذجية فورية' : 'Corrigés Débloqués Immédiatement'}</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {lang === 'ar' ? 'تعليلات مفصلة ومطابقة لمقاييس الامتحانات' : 'Démonstrations méthodologiques pas à pas'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs space-y-1">
              <div className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
                <Icons.GraduationCap className="w-4 h-4 text-blue-700" />
                <span>{lang === 'ar' ? 'أساتذة ومتفقدون معتمدون' : 'Auteurs & Inspecteurs Vérifiés'}</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {lang === 'ar' ? 'كفاءات بيداغوجية مشهود لها بالمعاهد النموذجية' : 'Agrégés et spécialistes des lycées pilotes'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-xs space-y-1">
              <div className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
                <Icons.Users className="w-4 h-4 text-blue-700" />
                <span>{lang === 'ar' ? 'متابعة بيداغوجية للأولياء' : 'Suivi Parental Sécurisé'}</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {lang === 'ar' ? 'تقرير أسبوعي للمواظبة ونتائج التقييم' : 'Relevé des heures d\'étude et des quiz résolus'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Sections & Catalogue Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-blue-100">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              {lang === 'ar' ? 'البرامج الرسمية المعتمدة' : 'Cycles d\'Enseignement'}
            </span>
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight mt-0.5">
              {lang === 'ar' ? 'دليل الكتب المدرسية والتمارين النموذجية' : 'Ouvrages Pédagogiques par Cycle'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'ar'
                ? 'حدد المستوى الدراسي لعرض الكتب المتوافقة مع البرامج الرسمية التونسية.'
                : 'Sélectionnez un cycle pour consulter les manuels de référence homologués.'}
            </p>
          </div>

          <Link
            href="/catalogue"
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 shrink-0"
          >
            <span>{lang === 'ar' ? 'عرض كامل الدليل' : 'Consulter l\'intégralité du catalogue'}</span>
            <Icons.ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {STAGE_OPTIONS.map((opt) => {
            const isSelected = selectedStage === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedStage(opt.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                  isSelected
                    ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/50 hover:border-blue-200'
                }`}
              >
                <span>{opt.label}</span>
                {opt.badge && (
                  <span className={`ml-2 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                    isSelected ? 'bg-blue-800 text-blue-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                  }`}>
                    {opt.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Book Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const hasAccess = store.hasActiveEntitlement(store.currentUserId, book.id);
            return (
              <BookCard
                key={book.id}
                book={book}
                hasAccess={hasAccess}
                onPreview={(b) => setPreviewBook(b)}
              />
            );
          })}
        </div>
      </section>

      {/* Institutional Quality Framework */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl text-slate-900 p-8 sm:p-12 border border-blue-200 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              {lang === 'ar' ? 'ميثاق الجودة والمصداقية' : 'Cadre d\'Homologation & Déontologie'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
              {lang === 'ar'
                ? 'حماية حقوق التأليف وضمان القيمة التربوية'
                : 'Protection des Droits d\'Auteur et Rigueur Pédagogique'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'تخضع جميع الكتب المدرسية المنشورة على المنصة لمراجعة وتدقيق من قبل لجان بيداغوجية، مع تتبع دقيق للملكية الفكرية وسلامة المعاملات.'
                : 'Chaque manuel publié fait l\'objet d\'une vérification par les inspecteurs pédagogiques, garantissant l\'adéquation avec les épreuves nationales et la protection contre toute reproduction illicite.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-blue-100 text-xs">
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <div className="font-bold text-blue-950 text-sm flex items-center gap-2">
                <Icons.Shield className="w-4 h-4 text-blue-700" />
                <span>{lang === 'ar' ? 'حماية رقمية نشطة للوثائق' : 'Traçabilité Numérique Obligatoire'}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {lang === 'ar'
                  ? 'يتم عرض الصفحات عبر قارئ محمي بختم رقمي مائي يحمل هوية التلميذ ورقم المعاملة، دون إتاحة ملف الـ PDF الأصلي للتحميل.'
                  : 'Chaque page est protégée par un filigrane personnalisé infalsifiable. Les fichiers sources ne sont jamais exposés publiquement.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <div className="font-bold text-blue-950 text-sm flex items-center gap-2">
                <Icons.CreditCard className="w-4 h-4 text-blue-700" />
                <span>{lang === 'ar' ? 'نموذج مالي شفاف (90% للمؤلف)' : 'Transparence Financière (90% Auteur)'}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {lang === 'ar'
                  ? 'عمولة المنصة محددة بنسبة 10% لتغطية تكاليف الخوادم ومعالجة الدفع، مع صرف 90% من المداخيل الصافية للأساتذة أصحاب الكتب.'
                  : 'Commission plateforme plafonnée à 10% (1000 bps). 90% des ventes nettes sont reversés directement à l\'auteur certifié.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <div className="font-bold text-blue-950 text-sm flex items-center gap-2">
                <Icons.Calendar className="w-4 h-4 text-blue-700" />
                <span>{lang === 'ar' ? 'صلاحية محددة بنهاية السنة الدراسية' : 'Échéance Fixée au Calendrier Scolaire'}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {lang === 'ar'
                  ? 'يتم تسجيل موعد انتهاء حق النفاذ آليا عند الشراء بتوقيت تونس لضمان تجديد المناهج كل سنة دراسية.'
                  : 'Dates de validité explicites enregistrées dans l\'entitlement en UTC / Africa/Tunis, évitant tout codage en dur.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Book Preview Modal */}
      <BookPreviewModal
        book={previewBook}
        isOpen={Boolean(previewBook)}
        onClose={() => setPreviewBook(null)}
        hasAccess={previewBook ? store.hasActiveEntitlement(store.currentUserId, previewBook.id) : false}
      />
    </div>
  );
}
