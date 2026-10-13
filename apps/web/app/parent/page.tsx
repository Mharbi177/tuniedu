'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { WeeklyProgressCard } from '@/components/parent/WeeklyProgressCard';
import { Icons } from '@/components/ui/icons';

export default function ParentDashboardPage() {
  const { lang } = useLanguage();
  const [inviteCode] = useState('TUN-9842');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Eye-Comfort Notification */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-[11px] text-blue-950 shadow-xs">
        <div className="flex items-center gap-2 font-medium">
          <Icons.Eye className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            {lang === 'ar'
              ? 'فضاء الأولياء للمتابعة التربوية · بيئة بيضاء وزرقاء آمنة لحماية معطيات الأطفال القصّر (INPDP)'
              : 'Espace de supervision parentale · Protection stricte des données personnelles des mineurs (INPDP)'}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-blue-700 bg-white px-2.5 py-0.5 rounded-lg border border-blue-200">
          SEC-11
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-blue-100">
        <div>
          <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            {lang === 'ar' ? 'فضاء الأولياء والرقابة البيداغوجية' : 'Espace Parents & Tuteurs'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 font-serif tracking-tight mt-1">
            {lang === 'ar' ? 'المتابعة التربوية ومواظبة التلميذ' : 'Suivi Pédagogique & Assiduité'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'ar'
              ? 'متابعة مباشرة لساعات المذاكرة، حل التمارين، ونتائج التقييمات في إطار دعم استقلالية التلميذ.'
              : 'Supervisez les progrès de vos enfants en toute sérénité, dans le respect de leur autonomie.'}
          </p>
        </div>

        {/* Link Invitation Code Button */}
        <div className="bg-white p-3 rounded-2xl border border-blue-100 shadow-xs flex items-center gap-3">
          <div className="text-left">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">
              {lang === 'ar' ? 'رمز ربط التلميذ :' : 'Code de liaison :'}
            </div>
            <div className="text-sm font-mono font-bold text-slate-900">{inviteCode}</div>
          </div>
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition shadow-xs"
          >
            {copied ? (lang === 'ar' ? 'تم النسخ' : 'Copié !') : (lang === 'ar' ? 'نسخ الرمز' : 'Copier')}
          </button>
        </div>
      </div>

      {/* Linked Child Card */}
      <WeeklyProgressCard
        childName={lang === 'ar' ? 'إلياس منصور' : 'Elyes Mansour'}
        level={lang === 'ar' ? 'السنة التاسعة أساسي (مناظرة النوفيام)' : '9ème Année de Base (Concours Neufième)'}
        totalStudyHours={4}
        exercisesCompleted={18}
        averageScorePercentage={88}
        weakTopics={[
          lang === 'ar' ? 'نشر وتفكيك الجداءات المعتبرة (2x - 3)²' : 'Développement des identités remarquables (2x - 3)²',
          lang === 'ar' ? 'جيب تمام زاوية حادة في مثلث قائم (مبرهنة فيثاغورس)' : 'Cosinus dans un triangle rectangle (Théorème de Pythagore)',
        ]}
      />

      {/* Parental Consent & Security Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Icons.Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">
            {lang === 'ar' ? 'ربط آمن بين الولي والتلميذ (SEC-11)' : 'Liaison Parent-Enfant Sécurisée (SEC-11)'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {lang === 'ar'
              ? 'لا يتاح الاطلاع على تقارير النشاط والنتائج إلا للأولياء الحاصلين على ربط رسمي مؤكد عبر Child ID. تمنع منظومة الأمان أي طرف غير مصرح به من النفاذ للبيانات.'
              : 'Seuls les parents formellement validés par l\'élève ou par code vérifié ont accès aux rapports d\'activité. Tout accès par un tiers non autorisé est strictement bloqué.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Icons.Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">
            {lang === 'ar' ? 'حماية مشددة لمعطيات الأطفال القصّر' : 'Données de Mineurs Protégées'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {lang === 'ar'
              ? 'مطابق للتشريعات التونسية لحماية المعطيات الشخصية (INPDP). لا يتم بيع أي بيانات سلوكية أو مشاركتها مع أطراف تجارية أو إعلانية.'
              : 'Conformément aux normes tunisiennes relatives à la protection des données personnelles (INPDP), aucune donnée comportementale n\'est cédée à des tiers.'}
          </p>
        </div>
      </div>
    </div>
  );
}
