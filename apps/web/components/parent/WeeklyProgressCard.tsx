'use client';

import React from 'react';
import { useLanguage } from '@/lib/language-context';
import { Icons } from '@/components/ui/icons';

interface WeeklyProgressCardProps {
  childName: string;
  level: string;
  totalStudyHours: number;
  exercisesCompleted: number;
  averageScorePercentage: number;
  weakTopics: string[];
}

export function WeeklyProgressCard({
  childName,
  level,
  totalStudyHours,
  exercisesCompleted,
  averageScorePercentage,
  weakTopics,
}: WeeklyProgressCardProps) {
  const { lang } = useLanguage();

  const dailyActivity = [
    { dayFr: 'Lun', dayAr: 'الإثنين', minutes: 45 },
    { dayFr: 'Mar', dayAr: 'الثلاثاء', minutes: 60 },
    { dayFr: 'Mer', dayAr: 'الأربعاء', minutes: 90 },
    { dayFr: 'Jeu', dayAr: 'الخميس', minutes: 30 },
    { dayFr: 'Ven', dayAr: 'الجمعة', minutes: 75 },
    { dayFr: 'Sam', dayAr: 'السبت', minutes: 120 },
    { dayFr: 'Dim', dayAr: 'الأحد', minutes: 90 },
  ];

  const maxMinutes = Math.max(...dailyActivity.map((d) => d.minutes));

  const subjectMastery = [
    { nameFr: 'Mathématiques (9ème Pilote)', nameAr: 'الرياضيات (مناظرة النوفيام)', score: 92, color: 'bg-blue-600' },
    { nameFr: 'Sciences Physiques', nameAr: 'العلوم الفيزيائية', score: 78, color: 'bg-emerald-600' },
    { nameFr: 'Sciences de la Vie et de la Terre', nameAr: 'علوم الحياة والأرض', score: 85, color: 'bg-indigo-600' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center font-bold text-sm shadow-xs">
            {childName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {lang === 'ar' ? 'تقرير المتابعة والنشاط الأسبوعي' : 'Rapport d\'activité hebdomadaire'}
            </div>
            <h3 className="text-lg font-bold text-slate-950 font-serif">{childName}</h3>
            <div className="text-xs text-blue-700 font-medium">{level}</div>
          </div>
        </div>

        <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 flex items-center gap-1.5 shadow-xs self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {lang === 'ar' ? 'حساب التلميذ مرتبط ومؤكد (SEC-11)' : 'Compte Enfant Lié & Vérifié (SEC-11)'}
        </span>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-1">
          <div className="text-xs text-slate-500 font-medium">
            {lang === 'ar' ? 'ساعات المذاكرة النشطة' : 'Temps d\'étude actif'}
          </div>
          <div className="text-2xl font-bold text-slate-950 font-serif mt-1">
            {totalStudyHours}h 15m
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {lang === 'ar' ? 'خلال هذا الأسبوع' : 'Cette semaine'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-1">
          <div className="text-xs text-slate-500 font-medium">
            {lang === 'ar' ? 'التمارين المنجزة' : 'Exercices résolus'}
          </div>
          <div className="text-2xl font-bold text-slate-950 font-serif mt-1">
            {exercisesCompleted} / 25
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
            {lang === 'ar' ? 'نسبة الإنجاز 80%' : 'Taux de complétion 80%'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-1">
          <div className="text-xs text-slate-500 font-medium">
            {lang === 'ar' ? 'معدل الاختبارات والتقييمات' : 'Moyenne des Quiz'}
          </div>
          <div className="text-2xl font-bold text-blue-700 font-serif mt-1">
            {averageScorePercentage}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {lang === 'ar' ? 'مؤشر ممتاز للمناظرة' : 'Objectif concours atteint'}
          </div>
        </div>
      </div>

      {/* Daily Study Minutes Visual Chart */}
      <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <div className="flex items-center gap-1.5">
            <Icons.Clock className="w-4 h-4 text-blue-700" />
            <span>{lang === 'ar' ? 'توزيع دقائق القراءة والمذاكرة اليومية' : 'Répartition Hebdomadaire du Travail Personnel'}</span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">Total: 510 min</span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-4 items-end h-28">
          {dailyActivity.map((d, i) => {
            const heightPercent = Math.round((d.minutes / maxMinutes) * 100);
            return (
              <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-500">{d.minutes}m</span>
                <div
                  className="w-full bg-blue-600 rounded-t-md hover:bg-blue-700 transition"
                  style={{ height: `${heightPercent}%` }}
                  title={`${d.minutes} minutes`}
                />
                <span className="text-[10px] font-semibold text-slate-600">
                  {lang === 'ar' ? d.dayAr : d.dayFr}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject Mastery Distribution */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          {lang === 'ar' ? 'التمكن من الكفايات حسب المادة' : 'Taux de Maîtrise des Compétences par Matière'}
        </h4>
        <div className="space-y-2.5">
          {subjectMastery.map((sm, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium text-slate-800">
                <span>{lang === 'ar' ? sm.nameAr : sm.nameFr}</span>
                <span className="font-mono font-bold">{sm.score}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${sm.color}`}
                  style={{ width: `${sm.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak topics diagnosis */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Icons.AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>{lang === 'ar' ? 'محاور بيداغوجية مقترحة للتدعيم هذا الأسبوع' : 'Points fondamentaux à consolider cette semaine'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {weakTopics.map((topic, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs font-medium"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
