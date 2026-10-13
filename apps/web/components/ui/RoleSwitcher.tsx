'use client';

import React, { useState, useEffect } from 'react';
import { Icons } from './icons';

export interface UserPersona {
  id: string;
  name: string;
  role: 'STUDENT' | 'PARENT' | 'PROFESSOR' | 'ADMIN';
  roleLabel: string;
  badgeColor: string;
  avatar: string;
  details: string;
}

export const PERSONAS: UserPersona[] = [
  {
    id: 'user_student_1',
    name: 'Elyes Mansour',
    role: 'STUDENT',
    roleLabel: 'Élève (9ème Collège)',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    avatar: '👨‍🎓',
    details: 'Accès actif: Manuel 9ème Maths (Concours Neufième)',
  },
  {
    id: 'user_parent_1',
    name: 'Sihem Mansour',
    role: 'PARENT',
    roleLabel: 'Parent d\'élève',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    avatar: '👩‍👧',
    details: 'Compte lié à: Elyes Mansour (Suivi des heures et quiz)',
  },
  {
    id: 'user_prof_1',
    name: 'Prof. Hichem Ben Salem',
    role: 'PROFESSOR',
    roleLabel: 'Professeur Agréé',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    avatar: '👨‍🏫',
    details: 'Statut: VÉRIFIÉ · Commission: 10% (1000 bps) · Auteur de 3 manuels',
  },
  {
    id: 'user_admin_1',
    name: 'Mounir Driss',
    role: 'ADMIN',
    roleLabel: 'Admin Plateforme',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    avatar: '🛡️',
    details: 'Modération, Calendrier Tunisie, Payouts & Audit',
  },
];

export function RoleSwitcher() {
  const [currentId, setCurrentId] = useState<string>('user_student_1');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tuniedu_active_user');
    if (saved) setCurrentId(saved);
  }, []);

  const handleSelect = (p: UserPersona) => {
    setCurrentId(p.id);
    localStorage.setItem('tuniedu_active_user', p.id);
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('tuniedu_user_changed', { detail: p }));
  };

  const active = PERSONAS.find((p) => p.id === currentId) || PERSONAS[0];

  return (
    <div className="bg-[#0B1E33] border-b border-[#0F2942] text-xs py-1.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="hidden sm:inline font-medium text-slate-300">Profil d&apos;Évaluation :</span>
          <span className="text-slate-400">Connecté en tant que</span>
          <div className="relative inline-block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border font-semibold transition hover:bg-[#1B3A57] border-blue-900/60 text-white"
            >
              <span>{active.avatar}</span>
              <span>{active.name}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold border ${active.badgeColor}`}>
                {active.role}
              </span>
              <Icons.ChevronRight className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 bg-[#0F2942] border border-blue-900/80 rounded-2xl shadow-2xl z-50 p-2 text-slate-200">
                <div className="px-2 py-1.5 text-[11px] font-semibold text-blue-300 uppercase tracking-wider border-b border-blue-900/50 mb-1">
                  Changer de profil d&apos;évaluation
                </div>
                {PERSONAS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    className={`w-full text-left p-2 rounded-xl flex items-start gap-2.5 transition ${
                      p.id === currentId ? 'bg-blue-900/80 border border-blue-700' : 'hover:bg-blue-900/40'
                    }`}
                  >
                    <span className="text-xl">{p.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-white truncate text-xs">{p.name}</div>
                        <span className={`px-1 rounded text-[9px] uppercase font-bold border ${p.badgeColor}`}>
                          {p.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-blue-200/70 mt-0.5">{p.details}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <span className="hidden md:inline">Fuseau: <strong>Africa/Tunis</strong></span>
          <span className="text-slate-600">·</span>
          <span>Année: <strong>2026–2027</strong></span>
        </div>
      </div>
    </div>
  );
}
