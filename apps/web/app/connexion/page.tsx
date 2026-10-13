'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { store } from '@/lib/store';
import { Icons } from '@/components/ui/icons';

export default function ConnexionPage() {
  const router = useRouter();
  const { lang, isRtl } = useLanguage();

  // Role selector: Student (Child), Parent, Professor
  const [activeRole, setActiveRole] = useState<'STUDENT' | 'PARENT' | 'PROFESSOR'>('STUDENT');
  const [emailOrPhone, setEmailOrPhone] = useState('elyes@tuniedu.tn');
  const [password, setPassword] = useState('');

  // Parent specific: mandatory Child ID
  const [childId, setChildId] = useState('TUN-9842');

  // Professor specific: mandatory 10% platform commission terms acceptance
  const [acceptedCommissionTerms, setAcceptedCommissionTerms] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (role: 'STUDENT' | 'PARENT' | 'PROFESSOR') => {
    setActiveRole(role);
    setErrorMessage('');
    if (role === 'STUDENT') {
      setEmailOrPhone('elyes@tuniedu.tn');
    } else if (role === 'PARENT') {
      setEmailOrPhone('sihem@tuniedu.tn');
    } else if (role === 'PROFESSOR') {
      setEmailOrPhone('prof.bensalem@tuniedu.tn');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation for Professor: must accept 10% platform terms
    if (activeRole === 'PROFESSOR' && !acceptedCommissionTerms) {
      setErrorMessage(
        lang === 'ar'
          ? 'يجب الموافقة الصريحة على شروط المنصة وعمولة الـ 10% على مبيعات الكتب لمتابعة تسجيل الدخول.'
          : 'Vous devez expressément accepter les conditions générales et la commission de plateforme de 10% sur les livres pour accéder à votre espace auteur.'
      );
      return;
    }

    // Validation for Parent: must enter Child ID
    if (activeRole === 'PARENT' && !childId.trim()) {
      setErrorMessage(
        lang === 'ar'
          ? 'يرجى إدخال المعرّف الرقمي للتلميذ (Child ID) لربط الحساب ومتابعة نتائجه وساعات دراسته.'
          : 'Veuillez saisir l\'identifiant unique de votre enfant (Child ID) pour activer la liaison parentale et le suivi scolaire.'
      );
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (activeRole === 'STUDENT') {
        store.setCurrentUser('user_student_1');
        router.push('/student/library');
      } else if (activeRole === 'PARENT') {
        store.setCurrentUser('user_parent_1');
        router.push('/parent');
      } else if (activeRole === 'PROFESSOR') {
        store.setCurrentUser('user_prof_1');
        router.push('/professor');
      }
      setIsSubmitting(false);
    }, 450);
  };

  return (
    // Clean White & Sky-Blue Canvas (#F8FAFC) with soothing eye-comfort blue accents (#1D4ED8, #0F2942)
    <div className="min-h-[88vh] bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(29,78,216,0.06)] p-7 sm:p-9 space-y-7">
        
        {/* Child Eye-Protection & Visual Ergonomics Badge (White & Blue) */}
        <div className="flex items-center justify-between px-3 py-2 bg-blue-50/80 border border-blue-200/80 rounded-xl text-[11px] text-blue-900">
          <div className="flex items-center gap-2 font-medium">
            <Icons.Eye className="w-4 h-4 text-blue-700 shrink-0" />
            <span>
              {lang === 'ar'
                ? 'حماية بصرية للأطفال والتلاميذ · واجهة بيضاء وزرقاء مريحة للنظر'
                : 'Confort visuel certifié pour les élèves · Palette blanche et bleue reposante pour les yeux'}
            </span>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
            {lang === 'ar' ? 'معتمد' : 'Certifié'}
          </span>
        </div>

        {/* Institutional Crest & Portal Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-900 border border-blue-800 text-white flex items-center justify-center mx-auto shadow-xs">
            <Icons.Book className="w-6 h-6 text-blue-300" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-serif">
            {lang === 'ar' ? 'فضاء تسجيل الدخول البيداغوجي الموحد' : 'Portail d\'Accès Éducatif Sécurisé'}
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            {lang === 'ar'
              ? 'المنصة الوطنية التونسية للكتب المدرسية المعتمدة ومتابعة التحصيل العلمي'
              : 'Accès institutionnel aux manuels scolaires officiels et au suivi des apprentissages'}
          </p>
        </div>

        {/* Role Selector: Élève (Child), Parent, Professeur */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            {lang === 'ar' ? 'اختر صفتك لتسجيل الدخول :' : 'Identifiez votre profil d\'accès :'}
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-blue-50/50 rounded-xl text-xs font-semibold border border-blue-100">
            <button
              type="button"
              onClick={() => handleRoleChange('STUDENT')}
              className={`py-2.5 px-2 rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                activeRole === 'STUDENT'
                  ? 'bg-blue-700 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-blue-900 hover:bg-white'
              }`}
            >
              <Icons.GraduationCap className={`w-4 h-4 ${activeRole === 'STUDENT' ? 'text-white' : 'text-blue-600'}`} />
              <span>{lang === 'ar' ? 'تلميذ (طفل)' : 'Élève'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('PARENT')}
              className={`py-2.5 px-2 rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                activeRole === 'PARENT'
                  ? 'bg-blue-700 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-blue-900 hover:bg-white'
              }`}
            >
              <Icons.Users className={`w-4 h-4 ${activeRole === 'PARENT' ? 'text-white' : 'text-blue-600'}`} />
              <span>{lang === 'ar' ? 'ولي أمر' : 'Parent'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('PROFESSOR')}
              className={`py-2.5 px-2 rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                activeRole === 'PROFESSOR'
                  ? 'bg-blue-700 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-blue-900 hover:bg-white'
              }`}
            >
              <Icons.FileText className={`w-4 h-4 ${activeRole === 'PROFESSOR' ? 'text-white' : 'text-blue-600'}`} />
              <span>{lang === 'ar' ? 'أستاذ مؤلّف' : 'Professeur'}</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-2.5">
            <Icons.AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Main Authentication Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          
          {/* Main Identifier Field */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">
              {activeRole === 'STUDENT'
                ? lang === 'ar' ? 'البريد الإلكتروني للتلميذ أو المعرّف المدرسي :' : 'Email scolaire ou Identifiant de l\'élève :'
                : activeRole === 'PARENT'
                ? lang === 'ar' ? 'البريد الإلكتروني للولي أو رقم الهاتف (تونس) :' : 'Email ou Téléphone portable du parent (+216) :'
                : lang === 'ar' ? 'البريد الأكاديمي للأستاذ أو المعرّف البيداغوجي :' : 'Email académique de l\'enseignant ou Matricule :'}
            </label>
            <input
              type="text"
              required
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder={
                activeRole === 'STUDENT'
                  ? 'elyes@tuniedu.tn'
                  : activeRole === 'PARENT'
                  ? 'contact@famille.tn'
                  : 'prof.bensalem@tuniedu.tn'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 transition"
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-700">
                {lang === 'ar' ? 'كلمة المرور :' : 'Mot de passe :'}
              </label>
              <button
                type="button"
                className="text-[11px] text-blue-700 hover:underline"
              >
                {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Oublié ?'}
              </button>
            </div>
            <input
              type="password"
              required
              value={password || '••••••••'}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 transition"
            />
          </div>

          {/* PARENT SPECIFIC WORKFLOW: Mandatory Child ID Pairing */}
          {activeRole === 'PARENT' && (
            <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
                  <Icons.Users className="w-4 h-4 text-blue-700" />
                  <span>{lang === 'ar' ? 'المعرّف الرقمي للتلميذ (Child ID) :' : 'Identifiant Unique de l\'Enfant (Child ID) :'}</span>
                </div>
                <span className="text-[10px] font-semibold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                  {lang === 'ar' ? 'إجباري للربط' : 'Obligatoire'}
                </span>
              </div>
              
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'أدخل المعرف الرقمي الخاص بابنك (المسلم من المؤسسة التربوية) لتمكين المتابعة المباشرة لمواقيت المراجعة وسجل التقييمات.'
                  : 'Saisissez l\'identifiant unique de votre enfant (fourni par l\'établissement) pour synchroniser ses manuels, son temps d\'étude et ses résultats.'}
              </p>

              <div className="relative">
                <input
                  type="text"
                  required
                  value={childId}
                  onChange={(e) => setChildId(e.target.value)}
                  placeholder="Ex: TUN-9842"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-blue-300 font-mono text-xs text-blue-950 bg-white uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                />
              </div>

              {/* Verified child feedback card */}
              <div className="p-2.5 bg-white rounded-lg border border-blue-200 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-[10px]">
                    EM
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">
                      {lang === 'ar' ? 'إلياس منصور' : 'Elyes Mansour'}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {lang === 'ar' ? 'السنة التاسعة أساسي · إعدادية نموذجية' : '9ème Année de Base · Collège Pilote'}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-blue-700 font-semibold flex items-center gap-1 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                  <Icons.Check className="w-3 h-3 text-blue-600" />
                  {lang === 'ar' ? 'تم التعرف' : 'Identifié'}
                </span>
              </div>
            </div>
          )}

          {/* PROFESSOR SPECIFIC WORKFLOW: Mandatory Acceptance of 10% Platform Terms on Books */}
          {activeRole === 'PROFESSOR' && (
            <div className="p-4 bg-slate-50 border border-blue-200/70 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Icons.CreditCard className="w-4 h-4 text-blue-700" />
                  <span>
                    {lang === 'ar'
                      ? 'ميثاق النشر وعمولة المنصة (10% على كل كتاب) :'
                      : 'Conditions d\'Édition & Commission Plateforme (10%) :'}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  10% (1000 bps)
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-600 leading-relaxed space-y-1.5">
                <p>
                  {lang === 'ar'
                    ? 'تنص الشروط التعاقدية لمنصة TuniEdu على اقتطاع عمولة بنسبة 10% من سعر بيع كل كتاب لتغطية استضافة الخوادم المشفرة، حماية الملكية الفكرية، البصمة المائية الرقمية، ورسوم معالجة الدفع الإلكتروني.'
                    : 'Les conditions contractuelles de TuniEdu fixent la commission de plateforme à 10% (1000 bps) sur le prix de vente de chaque manuel pour la sécurisation des contenus, le filigrane nominatif anti-piratage, l\'hébergement haute disponibilité et les frais de passerelle bancaire.'}
                </p>
                <div className="font-semibold text-blue-900 pt-1 border-t border-slate-100">
                  {lang === 'ar'
                    ? 'المستحقات الصافية للمؤلّف : 90% تصرف شهريا عبر تحويل بنكي رسمي (RIB).'
                    : 'Reversement contractuel : 90% des recettes nettes sont versées mensuellement par virement bancaire sur votre RIB tunisien.'}
                </div>
              </div>

              <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptedCommissionTerms}
                  onChange={(e) => setAcceptedCommissionTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-600 border-slate-300"
                />
                <span className="text-[11px] text-slate-900 font-semibold leading-tight">
                  {lang === 'ar'
                    ? 'أوافق بصفتي أستاذاً مؤلفاً على شروط المنصة وعمولة الـ 10% على مبيعات كتبي.'
                    : 'J\'accepte expressément les conditions de la plateforme et la commission de 10% sur la vente de mes manuels scolaires.'}
                </span>
              </label>
            </div>
          )}

          {/* Child Mode Comfort Notice when Student is selected */}
          {activeRole === 'STUDENT' && (
            <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl flex items-center gap-2.5 text-[11px] text-blue-900">
              <Icons.Shield className="w-4 h-4 text-blue-700 shrink-0" />
              <span className="leading-snug">
                {lang === 'ar'
                  ? 'فضاء مخصص للأطفال والتلاميذ : واجهة مريحة باللون الأبيض والأزرق، وحماية ضد النسخ غير المصرح به.'
                  : 'Espace sécurisé pour les élèves : interface épurée blanche et bleue, typographie aérée et lecture protégée.'}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || (activeRole === 'PROFESSOR' && !acceptedCommissionTerms)}
            className="w-full py-3.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs tracking-wide transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <span>{lang === 'ar' ? 'جارٍ التحقق من الهوية...' : 'Vérification de l\'accès...'}</span>
            ) : (
              <span>
                {activeRole === 'STUDENT'
                  ? lang === 'ar' ? 'الدخول إلى فضاء التلميذ والمكتبة' : 'Accéder à la Bibliothèque & Mes Manuels'
                  : activeRole === 'PARENT'
                  ? lang === 'ar' ? 'الدخول ومتابعة التلميذ' : 'Accéder au Relevé Pédagogique de l\'Enfant'
                  : lang === 'ar' ? 'الدخول إلى استوديو الأستاذ المؤلف' : 'Accéder au Studio Auteur'}
              </span>
            )}
            <Icons.ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <Link href="/inscription" className="hover:text-blue-700 font-medium transition">
            {lang === 'ar' ? 'إنشاء حساب جديد' : 'Créer un compte'}
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/" className="hover:text-blue-700 transition">
            {lang === 'ar' ? 'العودة للموقع الرسمي' : 'Retour au portail officiel'}
          </Link>
        </div>
      </div>
    </div>
  );
}
