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
    <html lang="en">
      <body>
        <header className="header">
          <nav className="nav">
            <h1>QuietLedger</h1>
            <div className="nav-links">
              <a href="/holder">Holder</a>
              <a href="/verifier">Verifier</a>
              <a href="/">Home</a>
            </div>
          </nav>
        </header>
        <main className="main">
          {children}
        </main>
        <footer className="footer">
          <p>Midnight Network | Financial Privacy Passport</p>
        </footer>
      </body>
    </html>
  );
}
