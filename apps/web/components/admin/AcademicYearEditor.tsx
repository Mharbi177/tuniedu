'use client';

import React, { useState } from 'react';
import { AcademicYear } from '@/lib/store';
import { Icons } from '@/components/ui/icons';

interface AcademicYearEditorProps {
  years: AcademicYear[];
  onSaveYear?: (year: AcademicYear) => void;
}

export function AcademicYearEditor({ years, onSaveYear }: AcademicYearEditorProps) {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>(years);
  const [selectedYear, setSelectedYear] = useState<AcademicYear>(years.find((y) => y.isActive) || years[0]);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleUpdateEndInstant = (newDateStr: string) => {
    // Append 22:59:59 UTC (which is 23:59:59 Africa/Tunis UTC+1)
    const newInstant = `${newDateStr}T22:59:59.000Z`;
    const updated = { ...selectedYear, endsAt: newInstant };
    setSelectedYear(updated);
    setAcademicYears((prev) => prev.map((y) => (y.id === updated.id ? updated : y)));
    setStatusMessage('Instant de fin d\'année configuré en fuseau Africa/Tunis. Les droits existants restent protégés.');
    if (onSaveYear) onSaveYear(updated);
  };

  return (
    <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-blue-100">
        <div>
          <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Paramétrage Calendrier National
          </div>
          <h3 className="text-lg font-bold text-slate-950 font-serif">
            Gestion des Années Scolaires & Expirations (Africa/Tunis)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Règle critique V1.0 : Aucun codage en dur du 31 août. Snapshot explicite lors de l&apos;achat.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
          Fuseau : Africa/Tunis
        </span>
      </div>

      {statusMessage && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-center gap-2">
          <Icons.CheckCircle className="w-4 h-4 text-blue-700" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {academicYears.map((ay) => (
          <div
            key={ay.id}
            onClick={() => setSelectedYear(ay)}
            className={`p-4 rounded-2xl border cursor-pointer transition ${
              selectedYear.id === ay.id
                ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20 shadow-xs'
                : 'border-slate-200 hover:border-blue-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-base text-slate-900">{ay.name}</span>
              {ay.isActive ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  ANNÉE ACTIVE EN COURS
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500">
                  CLÔTURÉE
                </span>
              )}
            </div>

            <div className="mt-3 space-y-1 text-xs text-slate-600 font-mono">
              <div>Début : {new Date(ay.startsAt).toLocaleDateString('fr-TN')}</div>
              <div>Échéance : {new Date(ay.endsAt).toLocaleDateString('fr-TN')} à 23:59:59 (Tunis)</div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Form for Selected Year */}
      <div className="p-5 rounded-2xl bg-blue-50/30 border border-blue-100 space-y-4">
        <h4 className="font-bold text-sm text-slate-900">
          Modifier l&apos;instant d&apos;expiration pour les futurs achats ({selectedYear.name})
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Date d&apos;échéance administrative (Africa/Tunis) :
            </label>
            <input
              type="date"
              defaultValue={selectedYear.endsAt.split('T')[0]}
              onChange={(e) => handleUpdateEndInstant(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Fuseau horaire imposé :
            </label>
            <input
              type="text"
              readOnly
              value="Africa/Tunis (UTC+1)"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono bg-slate-100 text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-[11px] text-blue-900 leading-relaxed">
          <strong>Important :</strong> Toute modification de cette date ne s&apos;applique qu&apos;aux
          nouveaux achats réalisés à partir de cet instant. Les droits d&apos;accès déjà octroyés conservent leur snapshot originel immuable.
        </div>
      </div>
    </div>
  );
}
