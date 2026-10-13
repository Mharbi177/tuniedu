'use client';

import React from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { useLanguage } from '@/lib/language-context';
import { Icons } from '@/components/ui/icons';

export default function StudentProgressPage() {
  const { lang, isRtl } = useLanguage();
  const currentUserId = store.currentUserId;
  const attempts = store.attempts.filter((a) => a.userId === currentUserId);
  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const totalScore = attempts.reduce((acc, a) => acc + a.score, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Eye-Comfort Notification */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-[11px] text-blue-950 shadow-xs">
        <div className="flex items-center gap-2 font-medium">
          <Icons.Eye className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            {lang === 'ar'
              ? 'سجل التقييمات البيداغوجية · تتبع موضوعي لمستوى التحصيل للمناظرات'
              : 'Relevé d\'évaluation pédagogique · Suivi continu des compétences scolaires'}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-blue-700 bg-white px-2.5 py-0.5 rounded-lg border border-blue-200">
          {lang === 'ar' ? 'متابعة رسمية' : 'Suivi Officiel'}
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-blue-100">
        <div>
          <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            {lang === 'ar' ? 'فضاء التقييم الفردي' : 'Tableau de Bord Personnel'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 font-serif tracking-tight mt-1">
            {lang === 'ar' ? 'تقدمي المدرسي وسجل التقييمات' : 'Mes Progrès & Historique des Évaluations'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'ar'
              ? 'متابعة التحضير للمناظرات الوطنية وساعات المواظبة الأسبوعية.'
              : 'Suivi de votre préparation aux concours et de votre assiduité scolaire.'}
          </p>
        </div>

        <Link
          href="/student/library"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-700 text-white font-semibold text-xs hover:bg-blue-800 transition shadow-xs"
        >
          <Icons.Book className="w-4 h-4" />
          <span>{lang === 'ar' ? 'مواصلة المراجعة' : 'Continuer mes Révisions'}</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {lang === 'ar' ? 'التمارين المنجزة' : 'Exercices Traités'}
          </div>
          <div className="text-3xl font-bold text-slate-950 font-serif">{attempts.length}</div>
          <div className="text-xs text-blue-700 font-medium">
            {correctCount} {lang === 'ar' ? 'إجابات صحيحة' : 'réponses exactes'} ({attempts.length > 0 ? Math.round((correctCount / attempts.length) * 100) : 0}%)
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {lang === 'ar' ? 'مجموع النقاط المكتسبة' : 'Points Cumulés'}
          </div>
          <div className="text-3xl font-bold text-blue-700 font-serif">{totalScore} {lang === 'ar' ? 'نقطة' : 'pts'}</div>
          <div className="text-xs text-slate-500">
            {lang === 'ar' ? 'عبر الكتب المفعلة' : 'Sur les manuels actifs'}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {lang === 'ar' ? 'ساعات المطالعة والمذاكرة' : 'Temps de Lecture Actif'}
          </div>
          <div className="text-3xl font-bold text-slate-950 font-serif">1h 45m</div>
          <div className="text-xs text-slate-500 font-medium">
            {lang === 'ar' ? 'مسجل بتوقيت تونس (Africa/Tunis)' : 'Enregistré dans le fuseau Tunis'}
          </div>
        </div>
      </div>

      {/* Attempts History Table */}
      <div className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-blue-100">
          <h3 className="font-bold text-base text-slate-950 font-serif">
            {lang === 'ar' ? 'سجل المحاولات والإصلاحات البيداغوجية' : 'Dernières Soumissions & Corrigés Consultés'}
          </h3>
          <p className="text-xs text-slate-500">
            {lang === 'ar' ? 'تفاصيل الإجابات والتحقق الآلي' : 'Détail de vos réponses et vérifications automatiques'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-blue-50/40 text-slate-600 border-b border-blue-100">
              <tr>
                <th className="py-3.5 px-4 font-semibold">{lang === 'ar' ? 'التاريخ والتوقيت' : 'Date & Heure'}</th>
                <th className="py-3.5 px-4 font-semibold">{lang === 'ar' ? 'رمز التمرين' : 'Exercice ID'}</th>
                <th className="py-3.5 px-4 font-semibold">{lang === 'ar' ? 'الإجابة المقدمة' : 'Réponse Soumise'}</th>
                <th className="py-3.5 px-4 font-semibold">{lang === 'ar' ? 'النتيجة' : 'Résultat'}</th>
                <th className="py-3.5 px-4 font-semibold text-right">{lang === 'ar' ? 'النقاط' : 'Points'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attempts.map((att) => (
                <tr key={att.id} className="hover:bg-blue-50/30">
                  <td className="py-3 px-4 font-mono text-slate-500">
                    {new Date(att.submittedAt).toLocaleString(lang === 'ar' ? 'ar-TN' : 'fr-TN')}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{att.exerciseId}</td>
                  <td className="py-3 px-4 font-mono bg-slate-50 rounded px-2 py-1 text-slate-800">
                    {att.submittedAnswer}
                  </td>
                  <td className="py-3 px-4">
                    {att.isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        <Icons.Check className="w-3.5 h-3.5 text-blue-700" />
                        {lang === 'ar' ? 'صحيح' : 'Exact'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-800 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        <Icons.X className="w-3.5 h-3.5 text-red-600" />
                        {lang === 'ar' ? 'يجب المراجعة' : 'À revoir'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-bold font-mono text-slate-900">
                    +{att.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
