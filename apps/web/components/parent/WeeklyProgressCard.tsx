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

  return (
    <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center font-bold text-sm shadow-xs">
            EM
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {lang === 'ar' ? 'تقرير المتابعة والنشاط الأسبوعي' : 'Rapport d\'activité hebdomadaire'}
            </div>
            <h3 className="text-lg font-bold text-slate-950 font-serif">{childName}</h3>
            <div className="text-xs text-blue-700 font-medium">{level}</div>
          </div>
        </div>

        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 flex items-center gap-1.5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          {lang === 'ar' ? 'حساب التلميذ مرتبط ومؤكد' : 'Compte Enfant Lié & Vérifié'}
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
          <div className="text-[11px] text-slate-400 mt-0.5">
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
