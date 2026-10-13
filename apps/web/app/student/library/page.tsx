'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { useLanguage } from '@/lib/language-context';
import { Icons } from '@/components/ui/icons';

export default function StudentLibraryPage() {
  const { lang, isRtl } = useLanguage();
  const currentUserId = store.currentUserId;
  const user = store.getCurrentUser();
  const [nowIso, setNowIso] = useState('2026-10-12T12:00:00.000Z');

  useEffect(() => {
    setNowIso(new Date().toISOString());
  }, []);

  // Find all entitlements for current student
  const entitlements = store.entitlements.filter(
    (e) => e.userId === currentUserId && e.status === 'ACTIVE'
  );

  const purchasedBooks = entitlements
    .map((e) => {
      const book = store.books.find((b) => b.id === e.bookId);
      return { book, entitlement: e };
    })
    .filter((item) => item.book !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Eye-Comfort Certified Banner */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-[11px] text-blue-950 shadow-xs">
        <div className="flex items-center gap-2 font-medium">
          <Icons.Eye className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            {lang === 'ar'
              ? 'مكتبة التلميذ الرقمية · خطوط عريضة مريحة وحماية بيضاء وزرقاء من التوهج البصري'
              : 'Espace de lecture élève · Typographie aérée et confort visuel certifié'}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-blue-700 bg-white px-2.5 py-0.5 rounded-lg border border-blue-200">
          {lang === 'ar' ? 'جلسة مذاكرة' : 'Session d\'Étude'}
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-blue-100">
        <div>
          <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            {lang === 'ar' ? 'فضاء التلميذ' : 'Espace Élève'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 font-serif tracking-tight mt-1">
            {lang === 'ar' ? 'مكتبتي الرقمية والكتب النشطة' : 'Ma Bibliothèque Numérique'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'ar'
              ? 'الكتب المدرسية المفعلة للسنة الدراسية الجارية بتوقيت تونس (Africa/Tunis).'
              : 'Vos manuels scolaires actifs pour l\'année scolaire en cours (fuseau Africa/Tunis).'}
          </p>
        </div>

        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-xs transition"
        >
          <Icons.Book className="w-4 h-4" />
          <span>{lang === 'ar' ? 'إضافة كتاب جديد' : 'Ajouter un Manuel'}</span>
        </Link>
      </div>

      {/* Bookshelf */}
      {purchasedBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedBooks.map(({ book, entitlement }) => {
            const isExpired = nowIso >= entitlement.expiresAt;
            const expiryDate = new Date(entitlement.expiresAt).toLocaleDateString(lang === 'ar' ? 'ar-TN' : 'fr-TN');

            return (
              <div
                key={entitlement.id}
                className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden flex flex-col justify-between hover:border-blue-300 transition"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-100">
                      {lang === 'ar' ? (book!.levelNameAr || book!.levelNameFr) : book!.levelNameFr}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        isExpired
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {isExpired
                        ? lang === 'ar' ? 'انتهت الصلاحية' : 'ACCÈS EXPIRÉ'
                        : lang === 'ar' ? 'صلاحية نشطة' : 'ACCÈS ACTIF'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-950 font-serif leading-snug">
                    {book!.title}
                  </h3>

                  <div className="text-xs text-slate-500 space-y-1">
                    <div>
                      {lang === 'ar' ? 'الأستاذ المؤلف :' : 'Auteur :'}{' '}
                      <strong className="text-slate-900">{book!.professorName}</strong>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {lang === 'ar' ? 'صالح إلى غاية :' : 'Valide jusqu\'au :'}{' '}
                      {expiryDate} (23:59:59)
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-blue-50/30 border-t border-blue-50 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                    <Icons.Shield className="w-3.5 h-3.5 text-blue-700" />
                    {lang === 'ar' ? 'بصمة مائية نشطة' : 'Filigrane Actif'}
                  </span>

                  <Link
                    href={`/student/library/${book!.id}`}
                    className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-xs transition flex items-center gap-1.5"
                  >
                    <Icons.Eye className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'فتح وقراءة' : 'Lire le Manuel'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-blue-100 p-8 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
            <Icons.Book className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">
            {lang === 'ar' ? 'مكتبتك الرقمية لا تحتوي على كتب حالياً' : 'Votre bibliothèque est vide pour le moment'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {lang === 'ar'
              ? 'تصفح الدليل المدرسي لاقتناء أول كتاب رسمي مطابق للبرنامج البيداغوجي التونسي.'
              : 'Consultez le catalogue pour acquérir l\'accès à votre premier manuel scolaire conforme au programme tunisien.'}
          </p>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-xs"
          >
            {lang === 'ar' ? 'استعراض الدليل المدرسي' : 'Découvrir le Catalogue'}
          </Link>
        </div>
      )}
    </div>
  );
}
