'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Book, Entitlement } from '@/lib/store';
import { useLanguage } from '@/lib/language-context';
import { DynamicWatermark } from './DynamicWatermark';
import { ChapterOutline } from './ChapterOutline';
import { AccessExpiredState } from './AccessExpiredState';
import { Icons } from '@/components/ui/icons';

interface SecureBookReaderProps {
  book: Book;
  entitlement?: Entitlement | null;
  userEmail?: string;
}

export function SecureBookReader({
  book,
  entitlement,
  userEmail = 'elyes@tuniedu.tn',
}: SecureBookReaderProps) {
  const { lang, isRtl } = useLanguage();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [studySeconds, setStudySeconds] = useState<number>(0);
  const [paperComfortMode, setPaperComfortMode] = useState<boolean>(true);

  const [nowIso, setNowIso] = useState('2026-10-12T12:00:00.000Z');

  useEffect(() => {
    setNowIso(new Date().toISOString());
  }, []);

  const hasAccess =
    entitlement &&
    entitlement.status === 'ACTIVE' &&
    entitlement.startsAt <= nowIso &&
    nowIso < entitlement.expiresAt;

  // Active study session timer
  useEffect(() => {
    if (!hasAccess) return;
    const interval = setInterval(() => {
      setStudySeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [hasAccess]);

  // Anti-screenshot / Anti-copy deterrence
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      // Deter Ctrl+P / Cmd+P
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        alert(
          lang === 'ar'
            ? 'الطباعة المباشرة معطلة لحماية حقوق التأليف والنشر البيداغوجي.'
            : 'L\'impression directe est désactivée pour la protection des droits d\'auteur.'
        );
      }
      // Deter Ctrl+S / Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lang]);

  if (!hasAccess) {
    return (
      <AccessExpiredState
        bookTitle={book.title}
        expiredAt={entitlement?.expiresAt}
        reason={entitlement ? 'EXPIRED' : 'UNAUTHORIZED'}
      />
    );
  }

  // Mask email: elyes@tuniedu.tn -> el***@tuniedu.tn
  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');
    if (!name || !domain) return 'USER_MASKED';
    return `${name.slice(0, 2)}***@${domain}`;
  };

  const maskedUser = maskEmail(userEmail);
  const transactionRef = entitlement?.purchaseItemId || 'ENT-2026-ACTIVE';

  // Find current chapter
  const currentChapter = book.chapters.find(
    (c) => currentPage >= c.startPage && currentPage <= c.endPage
  );

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] bg-[#EDF3FA] text-slate-900 select-none">
      {/* Top Toolbar - Deep Institutional Blue */}
      <div className="h-14 px-4 bg-[#0F2942] border-b border-[#0A1C2E] flex items-center justify-between gap-3 z-30 text-white">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/student/library"
            className="p-1.5 rounded-xl bg-[#1B3A57] hover:bg-blue-800 text-blue-100 transition shadow-xs"
            title={lang === 'ar' ? 'العودة للمكتبة' : 'Retour à la bibliothèque'}
          >
            <Icons.ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </Link>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold truncate text-white font-serif">{book.title}</h1>
            <div className="text-[10px] text-blue-200/80 flex items-center gap-2">
              <span>{lang === 'ar' ? (book.levelNameAr || book.levelNameFr) : book.levelNameFr}</span>
              <span>•</span>
              <span className="text-blue-300 flex items-center gap-1 font-medium">
                <Icons.Shield className="w-3 h-3 text-blue-400" />
                {lang === 'ar' ? 'نفاذ سارٍ (2026–2027)' : 'Accès Actif (Année 2026–2027)'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2">
          {/* Paper Comfort Mode Toggle */}
          <button
            onClick={() => setPaperComfortMode(!paperComfortMode)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition border ${
              paperComfortMode
                ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                : 'bg-[#1B3A57] text-blue-200 border-transparent hover:bg-blue-800'
            }`}
            title={lang === 'ar' ? 'وضع حماية العينين' : 'Mode Confort Visuel'}
          >
            <Icons.Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {lang === 'ar' ? 'ورق مريح' : 'Confort Papier'}
            </span>
          </button>

          {/* Chapter Outline button */}
          <button
            onClick={() => setOutlineOpen(!outlineOpen)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition ${
              outlineOpen ? 'bg-blue-600 text-white shadow-xs' : 'bg-[#1B3A57] hover:bg-blue-800 text-blue-200'
            }`}
          >
            <Icons.Book className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'الفهرس' : 'Sommaire'}</span>
          </button>

          {/* Page Selector */}
          <div className="flex items-center gap-1 bg-[#1B3A57] px-2 py-1 rounded-xl border border-blue-900/60 text-xs text-white">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 hover:text-white text-blue-200 disabled:opacity-30"
              title={lang === 'ar' ? 'الصفحة السابقة' : 'Page précédente'}
            >
              <Icons.ChevronLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
            <span className="font-mono px-1 font-bold">
              {currentPage} / {book.pageCount}
            </span>
            <button
              disabled={currentPage >= book.pageCount}
              onClick={() => setCurrentPage((p) => Math.min(book.pageCount, p + 1))}
              className="p-1 hover:text-white text-blue-200 disabled:opacity-30"
              title={lang === 'ar' ? 'الصفحة التالية' : 'Page suivante'}
            >
              <Icons.ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Exercises shortcut for current chapter */}
          {currentChapter && currentChapter.exercises?.length > 0 && (
            <Link
              href={`/student/exercises/${currentChapter.exercises[0].id}`}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition shadow-xs"
            >
              <Icons.Sparkles className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? `التمارين والإصلاح (${currentChapter.exercises.length})`
                  : `Exercices & Corrigés (${currentChapter.exercises.length})`}
              </span>
            </Link>
          )}

          {/* Study session active tracker */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#1B3A57] border border-blue-900/60 text-[11px] text-blue-200 font-mono">
            <Icons.Clock className="w-3.5 h-3.5 text-blue-300" />
            <span>{Math.floor(studySeconds / 60)}m {studySeconds % 60}s</span>
          </div>
        </div>
      </div>

      {/* Main Reading Stage */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Outline Drawer */}
        {outlineOpen && (
          <div className="absolute inset-y-0 left-0 z-30 shadow-2xl">
            <ChapterOutline
              chapters={book.chapters}
              currentPage={currentPage}
              onSelectPage={(p) => {
                setCurrentPage(p);
                setOutlineOpen(false);
              }}
              onClose={() => setOutlineOpen(false)}
            />
          </div>
        )}

        {/* Book Page Canvas Stage - Soothing Blue-Gray background for maximum contrast */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-[#EDF3FA]">
          <div
            className={`relative rounded-2xl shadow-xl transition-all duration-200 overflow-hidden border ${
              paperComfortMode
                ? 'bg-white text-slate-900 border-blue-100 shadow-[0_4px_30px_rgba(15,41,66,0.08)]'
                : 'bg-white text-slate-900 border-slate-200 shadow-md'
            }`}
            style={{
              width: `${(800 * zoomLevel) / 100}px`,
              minHeight: `${(1130 * zoomLevel) / 100}px`,
              maxWidth: '96vw',
            }}
          >
            {/* Dynamic Watermark Overlay */}
            <DynamicWatermark
              userMask={maskedUser}
              transactionRef={transactionRef}
              timestamp={lang === 'ar' ? 'دورة تونس 2026/2027 · وثيقة محمية' : 'Année 2026/2027 · Session Tunis'}
            />

            {/* Page Header */}
            <div className="p-8 pb-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="font-serif">{book.title}</span>
              <span className="font-bold text-blue-700">
                {lang === 'ar' ? `الصفحة ${currentPage}` : `PAGE ${currentPage}`}
              </span>
            </div>

            {/* Rendered Book Content Simulator */}
            <div className="p-8 sm:p-12 space-y-6">
              {currentChapter ? (
                <>
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      {lang === 'ar' ? 'البرنامج البيداغوجي التونسي الرسمي' : 'Programme Officiel Tunisien'}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-950 font-serif leading-tight">
                      {currentChapter.title}
                    </h2>
                  </div>

                  <div className="prose prose-slate max-w-none text-sm space-y-4 font-serif text-slate-800">
                    <p className="leading-relaxed">
                      <strong>1. Définitions Fondamentales & Théorèmes :</strong><br />
                      Tout nombre réel positif <em>a</em> possède une racine carrée unique notée <code>√a</code>, 
                      telle que <code>(√a)² = a</code>. Lorsque <em>x</em> est un réel tel que <code>x² = b</code> avec <code>b &gt; 0</code>, 
                      les deux solutions dans ℝ sont données par :
                    </p>

                    <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 text-center font-mono font-bold text-base text-blue-950 my-4 shadow-inner">
                      S_ℝ = {'{ -√b ; +√b }'}
                    </div>

                    <p className="leading-relaxed">
                      <strong>2. Propriétés des radicaux :</strong><br />
                      Pour tous réels positifs <em>a</em> et <em>b</em>, on vérifie que :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-700">
                      <li><code>√(a × b) = √a × √b</code></li>
                      <li><code>√(a / b) = √a / √b</code> (avec b &gt; 0)</li>
                      <li>Attention : en général, <code>√(a + b) ≠ √a + √b</code> !</li>
                    </ul>

                    <div className="p-4 bg-blue-50/90 rounded-2xl border border-blue-200 text-xs text-blue-950">
                      <strong>Note méthodologique pour le Concours :</strong> Ne pas confondre la racine carrée 
                      qui est toujours positive par définition, et la solution d&apos;une équation du second degré qui peut être négative.
                    </div>
                  </div>

                  {currentChapter.exercises && currentChapter.exercises.length > 0 && (
                    <div className="mt-8 p-5 bg-blue-50/60 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="font-bold text-sm text-slate-900">
                          {lang === 'ar' ? 'تمارين تطبيقية مرافقة للدرس' : 'Exercices d\'application du chapitre'}
                        </div>
                        <div className="text-xs text-slate-500">
                          {lang === 'ar'
                            ? `${currentChapter.exercises.length} تمارين نموذجية مرفقة بالإصلاح البيداغوجي الفوري.`
                            : `${currentChapter.exercises.length} exercices disponibles avec corrigés détaillés immédiats.`}
                        </div>
                      </div>
                      <Link
                        href={`/student/exercises/${currentChapter.exercises[0].id}`}
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-xs transition"
                      >
                        {lang === 'ar' ? 'حل التمارين ومراجعة الإصلاح ←' : 'Résoudre les exercices →'}
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
                    <Icons.Book className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {lang === 'ar' ? `محتوى الصفحة ${currentPage}` : `Contenu de la Page ${currentPage}`}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {lang === 'ar'
                      ? 'الوثيقة الرقمية مشفرة ومحمية ببصمة مائية ديناميكية ترصد أي محاولة تصوير أو نسخ.'
                      : 'Le document numérisé est délivré avec un jeton sécurisé à courte durée de vie et filigrane nominatif.'}
                  </p>
                </div>
              )}
            </div>

            {/* Page Footer */}
            <div className="p-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>{lang === 'ar' ? 'منصة TuniEdu · يمنع النسخ أو التصوير' : 'Plateforme Éducative TuniEdu · Reproduction Interdite'}</span>
              <span className="font-mono">{maskedUser}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
