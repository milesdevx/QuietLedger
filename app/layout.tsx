import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuietLedger — Private Financial Passports on Midnight',
  description: 'Prove your financial tier without revealing your exact balance. Built on Midnight Network.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'QuietLedger',
    description: 'Private, reusable financial passport on Midnight Network',
    url: 'https://quietledger-theta.vercel.app',
    siteName: 'QuietLedger',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'QuietLedger - Prove your tier, keep your secrets',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuietLedger',
    description: 'Private financial passports on Midnight Network',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-icon">◆</div>
            <h2>QL</h2>
          </div>
          <nav className="sidebar-nav">
            <a href="/" className="nav-item">
              <span className="nav-icon">◇</span>
              <span>Home</span>
            </a>
            <a href="/holder" className="nav-item">
              <span className="nav-icon">◆</span>
              <span>Issue</span>
            </a>
            <a href="/verifier" className="nav-item">
              <span className="nav-icon">✓</span>
              <span>Verify</span>
            </a>
          </nav>
          <div className="sidebar-footer">
            <p>Midnight Network</p>
          </div>
        </aside>
        <main className="main-layout">
          {children}
        </main>
      </body>
    </html>
  );
}
