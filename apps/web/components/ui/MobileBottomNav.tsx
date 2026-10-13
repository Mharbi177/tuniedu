'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { Icons } from './icons';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  const tabs = [
    { href: '/', label: lang === 'ar' ? 'الرئيسية' : 'Accueil', icon: Icons.Sparkles },
    { href: '/catalogue', label: lang === 'ar' ? 'الدليل' : 'Catalogue', icon: Icons.Search },
    { href: '/student/library', label: lang === 'ar' ? 'مكتبتي' : 'Bibliothèque', icon: Icons.Book },
    { href: '/student/progress', label: lang === 'ar' ? 'التقدم' : 'Progrès', icon: Icons.BarChart },
    { href: '/parent', label: lang === 'ar' ? 'الولي' : 'Parent', icon: Icons.Users },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-blue-100 py-1.5 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
                isActive ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-blue-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] leading-tight">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
