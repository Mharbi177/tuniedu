'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { store } from '@/lib/store';
import { useLanguage } from '@/lib/language-context';
import { Icons } from '@/components/ui/icons';

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { lang, isRtl } = useLanguage();
  const slug = params?.slug as string;

  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const book = store.books.find((b) => b.slug === slug) || store.books[0];
  const activeYear = store.getActiveAcademicYear();
  const hasAccess = store.hasActiveEntitlement(store.currentUserId, book.id);
  const entitlement = store.getEntitlement(store.currentUserId, book.id);

  const formatDT = (m: number) => (m / 1000).toFixed(3) + (lang === 'ar' ? ' د.ت' : ' DT');

  const handleBuy = () => {
    setIsProcessingCheckout(true);

    setTimeout(() => {
      // Execute atomic checkout through domain store logic
      store.processCheckout({
        userId: store.currentUserId,
        bookIds: [book.id],
        paymentProvider: 'FLOUCI',
        idempotencyKey: `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      });

      setIsProcessingCheckout(false);
      setPurchaseSuccess(true);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Eye-Comfort Notification */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-[11px] text-blue-950 shadow-xs">
        <div className="flex items-center gap-2 font-medium">
          <Icons.Eye className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            {lang === 'ar'
              ? 'ألوان هادئة ومريحة لعيون التلاميذ · تصميم أبيض وأزرق يحمي من الإجهاد البصري'
              : 'Confort visuel certifié · Palette blanche et bleue reposante adaptée aux longues sessions d\'apprentissage'}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-blue-700 bg-white px-2.5 py-0.5 rounded-lg border border-blue-200">
          {lang === 'ar' ? 'النسخة الرقمية الرسمية' : 'Édition Numérique'}
        </span>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/catalogue" className="hover:text-blue-700 flex items-center gap-1">
          <Icons.ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{lang === 'ar' ? 'دليل الكتب' : 'Catalogue'}</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">{lang === 'ar' ? (book.levelNameAr || book.levelNameFr) : book.levelNameFr}</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs">{book.title}</span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Visual Cover Column */}
        <div className="lg:col-span-5 bg-[#0F2942] p-8 sm:p-10 flex flex-col justify-between text-white relative border-b lg:border-b-0 lg:border-r border-[#0A1C2E]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#1B3A57] text-blue-100 border border-blue-900/60">
                {lang === 'ar' ? (book.levelNameAr || book.levelNameFr) : book.levelNameFr}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-mono text-xs font-semibold shadow-xs">
                {lang === 'ar' ? (book.subjectNameAr || book.subjectNameFr) : book.subjectNameFr}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-white font-serif">
              {book.title}
            </h1>

            <div className="text-xs text-blue-200/80 flex items-center gap-2">
              <Icons.Book className="w-4 h-4 text-blue-400" />
              <span>{book.pageCount} {lang === 'ar' ? 'صفحة مرقمنة' : 'pages numérisées'}</span>
              <span>•</span>
              <span>{lang === 'ar' ? 'السنة الدراسية 2026/2027' : 'Édition Tunis 2026/2027'}</span>
            </div>
          </div>

          <div className="pt-8 border-t border-blue-900/50 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-900/80 border border-blue-800 flex items-center justify-center text-xs font-bold font-mono text-blue-200">
                PR
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                  <span>{book.professorName}</span>
                  <Icons.CheckCircle className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-[11px] text-blue-200/70">
                  {lang === 'ar' ? 'أستاذ مؤلّف معتمد بيداغوجياً' : 'Auteur & Enseignant Certifié'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase & Details Column */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-white">
          <div className="space-y-6">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'ar' ? 'تقديم المؤلف البيداغوجي :' : 'Présentation de l\'ouvrage :'}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mt-2 font-serif">
                {book.description}
              </p>
            </div>

            {/* Academic Year Expiry Notice */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
                <Icons.Clock className="w-4 h-4 text-blue-700" />
                <span>
                  {lang === 'ar' ? 'قاعدة النفاذ للسنة الدراسية (توقيت تونس) :' : 'Validité Année Scolaire (Africa/Tunis) :'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? `النفاذ الرقمي وجميع الإصلاحات صالح للسنة الدراسية ${activeYear.name} حتى أجل الانتهاء الرسمي المحدد : 30 جوان 2027 الساعة 23:59:59 (بتوقيت تونس).`
                  : `L'accès numérique et tous les corrigés sont valables pour l'année scolaire ${activeYear.name}, jusqu'à l'instant officiel : 30 juin 2027 à 23:59:59 (Heure de Tunis).`}
              </p>
            </div>

            {/* Corrections included */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-3">
              <Icons.Shield className="w-5 h-5 text-blue-700 shrink-0" />
              <div className="text-xs text-blue-950">
                <strong>{lang === 'ar' ? 'إصلاحات مفصلة فورية :' : 'Corrigés détaillés immédiats :'}</strong>{' '}
                {lang === 'ar'
                  ? 'بمجرد تأكيد الاقتناء، يتم فتح جميع الإصلاحات النموذجية وشبكات التقييم المعتمدة.'
                  : 'dès la confirmation du paiement, l\'ensemble des corrections et fiches méthodologiques sont débloqués.'}
              </div>
            </div>
          </div>

          {/* Pricing Box & CTA */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-400">
                {lang === 'ar' ? 'سعر النفاذ السنوي الشامل :' : 'Tarif Unique Annuel :'}
              </div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-3xl font-bold text-slate-950 font-serif">{formatDT(book.priceMillimes)}</span>
                <span className="text-xs text-slate-400 font-mono">({book.priceMillimes} {lang === 'ar' ? 'مليم' : 'millimes'})</span>
              </div>
            </div>

            <div>
              {hasAccess ? (
                <Link
                  href={`/student/library/${book.id}`}
                  className="px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition shadow-xs flex items-center gap-2"
                >
                  <Icons.Eye className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'فتح الكتاب في القارئ الرقمي' : 'Ouvrir le Manuel dans le Lecteur'}</span>
                </Link>
              ) : purchaseSuccess ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                    <Icons.Check className="w-4 h-4" />
                    {lang === 'ar' ? 'تم الشراء بنجاح !' : 'Accès Activé !'}
                  </span>
                  <Link
                    href={`/student/library/${book.id}`}
                    className="px-5 py-3 rounded-xl bg-blue-700 text-white font-semibold text-xs shadow-xs hover:bg-blue-800"
                  >
                    {lang === 'ar' ? 'ابدأ القراءة' : 'Commencer la lecture'}
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleBuy}
                  disabled={isProcessingCheckout}
                  className="px-7 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition shadow-xs flex items-center gap-2 disabled:opacity-50"
                >
                  <Icons.CreditCard className="w-4 h-4" />
                  <span>
                    {isProcessingCheckout
                      ? lang === 'ar' ? 'جارٍ معالجة الدفع...' : 'Traitement du paiement...'
                      : lang === 'ar' ? 'اقتناء النفاذ السنوي' : 'Acquérir l\'Accès Annuel'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
