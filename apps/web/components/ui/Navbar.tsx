'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { Icons } from './icons';
import { store, User } from '@/lib/store';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang, t, isRtl } = useLanguage();

  const [currentUser, setCurrentUser] = useState<User>(store.getCurrentUser());
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateActiveUser = () => {
      const active = store.getCurrentUser();
      setCurrentUser(active);
    };
    updateActiveUser();

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitchUser = (userId: string) => {
    store.setCurrentUser(userId);
    const updated = store.getCurrentUser();
    setCurrentUser(updated);
    setUserDropdownOpen(false);

    // Contextual redirection based on selected persona
    if (updated.role === 'STUDENT') router.push('/student/library');
    else if (updated.role === 'PARENT') router.push('/parent');
    else if (updated.role === 'PROFESSOR') router.push('/professor');
    else if (updated.role === 'ADMIN') router.push('/admin');
  };

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/catalogue', label: t.nav.catalogue },
    { href: '/student/library', label: t.nav.library, roleRequired: 'STUDENT' },
    { href: '/parent', label: t.nav.parent, roleRequired: 'PARENT' },
    { href: '/professor', label: t.nav.professor, roleRequired: 'PROFESSOR' },
    { href: '/admin', label: t.nav.admin, roleRequired: 'ADMIN' },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'STUDENT':
        return { label: lang === 'ar' ? 'تلميذ' : 'Élève', style: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'PARENT':
        return { label: lang === 'ar' ? 'ولي' : 'Parent', style: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'PROFESSOR':
        return { label: lang === 'ar' ? 'أستاذ معتمد' : 'Enseignant Agréé', style: 'bg-amber-50 text-amber-900 border-amber-200' };
      case 'ADMIN':
        return { label: lang === 'ar' ? 'إدارة' : 'Administration', style: 'bg-red-50 text-red-900 border-red-200' };
      default:
        return { label: role, style: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Institutional Top Crest Line */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-medium text-slate-200">
              {lang === 'ar' ? 'الجمهورية التونسية · وزارة التربية' : 'République Tunisienne · Ministère de l\'Éducation'}
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">
              {lang === 'ar' ? 'المنصة البيداغوجية الوطنية للكتب المدرسية' : 'Portail National des Manuels Scolaires Numériques'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-[10px]">
              {lang === 'ar' ? 'السنة الدراسية: 2026–2027 (توقيت تونس)' : 'Année Scolaire 2026–2027 · Tunis'}
            </span>

            {/* Language Switcher */}
            <div className="flex items-center rounded border border-slate-700 overflow-hidden text-[10px] font-bold">
              <button
                onClick={() => setLang('fr')}
                className={`px-2 py-0.5 transition ${
                  lang === 'fr' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-2 py-0.5 transition ${
                  lang === 'ar' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                عربي
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Seal */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue-900 border border-blue-800 flex items-center justify-center text-white shadow-xs">
            <Icons.Book className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-lg text-slate-950 tracking-tight">
                Tuni<span className="text-blue-700">Edu</span>
              </span>
              <span className="text-[10px] font-bold px-1 py-0.2 rounded bg-blue-50 text-blue-800 border border-blue-200">
                TN
              </span>
            </div>
            <div className="text-[10px] text-slate-500 tracking-tight mt-0.5">
              {lang === 'ar' ? 'المركز الوطني البيداغوجي الرقمي' : 'Publications Scolaires Officielles'}
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-xs'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action & Account Menu */}
        <div className="flex items-center gap-3">
          <Link
            href="/catalogue"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
          >
            <Icons.Search className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.nav.search}</span>
          </Link>

          {/* User Account / Role Selector Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition text-left"
              aria-label="Menu Utilisateur"
            >
              <div className="w-7 h-7 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500">
                  {getRoleBadge(currentUser.role).label}
                </div>
              </div>
              <Icons.ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-90' : ''}`} />
            </button>

            {userDropdownOpen && (
              <div
                className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-full mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl z-50 p-2 text-slate-800`}
              >
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="font-bold text-xs text-slate-900">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                  <span className={`inline-block mt-1 px-1.5 py-0.2 rounded text-[10px] font-bold border ${getRoleBadge(currentUser.role).style}`}>
                    {getRoleBadge(currentUser.role).label}
                  </span>
                </div>

                <div className="pt-2 pb-1">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {lang === 'ar' ? 'تبديل الحساب (تجريبي)' : 'Changer d\'Utilisateur'}
                  </div>
                  {store.users.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => handleSwitchUser(u.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition ${
                        u.id === currentUser.id ? 'bg-slate-100 font-bold text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="leading-tight">{u.name}</div>
                        <div className="text-[10px] text-slate-400">{u.role}</div>
                      </div>
                      {u.id === currentUser.id && (
                        <Icons.Check className="w-4 h-4 text-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-1 mt-1">
                  <Link
                    href="/connexion"
                    onClick={() => setUserDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-blue-700 hover:bg-blue-50 flex items-center gap-2 font-medium"
                  >
                    <Icons.Lock className="w-3.5 h-3.5" />
                    <span>{t.nav.signOut}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <Icons.X className="w-5 h-5" /> : <Icons.Filter className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              <span>{link.label}</span>
              <Icons.ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
