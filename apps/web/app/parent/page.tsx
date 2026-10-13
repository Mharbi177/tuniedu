'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { WeeklyProgressCard } from '@/components/parent/WeeklyProgressCard';
import { Icons } from '@/components/ui/icons';

interface ChildRecord {
  id: string;
  code: string;
  nameFr: string;
  nameAr: string;
  levelFr: string;
  levelAr: string;
  totalStudyHours: number;
  exercisesCompleted: number;
  averageScorePercentage: number;
  weakTopicsFr: string[];
  weakTopicsAr: string[];
}

const INITIAL_CHILDREN: ChildRecord[] = [
  {
    id: 'child_1',
    code: 'TUN-9842',
    nameFr: 'Elyes Mansour',
    nameAr: 'إلياس منصور',
    levelFr: '9ème Année de Base (Concours Neufième)',
    levelAr: 'السنة التاسعة أساسي (مناظرة النوفيام)',
    totalStudyHours: 4,
    exercisesCompleted: 18,
    averageScorePercentage: 88,
    weakTopicsFr: [
      'Développement des identités remarquables (2x - 3)²',
      'Cosinus dans un triangle rectangle (Théorème de Pythagore)',
    ],
    weakTopicsAr: [
      'نشر وتفكيك الجداءات المعتبرة (2x - 3)²',
      'جيب تمام زاوية حادة في مثلث قائم (مبرهنة فيثاغورس)',
    ],
  },
  {
    id: 'child_2',
    code: 'TUN-4190',
    nameFr: 'Yasmine Mansour',
    nameAr: 'ياسمين منصور',
    levelFr: '7ème Année de Base',
    levelAr: 'السنة السابعة أساسي',
    totalStudyHours: 3,
    exercisesCompleted: 22,
    averageScorePercentage: 94,
    weakTopicsFr: [
      'Nombres décimaux et priorités opératoires',
      'Symétrie axiale et constructions géométriques',
    ],
    weakTopicsAr: [
      'الأعداد العشرية والأولويات في الحساب',
      'التناظر المحوري والإنشاءات الهندسية',
    ],
  },
];

export default function ParentDashboardPage() {
  const { lang } = useLanguage();
  const [children, setChildren] = useState<ChildRecord[]>(INITIAL_CHILDREN);
  const [activeChildId, setActiveChildId] = useState<string>('child_1');
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [inputChildCode, setInputChildCode] = useState('');
  const [linkError, setLinkError] = useState('');
  const [linkSuccess, setLinkSuccess] = useState('');
  const [copied, setCopied] = useState(false);

  const activeChild = children.find((c) => c.id === activeChildId) || children[0];

  const handleCopy = () => {
    navigator.clipboard?.writeText(activeChild.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkChild = (e: React.FormEvent) => {
    e.preventDefault();
    setLinkError('');
    setLinkSuccess('');

    const trimmed = inputChildCode.trim().toUpperCase();
    if (!trimmed.startsWith('TUN-') || trimmed.length < 8) {
      setLinkError(
        lang === 'ar'
          ? 'صيغة المعرف غير صالحة. يجب أن يبدأ بـ TUN- متبوعاً بأربعة أرقام (مثال: TUN-5520)'
          : 'Format invalide. Le code doit débuter par TUN- suivi de 4 chiffres (ex: TUN-5520)'
      );
      return;
    }

    if (children.some((c) => c.code === trimmed)) {
      setLinkError(
        lang === 'ar' ? 'هذا التلميذ مرتبط بالفعل بحسابكم.' : 'Cet élève est déjà rattaché à votre compte.'
      );
      return;
    }

    // Add new child
    const newChild: ChildRecord = {
      id: `child_${Date.now()}`,
      code: trimmed,
      nameFr: `Élève ${trimmed}`,
      nameAr: `تلميذ ${trimmed}`,
      levelFr: '8ème Année de Base',
      levelAr: 'السنة الثامنة أساسي',
      totalStudyHours: 2,
      exercisesCompleted: 14,
      averageScorePercentage: 82,
      weakTopicsFr: ['Théorème de Thalès', 'Calcul littéral'],
      weakTopicsAr: ['مبرهنة طاليس', 'الحساب الحرفي'],
    };

    setChildren([...children, newChild]);
    setActiveChildId(newChild.id);
    setInputChildCode('');
    setLinkSuccess(
      lang === 'ar'
        ? `تم ربط التلميذ ${trimmed} بنجاح وتفعيل المتابعة الأسبوعية !`
        : `Élève ${trimmed} rattaché avec succès ! Rapports activés.`
    );
    setTimeout(() => {
      setLinkModalOpen(false);
      setLinkSuccess('');
    }, 1500);
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

        {/* Link Invitation Code & Action */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-3 rounded-2xl border border-blue-100 shadow-xs flex items-center gap-3">
            <div className="text-left">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {lang === 'ar' ? 'معرف التلميذ الحالي :' : 'Child ID Actif :'}
              </div>
              <div className="text-sm font-mono font-bold text-slate-900">{activeChild.code}</div>
            </div>
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition shadow-xs"
            >
              {copied ? (lang === 'ar' ? 'تم النسخ' : 'Copié !') : (lang === 'ar' ? 'نسخ الرمز' : 'Copier')}
            </button>
          </div>

          <button
            onClick={() => setLinkModalOpen(true)}
            className="px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition flex items-center gap-2"
          >
            <Icons.Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'ربط تلميذ جديد' : 'Lier un Enfant'}</span>
          </button>
        </div>
      </div>

      {/* Children Tab Switcher if multiple */}
      {children.length > 1 && (
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <span className="text-xs text-slate-500 mr-2 font-medium">
            {lang === 'ar' ? 'الأبناء المسجلون :' : 'Enfants rattachés :'}
          </span>
          {children.map((child) => {
            const isSelected = child.id === activeChildId;
            return (
              <button
                key={child.id}
                onClick={() => setActiveChildId(child.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {lang === 'ar' ? child.nameAr : child.nameFr} ({child.code})
              </button>
            );
          })}
        </div>
      )}

      {/* Linked Child Card */}
      <WeeklyProgressCard
        childName={lang === 'ar' ? activeChild.nameAr : activeChild.nameFr}
        level={lang === 'ar' ? activeChild.levelAr : activeChild.levelFr}
        totalStudyHours={activeChild.totalStudyHours}
        exercisesCompleted={activeChild.exercisesCompleted}
        averageScorePercentage={activeChild.averageScorePercentage}
        weakTopics={lang === 'ar' ? activeChild.weakTopicsAr : activeChild.weakTopicsFr}
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

      {/* Link Child Modal */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-blue-100 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Icons.Users className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">
                  {lang === 'ar' ? 'ربط حساب تلميذ جديد' : 'Rattacher un Compte Enfant'}
                </h3>
              </div>
              <button
                onClick={() => setLinkModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <Icons.X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'أدخل المعرف السري الخاص بطفلك (Child ID) المتاح على تطبيقه أو المسلم من الإدارة المدرسية لتفعيل المتابعة الأسبوعية المشتركة.'
                : 'Saisissez le Child ID délivré sur l\'espace élève de votre enfant pour activer la supervision conjointe en conformité INPDP.'}
            </p>

            <form onSubmit={handleLinkChild} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {lang === 'ar' ? 'رمز التلميذ (Child ID) :' : 'Code Enfant (Child ID) :'}
                </label>
                <input
                  type="text"
                  value={inputChildCode}
                  onChange={(e) => setInputChildCode(e.target.value)}
                  placeholder="Ex: TUN-5520"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                />
              </div>

              {linkError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800">
                  {linkError}
                </div>
              )}

              {linkSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <Icons.CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{linkSuccess}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLinkModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                </button>
                <button
                  type="submit"
                  disabled={!inputChildCode.trim()}
                  className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs disabled:opacity-40"
                >
                  {lang === 'ar' ? 'تأكيد الربط' : 'Valider la Liaison'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
