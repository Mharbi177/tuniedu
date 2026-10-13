'use client';

import React from 'react';

interface DynamicWatermarkProps {
  userMask: string;
  transactionRef: string;
  timestamp?: string;
}

export function DynamicWatermark({
  userMask,
  transactionRef,
  timestamp = 'Tunis · Session Sécurisée',
}: DynamicWatermarkProps) {
  const line = `${userMask} • ${transactionRef} • ${timestamp}`;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-20 flex flex-col justify-around opacity-25"
      aria-hidden="true"
    >
      <div className="transform -rotate-24 space-y-24 py-12">
        <div className="text-[12px] font-mono tracking-widest text-slate-500 font-bold text-center">
          {line}
        </div>
        <div className="text-[12px] font-mono tracking-widest text-slate-500 font-bold text-center pl-32">
          {line}
        </div>
        <div className="text-[12px] font-mono tracking-widest text-slate-500 font-bold text-center -pl-20">
          {line}
        </div>
        <div className="text-[12px] font-mono tracking-widest text-slate-500 font-bold text-center pl-24">
          {line}
        </div>
      </div>
    </div>
  );
}
