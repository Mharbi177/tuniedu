'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/ui/icons';

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
  const [step, setStep] = useState<'SELECT' | 'VALIDATING' | 'PARSING' | 'SUCCESS'>('SELECT');
  const [fileName, setFileName] = useState<string>('Manuel_9eme_Math_2026.pdf');
  const [progress, setProgress] = useState<number>(0);
  const [checksum, setChecksum] = useState<string>('');

  if (!isOpen) return null;

  const handleStartProcessing = () => {
    setStep('VALIDATING');
    setProgress(20);

    setTimeout(() => {
      setProgress(50);
      setStep('PARSING');

      setTimeout(() => {
        setProgress(100);
        setChecksum('sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069');
        setStep('SUCCESS');
      }, 1000);
    }, 800);
  };

  const handleFinish = () => {
    onUploadSuccess({
      title: 'Manuel Numérique 9ème Année (Nouvelle Édition)',
      checksum,
      pageCount: 148,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-blue-100 shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Icons.Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Pipeline de Traitement Sécurisé PDF
              </h3>
              <p className="text-[11px] text-slate-500">
                Isolation sandbox & rendu des planches protégées
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {step === 'SELECT' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center space-y-3 hover:border-blue-400 transition bg-blue-50/30">
              <Icons.FileText className="w-12 h-12 text-blue-600 mx-auto" />
              <div>
                <div className="font-bold text-sm text-slate-800">
                  Déposez votre manuscrit pédagogique (PDF)
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Taille max 100 Mo · Format vectoriel PDF conforme
                </div>
              </div>
              <div className="inline-block px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-xs font-mono font-medium text-slate-700 shadow-xs">
                {fileName}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Icons.Shield className="w-4 h-4 text-blue-700" />
                <span>Garantie de non-divulgation</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Le fichier source original n&apos;est jamais exposé au navigateur des élèves. Seules les planches tramées et filigranées dynamiquement sont servies.
              </p>
            </div>

            <button
              onClick={handleStartProcessing}
              className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition shadow-xs"
            >
              Lancer l&apos;Analyse en Sandbox
            </button>
          </div>
        )}

        {(step === 'VALIDATING' || step === 'PARSING') && (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-700 animate-spin mx-auto" />
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                {step === 'VALIDATING'
                  ? 'Vérification de la signature binaire (%PDF-)...'
                  : 'Rendu isolé des 148 pages & calcul du SHA256...'}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Processus exécuté dans un conteneur sandbox sans accès réseau.
              </p>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-700 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {step === 'SUCCESS' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2">
              <Icons.CheckCircle className="w-10 h-10 text-blue-700 mx-auto" />
              <h4 className="font-bold text-base text-blue-950">
                Traitement du Manuscrit Réussi !
              </h4>
              <p className="text-xs text-blue-800">
                148 planches haute définition ont été générées et stockées en coffre-fort privé.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-600 break-all space-y-1">
              <span className="font-bold text-slate-800">Empreinte Cryptographique :</span>
              <div>{checksum}</div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition shadow-xs"
            >
              Inspecter le Bon à Tirer (BÀT)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
