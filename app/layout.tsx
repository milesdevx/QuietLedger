import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuietLedger',
  description: 'Private, reusable financial passport on Midnight Network',
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
