'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { useLanguage } from '@/lib/language-context';
import { SalesLedgerTable } from '@/components/professor/SalesLedgerTable';
import { SecureUploadModal } from '@/components/professor/SecureUploadModal';
import { Icons } from '@/components/ui/icons';

const TUNISIAN_BANKS = [
  { id: 'BIAT', name: 'Banque Internationale Arabe de Tunisie (BIAT)' },
  { id: 'ATTIJARI', name: 'Attijariwafa Bank Tunisie' },
  { id: 'STB', name: 'Société Tunisienne de Banque (STB)' },
  { id: 'BNA', name: 'Banque Nationale Agricole (BNA)' },
  { id: 'AMEN', name: 'Amen Bank' },
  { id: 'UBCI', name: 'Union Bancaire pour le Commerce et l\'Industrie (UBCI)' },
  { id: 'BH', name: 'Banque de l\'Habitat (BH Bank)' },
  { id: 'POSTE_D17', name: 'La Poste Tunisienne — Compte D17 / CCP' },
];

export default function ProfessorStudioPage() {
  const { lang, isRtl } = useLanguage();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [payoutSuccessMessage, setPayoutSuccessMessage] = useState('');
  const [selectedBank, setSelectedBank] = useState('BIAT');
  const [ribInput, setRibInput] = useState('08 024 0123456789012 34');

  const profBooks = store.books.filter((b) => b.professorId === 'prof_profile_1');
  const profLedger = store.ledger.filter((l) => l.professorId === 'prof_profile_1');

  const totalSalesMillimes = profLedger
    .filter((l) => l.type === 'SALE')
    .reduce((acc, l) => acc + l.amountMillimes, 0);

  const totalCommissionsMillimes = profLedger
    .filter((l) => l.type === 'PLATFORM_COMMISSION')
    .reduce((acc, l) => acc + l.amountMillimes, 0);

  const netEarningsMillimes = totalSalesMillimes - totalCommissionsMillimes;

  const handleConfirmPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutModalOpen(false);
    setPayoutSuccessMessage(
      lang === 'ar'
        ? `تم تسجيل طلب التحويل البنكي (${selectedBank}) بمبلغ صافي ${(netEarningsMillimes / 1000).toFixed(3)} د.ت. تتم المعالجة في غضون 48 ساعة عمل.`
        : `Demande de virement (${selectedBank}) de ${(netEarningsMillimes / 1000).toFixed(3)} DT enregistrée. Traitement sous 48h ouvrées.`
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
              ? 'إدارة المؤلفات المنشورة، مراجعة الألواح الرقمية، ومتابعة العائدات الصافية (عمولة المنصة 20%).'
              : 'Gérez vos publications, prévisualisez les planches numérisées et suivez vos revenus nets (commission plateforme 20%).'}
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
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex items-center gap-2 shadow-xs animate-in fade-in duration-200">
          <Icons.CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>{payoutSuccessMessage}</span>
        </div>
      )}

      {/* Royalties Split & Financial Snapshot Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-xs space-y-2">
          <div className="text-xs text-slate-500 font-medium">
            {lang === 'ar' ? 'إجمالي المبيعات الخام' : 'Chiffre d\'Affaires Brut'}
          </div>
          <div className="text-2xl font-bold font-mono text-slate-950">
            {(totalSalesMillimes / 1000).toFixed(3)}{' '}
            <span className="text-xs font-sans text-blue-700 font-bold">{lang === 'ar' ? 'د.ت' : 'DT'}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            {profLedger.filter((l) => l.type === 'SALE').length} {lang === 'ar' ? 'عملية اقتناء مؤكدة' : 'commandes validées'}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-xs space-y-2">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>{lang === 'ar' ? 'عمولة منصة TuniEdu (20%)' : 'Frais Plateforme (20%)'}</span>
            <span className="text-[10px] bg-blue-50 text-blue-800 font-bold px-1.5 py-0.5 rounded border border-blue-200">2000 bps</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-600">
            -{(totalCommissionsMillimes / 1000).toFixed(3)}{' '}
            <span className="text-xs font-sans text-slate-500 font-bold">{lang === 'ar' ? 'د.ت' : 'DT'}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            {lang === 'ar' ? 'تغطية التشفير، الخوادم ووسائط الدفع' : 'Hébergement haute sécurité & frais bancaires'}
          </div>
        </div>

        <div className="bg-[#0F2942] text-white p-6 rounded-3xl border border-[#0A1C2E] shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="text-xs text-blue-200 font-medium">
              {lang === 'ar' ? 'المستحقات الصافية للمؤلف (80%)' : 'Rémunération Nette Auteur (80%)'}
            </div>
            <div className="text-3xl font-bold font-mono text-white mt-1">
              {(netEarningsMillimes / 1000).toFixed(3)}{' '}
              <span className="text-xs font-sans text-blue-300 font-bold">{lang === 'ar' ? 'د.ت' : 'DT'}</span>
            </div>
          </div>
          <button
            onClick={() => setPayoutModalOpen(true)}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-xs flex items-center justify-center gap-2"
          >
            <Icons.CreditCard className="w-4 h-4" />
            <span>{lang === 'ar' ? 'طلب تحويل بنكي (RIB)' : 'Demander le Virement'}</span>
          </button>
        </div>
      </div>

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

      {/* Financial Ledger & 20% Platform Commission Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950 font-serif">
            {lang === 'ar'
              ? 'التقرير المالي وحقوق التأليف (عمولة المنصة 20% · المستحقات الصافية 80%)'
              : 'Comptabilité & Rémunération des Ventes (Commission 20% · Rémunération Nette 80%)'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'ar'
              ? 'مطابق لميثاق الشفافية المالية لمنصة TuniEdu — اقتطاع 20% لتغطية الخوادم المشفرة ومعالجة الدفع، وصرف 80% للأستاذ.'
              : 'Conforme au principe de transparence contractuelle — 20% de frais d\'infrastructure et passerelle de paiement, 80% reversés à l\'enseignant.'}
          </p>
        </div>

        <SalesLedgerTable
          entries={profLedger}
          totalSalesMillimes={totalSalesMillimes}
          totalCommissionsMillimes={totalCommissionsMillimes}
          netEarningsMillimes={netEarningsMillimes}
          onRequestPayout={() => setPayoutModalOpen(true)}
        />
      </div>

      {/* Payout Withdrawal Modal */}
      {payoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-blue-100 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Icons.CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {lang === 'ar' ? 'طلب صرف المستحقات الصافية (RIB)' : 'Demande de Virement Bancaire (RIB)'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar' ? 'تسوية شهرية لحقوق التأليف البيداغوجية' : 'Paiement sécurisé sur compte tunisien agréé'}
                  </p>
                </div>
              </div>
              <button onClick={() => setPayoutModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmPayout} className="space-y-4">
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-1">
                <div className="text-xs text-slate-600">
                  {lang === 'ar' ? 'المبلغ المستحق الصافي (90%) :' : 'Montant Net à Virer :'}
                </div>
                <div className="text-2xl font-bold font-mono text-slate-950">
                  {(netEarningsMillimes / 1000).toFixed(3)} {lang === 'ar' ? 'د.ت' : 'DT'}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {lang === 'ar' ? 'المؤسسة البنكية أو البريدية :' : 'Établissement Bancaire / Postal :'}
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                >
                  {TUNISIAN_BANKS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {lang === 'ar' ? 'رقم الهوية البريدية / البنكية (RIB - 20 رقم) :' : 'Relevé d\'Identité Bancaire (RIB - 20 chiffres) :'}
                </label>
                <input
                  type="text"
                  value={ribInput}
                  onChange={(e) => setRibInput(e.target.value)}
                  placeholder="08 024 0123456789012 34"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPayoutModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs"
                >
                  {lang === 'ar' ? 'تأكيد أمر التحويل' : 'Valider le Virement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Pipeline Modal */}
      <SecureUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={() => {}}
      />
    </div>
  );
}
