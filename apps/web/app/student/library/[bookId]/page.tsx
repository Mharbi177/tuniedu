'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { store } from '@/lib/store';
import { SecureBookReader } from '@/components/reader/SecureBookReader';
import { AccessExpiredState } from '@/components/reader/AccessExpiredState';

export default function BookReaderPage() {
  const params = useParams();
  const bookId = params?.bookId as string;

  const book = store.books.find((b) => b.id === bookId) || store.books[0];
  const user = store.getCurrentUser();
  const entitlement = store.getEntitlement(store.currentUserId, book.id);

  if (!book) {
    return (
      <AccessExpiredState
        bookTitle="Manuel Introuvable"
        reason="UNAUTHORIZED"
      />
    );
  }

  return (
    <SecureBookReader
      book={book}
      entitlement={entitlement}
      userEmail={user.email}
    />
  );
}
