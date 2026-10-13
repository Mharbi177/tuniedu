'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Exercise } from '@/lib/store';
import { useLanguage } from '@/lib/language-context';
import { Icons } from '@/components/ui/icons';

interface ExerciseRendererProps {
  exercise: Exercise;
  hasAccess: boolean;
  onAttemptSubmitted?: (answer: string, isCorrect: boolean) => void;
  nextExerciseId?: string;
  bookId?: string;
}

export function ExerciseRenderer({
  exercise,
  hasAccess,
  onAttemptSubmitted,
  nextExerciseId,
  bookId,
}: ExerciseRendererProps) {
  const { lang, isRtl } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showCorrection, setShowCorrection] = useState<boolean>(false);

  const currentAnswer = exercise.type === 'MULTIPLE_CHOICE' ? selectedOption : numericAnswer;
  const isCorrect = isSubmitted && currentAnswer.trim().toLowerCase() === exercise.answerKey.trim().toLowerCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAnswer) return;
    setIsSubmitted(true);
    setShowCorrection(true);
    if (onAttemptSubmitted) {
      onAttemptSubmitted(currentAnswer, currentAnswer.trim().toLowerCase() === exercise.answerKey.trim().toLowerCase());
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setShowCorrection(false);
    setSelectedOption('');
    setNumericAnswer('');
  };

  return (
    <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Exercise Header */}
      <div className="flex items-center justify-between pb-4 border-b border-blue-100">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-xs shadow-xs">
            Q
          </span>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {exercise.type === 'MULTIPLE_CHOICE'
                ? lang === 'ar' ? 'سؤال متعدد الخيارات (QCM)' : 'Question à Choix Multiple (QCM)'
                : lang === 'ar' ? 'حساب عددي دقيق' : 'Calcul Numérique'}
            </div>
            <div className="text-sm font-semibold text-slate-900">
              {lang === 'ar' ? `العدد المسند : ${exercise.points} نقاط` : `Barème : ${exercise.points} point(s)`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {lang === 'ar' ? `الصعوبة : مستوى ${exercise.difficulty}` : `Difficulté : Niveau ${exercise.difficulty}`}
          </span>
          {hasAccess && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
              <Icons.Unlock className="w-3 h-3 text-blue-600" />
              {lang === 'ar' ? 'الإصلاح مشمول' : 'Corrigé Inclus'}
            </span>
          )}
        </div>
      </div>

      {/* Exercise Prompt */}
      <div className="text-base sm:text-lg font-bold text-slate-950 font-serif leading-snug">
        {exercise.prompt}
      </div>

      {/* Answer Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {exercise.type === 'MULTIPLE_CHOICE' && exercise.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exercise.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              let btnStyle = 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 text-slate-800 bg-white';

              if (isSubmitted) {
                if (opt === exercise.answerKey) {
                  btnStyle = 'border-blue-700 bg-blue-50 text-blue-950 font-bold ring-2 ring-blue-700/20';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-red-300 bg-red-50 text-red-900 font-semibold';
                }
              } else if (isSelected) {
                btnStyle = 'border-blue-700 bg-blue-50 text-blue-950 font-semibold ring-2 ring-blue-700/20';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(opt)}
                  className={`p-4 rounded-2xl border text-left text-sm font-mono transition flex items-center justify-between shadow-xs ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && opt === exercise.answerKey && (
                    <Icons.CheckCircle className="w-5 h-5 text-blue-700 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <Icons.X className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {exercise.type === 'NUMERIC' && (
          <div className="max-w-xs space-y-2">
            <label className="text-xs font-semibold text-slate-700">
              {lang === 'ar' ? 'النتيجة العددية :' : 'Votre résultat :'}
            </label>
            <input
              type="text"
              disabled={isSubmitted}
              value={numericAnswer}
              onChange={(e) => setNumericAnswer(e.target.value)}
              placeholder="Ex: 9"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 font-mono text-base text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 shadow-xs"
            />
          </div>
        )}

        {/* Action Button */}
        {!isSubmitted ? (
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={!currentAnswer}
              className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition shadow-xs disabled:opacity-40"
            >
              {lang === 'ar' ? 'تأكيد الإجابة وعرض الإصلاح' : 'Valider la réponse & Débloquer le corrigé'}
            </button>
          </div>
        ) : (
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-blue-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              <Icons.Refresh className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'إعادة المحاولة' : 'Recommencer'}</span>
            </button>
          </div>
        )}
      </form>

      {/* Official Pedagogical Correction Section */}
      {showCorrection && (
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div
            className={`p-4 rounded-2xl border ${
              isCorrect
                ? 'bg-blue-50 border-blue-200 text-blue-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <Icons.CheckCircle className="w-5 h-5 text-blue-700" />
                  <span>{lang === 'ar' ? 'إجابة ممتازة ! تعليل رياضي سليم.' : 'Réponse exacte ! Démarche conforme.'}</span>
                </>
              ) : (
                <>
                  <Icons.AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>
                    {lang === 'ar'
                      ? 'إجابة غير صحيحة. راجع الإصلاح النموذجي المفصل للمؤلف أسفله :'
                      : 'Réponse erronée. Examinez le corrigé détaillé ci-dessous :'}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Full pedagogical solution */}
          <div className="p-6 bg-blue-50/30 rounded-2xl border border-blue-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                <Icons.FileText className="w-4 h-4 text-blue-700" />
                <span>{lang === 'ar' ? 'الإصلاح البيداغوجي الرسمي المفصل' : 'Corrigé Officiel & Méthode de Rédaction'}</span>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-lg border border-blue-200 shadow-xs">
                {lang === 'ar' ? 'دورة المناظرات' : 'Édition Auteur'}
              </span>
            </div>

            <div className="text-sm text-slate-800 font-serif leading-relaxed whitespace-pre-line border-l-2 border-blue-600 pl-4 py-1">
              {exercise.solution}
            </div>

            <div className="pt-3 border-t border-blue-100/80 flex items-center justify-between text-xs text-slate-500">
              <span>{lang === 'ar' ? 'إعداد وتأليف : الأستاذ هشام بن سالم' : 'Rédaction officielle : Prof. Hichem Ben Salem'}</span>
              {nextExerciseId && (
                <Link
                  href={`/student/exercises/${nextExerciseId}`}
                  className="font-bold text-blue-700 hover:underline flex items-center gap-1"
                >
                  <span>{lang === 'ar' ? 'التمرين الموالي' : 'Exercice suivant'}</span>
                  <Icons.ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
