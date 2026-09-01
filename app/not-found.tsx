'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="card" style={{ marginTop: '3rem', textAlign: 'center' }}>
      <h2>404 — Page Not Found</h2>
      <p style={{ color: 'var(--text-dim)', marginTop: '1rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <button className="button" style={{ marginTop: '1.5rem' }}>
          Go Home
        </button>
      </Link>
    </div>
  );
}
