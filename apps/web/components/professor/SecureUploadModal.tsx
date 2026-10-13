'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/ui/icons';
import { useLanguage } from '@/lib/language-context';

interface SecureUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (bookData: any) => void;
}

export function SecureUploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
}: SecureUploadModalProps) {
  const { lang } = useLanguage();
  const [step, setStep] = useState<'SELECT' | 'VALIDATING' | 'PARSING' | 'SUCCESS'>('SELECT');
  const [fileName, setFileName] = useState<string>('Manuel_9eme_Math_2026.pdf');
  const [fileSizeMb, setFileSizeMb] = useState<number>(14.2);
  const [progress, setProgress] = useState<number>(0);
  const [checksum, setChecksum] = useState<string>('');
  const [simulatedPages, setSimulatedPages] = useState<number>(148);

  if (!isOpen) return null;

  const handleStartProcessing = () => {
    setStep('VALIDATING');
    setProgress(25);

    setTimeout(() => {
      setProgress(60);
      setStep('PARSING');

      setTimeout(() => {
        setProgress(100);
        setChecksum('sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069');
        setStep('SUCCESS');
      }, 900);
    }, 700);
  };

  const handleFinish = () => {
    onUploadSuccess({
      title: 'Manuel Numérique 9ème Année (Nouvelle Édition)',
      checksum,
      pageCount: simulatedPages,
    });
    setStep('SELECT');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-blue-100 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Icons.Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {lang === 'ar' ? 'معالجة وتشفير المخطوط البيداغوجي (PDF)' : 'Pipeline Sécurisé de Traitement PDF'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {lang === 'ar' ? 'فحص البصمة الثنائية (%PDF-) وعزل الصفحات' : 'Inspection binaire (%PDF-) & isolation sandbox'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {step === 'SELECT' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center space-y-3 hover:border-blue-400 transition bg-blue-50/20">
              <Icons.FileText className="w-12 h-12 text-blue-600 mx-auto" />
              <div>
                <div className="font-bold text-sm text-slate-800">
                  {lang === 'ar' ? 'المخطوط البيداغوجي المعتمد' : 'Déposez votre manuscrit pédagogique'}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {lang === 'ar' ? 'نسق PDF حصرياً · حجم أقصى 100 ميغابايت' : 'Format vectoriel PDF · Max 100 Mo'}
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-blue-200 text-xs font-mono font-medium text-slate-800 shadow-xs">
                <span>{fileName}</span>
                <span className="text-slate-400">({fileSizeMb} Mo)</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl text-xs text-slate-600 space-y-1.5 border border-slate-200/60">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Icons.Shield className="w-4 h-4 text-blue-700" />
                <span>{lang === 'ar' ? 'ضمان الأمان والملكية الفكرية (SEC-14)' : 'Garantie de Protection & Non-Divulgation (SEC-14)'}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {lang === 'ar'
                  ? 'لا يتاح الملف الأصلي للمتصفحات. تُقسَّم الصفحات في بيئة معزولة، وتُختم ببصمة مائية ديناميكية مشفرة باسم التلميذ ورقم المعاملة.'
                  : 'Le PDF brut original n\'est jamais exposé au client. Chaque planche est convertie en vecteur isolé avec filigrane nominatif dynamique.'}
              </p>
            </div>

            <button
              onClick={handleStartProcessing}
              className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition shadow-xs"
            >
              {lang === 'ar' ? 'بدء الفحص والتشفير الآمن' : 'Lancer l\'Inspection & le Traitement Sécurisé'}
            </button>
          </div>
        )}

        {(step === 'VALIDATING' || step === 'PARSING') && (
          <div className="py-8 space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center mx-auto animate-pulse">
              <Icons.Shield className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-900">
                {step === 'VALIDATING'
                  ? (lang === 'ar' ? 'فحص البصمة السحرية %PDF- والتحقق من التوقيع...' : 'Vérification de la signature binaire (%PDF-)...')
                  : (lang === 'ar' ? 'توليد الألواح المشفرة والفهرس الرقمي...' : 'Génération des planches sécurisées & filigrane dynamique...')}
              </h4>
              <p className="text-xs text-slate-500">
                {lang === 'ar' ? 'معالجة سحابية آمنة في خوادم TuniEdu' : 'Traitement en sandbox cryptographique étanche'}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-blue-700">{progress}%</span>
          </div>
        )}

        {step === 'SUCCESS' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <Icons.CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="font-bold text-sm text-emerald-950">
                {lang === 'ar' ? 'تمت معالجة وتأمين المخطوط بنجاح !' : 'Manuscrit Traité & Validé avec Succès !'}
              </div>
              <p className="text-xs text-emerald-800">
                {lang === 'ar'
                  ? `تم استخراج ${simulatedPages} صفحة مشفرة، وتجهيز الفهرس البيداغوجي.`
                  : `${simulatedPages} planches générées, filigrane dynamique injecté et indexation réussie.`}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl space-y-1.5 text-xs border border-slate-200/60 font-mono">
              <div className="text-slate-500 text-[10px] uppercase font-bold">{lang === 'ar' ? 'بصمة النزاهة الرقمية :' : 'Empreinte SHA-256 :'}</div>
              <div className="text-[11px] text-slate-800 break-all">{checksum}</div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition shadow-xs"
            >
              {lang === 'ar' ? 'حفظ وإرسال للمراجعة والاعتماد' : 'Finaliser & Soumettre à l\'Administration'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
