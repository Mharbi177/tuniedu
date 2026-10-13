'use client';

import React from 'react';
import { BookChapter } from '@/lib/store';
import { useLanguage } from '@/lib/language-context';
import { Icons } from '@/components/ui/icons';

interface ChapterOutlineProps {
  chapters: BookChapter[];
  currentPage: number;
  onSelectPage: (page: number) => void;
  onClose?: () => void;
}

export function ChapterOutline({
  chapters,
  currentPage,
  onSelectPage,
  onClose,
}: ChapterOutlineProps) {
  const { lang } = useLanguage();

  return (
    <div className="w-80 h-full bg-white border-r border-slate-200 flex flex-col shadow-xl">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-blue-50/40">
        <div className="flex items-center gap-2">
          <Icons.Book className="w-4 h-4 text-blue-700" />
          <h3 className="font-bold text-sm text-slate-900">
            {lang === 'ar' ? 'فهرس المحتويات والدروس' : 'Sommaire & Chapitres'}
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-blue-50 text-slate-500"
            aria-label="Fermer"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {chapters.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            {lang === 'ar' ? 'جارٍ توليد الفهرس الرقمي' : 'Sommaire numérique en cours de génération'}
          </div>
        ) : (
          chapters.map((chap) => {
            const isCurrent = currentPage >= chap.startPage && currentPage <= chap.endPage;
            return (
              <div
                key={chap.id}
                className={`rounded-2xl p-3 border transition ${
                  isCurrent
                    ? 'border-blue-300 bg-blue-50/80 text-blue-950 shadow-xs'
                    : 'border-slate-100 bg-slate-50/40 hover:bg-blue-50/30 text-slate-800'
                }`}
              >
                <button
                  onClick={() => onSelectPage(chap.startPage)}
                  className="w-full text-left"
                >
                  <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-0.5">
                    {lang === 'ar'
                      ? `الصفحات ${chap.startPage} – ${chap.endPage}`
                      : `Pages ${chap.startPage} – ${chap.endPage}`}
                  </div>
                  <div className="font-semibold text-xs leading-snug">{chap.title}</div>
                </button>

                {chap.exercises && chap.exercises.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-blue-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Icons.Sparkles className="w-3 h-3 text-blue-600" />
                      {lang === 'ar'
                        ? `${chap.exercises.length} تمارين مرافقة`
                        : `${chap.exercises.length} exercices corrigés`}
                    </span>
                    <button
                      onClick={() => onSelectPage(chap.startPage)}
                      className="font-semibold text-blue-700 hover:underline"
                    >
                      {lang === 'ar' ? 'تدرب الآن ←' : 'S\'entraîner →'}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
