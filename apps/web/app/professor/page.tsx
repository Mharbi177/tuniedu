'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { useLanguage } from '@/lib/language-context';
import { SalesLedgerTable } from '@/components/professor/SalesLedgerTable';
import { SecureUploadModal } from '@/components/professor/SecureUploadModal';
import { Icons } from '@/components/ui/icons';

export default function ProfessorStudioPage() {
  const { lang, isRtl } = useLanguage();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [payoutSuccessMessage, setPayoutSuccessMessage] = useState('');

  const profBooks = store.books.filter((b) => b.professorId === 'prof_profile_1');
  const profLedger = store.ledger.filter((l) => l.professorId === 'prof_profile_1');

  const totalSalesMillimes = profLedger
    .filter((l) => l.type === 'SALE')
    .reduce((acc, l) => acc + l.amountMillimes, 0);

  const totalCommissionsMillimes = profLedger
    .filter((l) => l.type === 'PLATFORM_COMMISSION')
    .reduce((acc, l) => acc + l.amountMillimes, 0);

  const netEarningsMillimes = totalSalesMillimes - totalCommissionsMillimes;

  const handleRequestPayout = () => {
    setPayoutSuccessMessage(
      lang === 'ar'
        ? `تم تسجيل طلب التحويل البنكي بمبلغ صافي قدره ${(netEarningsMillimes / 1000).toFixed(3)} د.ت. تتم المعالجة من الإدارة في غضون 48 ساعة عمل.`
        : `Demande de virement bancaire enregistrée pour un montant net de ${(netEarningsMillimes / 1000).toFixed(3)} DT. Traitement par l'administration sous 48h ouvrées.`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-blue-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              {lang === 'ar' ? 'فضاء الأستاذ المؤلف' : 'Studio Auteur & Enseignant'}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 flex items-center gap-1 shadow-xs">
              <Icons.CheckCircle className="w-3 h-3 text-blue-700" />
              {lang === 'ar' ? 'مدرّس معتمد وموثق' : 'Statut Vérifié'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 font-serif tracking-tight mt-1">
            {lang === 'ar' ? 'الأستاذ هشام بن سالم — فضاء التأليف والنشر' : 'Prof. Hichem Ben Salem — Espace Édition'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'ar'
              ? 'إدارة المؤلفات المنشورة، مراجعة الألواح الرقمية، ومتابعة العائدات الصافية (عمولة المنصة 10%).'
              : 'Gérez vos publications, prévisualisez les planches numérisées et suivez vos revenus nets (commission plateforme 10%).'}
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-xs transition active:scale-95"
        >
          <Icons.Upload className="w-4 h-4" />
          <span>{lang === 'ar' ? 'إيداع مخطوط بيداغوجي جديد (PDF)' : 'Déposer un Nouveau Manuscrit PDF'}</span>
        </button>
      </div>

      {payoutSuccessMessage && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-950 flex items-center gap-2 shadow-xs">
          <Icons.CheckCircle className="w-5 h-5 text-blue-700 shrink-0" />
          <span>{payoutSuccessMessage}</span>
        </div>
      )}

      {/* Published Works Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950 font-serif">
            {lang === 'ar' ? 'المؤلفات المعتمدة قيد التداول' : 'Vos Manuels Publiés & En Ligne'}
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {profBooks.length} {lang === 'ar' ? 'مؤلف معتمد' : 'ouvrage en distribution'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profBooks.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl border border-blue-100 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-300 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-100">
                    {lang === 'ar' ? (b.levelNameAr || b.levelNameFr) : b.levelNameFr}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {lang === 'ar' ? 'منشور رسمياً' : 'PUBLIÉ'}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-950 leading-snug">{b.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{b.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">
                    {lang === 'ar' ? 'سعر النفاذ السنوي :' : 'Prix élève :'}
                  </div>
                  <div className="text-sm font-bold text-slate-950 font-mono">
                    {(b.priceMillimes / 1000).toFixed(3)} {lang === 'ar' ? 'د.ت' : 'DT'}
                  </div>
                </div>

                <Link
                  href={`/catalogue/${b.slug}`}
                  className="px-3.5 py-1.5 rounded-xl border border-blue-200 text-blue-900 hover:bg-blue-50 text-xs font-semibold shadow-xs"
                >
                  {lang === 'ar' ? 'معاينة الفهرس' : 'Fiche Publique'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Ledger & 10% Platform Commission Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950 font-serif">
            {lang === 'ar'
              ? 'التقرير المالي وحقوق التأليف (عمولة المنصة 10% · المستحقات الصافية 90%)'
              : 'Comptabilité & Rémunération des Ventes (Commission 10% · Rémunération Nette 90%)'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'ar'
              ? 'مطابق لميثاق الشفافية المالية لمنصة TuniEdu — اقتطاع 10% لتغطية الخوادم المشفرة ومعالجة الدفع، وصرف 90% للأستاذ.'
              : 'Conforme au principe de transparence contractuelle — 10% de frais d\'infrastructure et passerelle de paiement, 90% reversés à l\'enseignant.'}
          </p>
        </div>

        <SalesLedgerTable
          entries={profLedger}
          totalSalesMillimes={totalSalesMillimes}
          totalCommissionsMillimes={totalCommissionsMillimes}
          netEarningsMillimes={netEarningsMillimes}
          onRequestPayout={handleRequestPayout}
        />
      </div>

      {/* Upload Pipeline Modal */}
      <SecureUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={() => {}}
      />
    </div>
  );
}
