'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { Icons } from '@/components/ui/icons';

interface AccessExpiredStateProps {
  bookTitle: string;
  expiredAt?: string;
  reason?: 'EXPIRED' | 'UNAUTHORIZED' | 'REVOKED';
}

export function AccessExpiredState({
  bookTitle,
  expiredAt,
  reason = 'EXPIRED',
}: AccessExpiredStateProps) {
  const { lang } = useLanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-blue-100 shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mx-auto shadow-xs">
          {reason === 'UNAUTHORIZED' ? (
            <Icons.Lock className="w-8 h-8" />
          ) : (
            <Icons.Clock className="w-8 h-8" />
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-950 font-serif">
            {reason === 'UNAUTHORIZED'
              ? (lang === 'ar' ? 'نفاذ مقيّد إلى الكتاب' : 'Accès Restreint au Manuel')
              : (lang === 'ar' ? 'انتهت صلاحية النفاذ السنوي' : 'Droit d\'Accès Expiré (Règle Année Scolaire)')}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {reason === 'UNAUTHORIZED' ? (
              lang === 'ar' ? (
                <>يجب اقتناء هذا الكتاب للسنة الدراسية الجارية لفتح قراءة كامل الصفحات والإصلاحات النموذجية.</>
              ) : (
                <>
                  Vous devez acquérir ce manuel pour l&apos;année scolaire en cours pour débloquer
                  la lecture intégrale des pages et les corrigés détaillés.
                </>
              )
            ) : (
              lang === 'ar' ? (
                <>
                  وفقاً للضوابط الرسمية لمنصة TuniEdu، انتهت صلاحية النفاذ إلى{' '}
                  <strong>{bookTitle}</strong> مع نهاية السنة الدراسية
                  {expiredAt ? ` (${new Date(expiredAt).toLocaleDateString('ar-TN')} بتوقيت تونس)` : ''}.
                </>
              ) : (
                <>
                  Conformément aux règles de la plateforme TuniEdu, l&apos;accès à{' '}
                  <strong>{bookTitle}</strong> a pris fin à l&apos;échéance de l&apos;année scolaire configurée
                  {expiredAt ? ` (${new Date(expiredAt).toLocaleDateString('fr-TN')} dans le fuseau Africa/Tunis)` : ''}.
                </>
              )
            )}
          </p>
        </div>

        <div className="p-3.5 bg-blue-50/40 rounded-2xl border border-blue-100 text-left text-xs text-slate-600 space-y-1.5">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Icons.Shield className="w-4 h-4 text-blue-700" />
            <span>{lang === 'ar' ? 'حماية حقوق التأليف والملكية الفكرية' : 'Sécurité & Droits d\'Auteurs'}</span>
          </div>
          <p className="text-[11px] text-slate-500">
            {lang === 'ar'
              ? 'الكتب المدرسية محمية بموجب حقوق التأليف للمدرسين التونسيين المعتمدين.'
              : 'Les manuels pédagogiques sont protégés par le droit d\'auteur des professeurs tunisiens certifiés.'}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <Link
            href="/catalogue"
            className="w-full py-3 px-4 rounded-xl bg-blue-700 text-white font-semibold text-xs hover:bg-blue-800 transition shadow-xs"
          >
            {lang === 'ar' ? 'تجديد النفاذ وتصفح الدليل' : 'Renouveler ou Voir le Catalogue'}
          </Link>
          <Link
            href="/student/library"
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-blue-50/50 transition"
          >
            {lang === 'ar' ? 'العودة إلى مكتبتي' : 'Retourner à Ma Bibliothèque'}
          </Link>
        </div>
      </div>
    </div>
  );
}
