'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(88, 212, 168, 0.1) 0%, rgba(163, 113, 215, 0.1) 100%)',
        border: '1px solid rgba(88, 212, 168, 0.2)',
        borderRadius: '16px',
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(88, 212, 168, 0.05) 0%, transparent 70%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, var(--ledger) 0%, var(--witness) 50%, var(--circuit) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            ◆ QUIETLEDGER
          </div>

          <h1 style={{
            fontSize: '2.4rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: 'var(--text)',
            lineHeight: 1.2,
          }}>
            Prove Your Tier,<br />Keep Your Secrets
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-dim)',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: 1.7,
          }}>
            Privacy-preserving financial passports. Prove you're Tier A without showing your balance.
            Reusable across verifiers. Powered by Midnight Network.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/holder">
              <button className="button" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
                Issue Passport →
              </button>
            </Link>
            <Link href="/verifier">
              <button className="button-secondary" style={{ fontSize: '1rem', padding: '1rem 2rem', background: 'rgba(88, 212, 168, 0.15)', border: '1px solid var(--circuit)', color: 'var(--circuit)' }}>
                Verify Passport
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
          <h3>Private Balance</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
            Your exact balance never leaves your device. Only the tier is disclosed.
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>♻️</div>
          <h3>Reusable</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
            One passport, many verifiers. No need to re-prove for each policy.
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
          <h3>Tier-Based</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
            Prove you're in the right band (A/B/C/D). More privacy than exact values.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="card">
        <h2>How It Works</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginTop: '2rem',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'rgba(88, 212, 168, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.8rem',
              color: 'var(--circuit)',
            }}>1</div>
            <h4>Balance</h4>
            <p style={{ color: 'var(--text-faint)', fontSize: '0.9rem' }}>Enter your balance (stays private)</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'rgba(163, 113, 215, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.8rem',
              color: 'var(--witness)',
            }}>2</div>
            <h4>Tier</h4>
            <p style={{ color: 'var(--text-faint)', fontSize: '0.9rem' }}>Bucketed into A/B/C/D</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'rgba(212, 165, 116, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.8rem',
              color: 'var(--ledger)',
            }}>3</div>
            <h4>Passport</h4>
            <p style={{ color: 'var(--text-faint)', fontSize: '0.9rem' }}>Share with any verifier</p>
          </div>
        </div>
      </div>

      {/* Tiers */}
      <div className="card">
        <h2>Tier Thresholds</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--panel-2)', borderRadius: '8px', border: '1px solid var(--line)' }}>
            <div className="tier-badge tier-a">Tier A</div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-faint)' }}>≥ $1,000,000</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--panel-2)', borderRadius: '8px', border: '1px solid var(--line)' }}>
            <div className="tier-badge tier-b">Tier B</div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-faint)' }}>≥ $500,000</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--panel-2)', borderRadius: '8px', border: '1px solid var(--line)' }}>
            <div className="tier-badge tier-c">Tier C</div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-faint)' }}>≥ $100,000</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--panel-2)', borderRadius: '8px', border: '1px solid var(--line)' }}>
            <div className="tier-badge tier-d">Tier D</div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-faint)' }}>≥ $10,000</p>
          </div>
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(163, 113, 215, 0.08) 0%, rgba(88, 212, 168, 0.08) 100%)', border: '1px solid rgba(163, 113, 215, 0.2)' }}>
        <h2 style={{ color: 'var(--witness)' }}>🔐 Your Privacy is Protected</h2>
        <ul style={{ marginLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-dim)' }}>
          <li>✓ Balance never stored on blockchain</li>
          <li>✓ Balance never sent to verifiers</li>
          <li>✓ Only tier is disclosed</li>
          <li>✓ Passports work across multiple verifiers</li>
          <li>✓ Powered by Midnight's privacy circuits</li>
        </ul>
      </div>
    </div>
  );
}
