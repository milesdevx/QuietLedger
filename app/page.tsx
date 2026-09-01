'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="card">
        <h1 style={{ background: 'linear-gradient(135deg, var(--ledger) 0%, var(--circuit) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem' }}>Welcome to QuietLedger</h1>
        <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
          Prove your financial standing within a tier <strong>without revealing the exact figure</strong>.
        </p>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          QuietLedger leverages Midnight Network's privacy-preserving circuits to issue reusable financial passports
          that can be verified against multiple on-chain policies, without exposing your sensitive financial data.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <Link href="/holder" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer', background: 'rgba(88, 212, 168, 0.08)', border: '2px solid var(--circuit)' }}>
              <h3 style={{ color: 'var(--circuit)', marginBottom: '0.5rem' }}>👤 Holder</h3>
              <p>Issue a financial passport that proves your tier without revealing your balance.</p>
            </div>
          </Link>

          <Link href="/verifier" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer', background: 'rgba(163, 113, 215, 0.08)', border: '2px solid var(--witness)' }}>
              <h3 style={{ color: 'var(--witness)', marginBottom: '0.5rem' }}>✓ Verifier</h3>
              <p>Register policies and verify passports against your tier requirements.</p>
            </div>
          </Link>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(88, 212, 168, 0.1)', borderRadius: '4px', borderLeft: '4px solid var(--circuit)' }}>
          <h3 style={{ color: 'var(--circuit)', marginBottom: '0.5rem' }}>How It Works</h3>
          <ol style={{ marginLeft: '1.5rem', color: '#666' }}>
            <li><strong>Private Balance:</strong> Your financial value stays private in your local witness.</li>
            <li><strong>Tier Bucketing:</strong> Your balance is converted to a tier (A, B, C, or D) using fixed thresholds.</li>
            <li><strong>Commitment Hash:</strong> A passport commitment is generated and stored on-chain (no balance exposed).</li>
            <li><strong>Policy Verification:</strong> Verifiers can check your passport against their policies without seeing your balance.</li>
            <li><strong>Reusable:</strong> The same passport works across multiple policies and verifiers.</li>
          </ol>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--panel-2)', borderRadius: '4px', border: '1px solid var(--line)' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Tier Thresholds</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--panel)', borderRadius: '4px' }}>
              <div className="tier-badge tier-a">Tier A</div>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>≥ $1,000,000</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--panel)', borderRadius: '4px' }}>
              <div className="tier-badge tier-b">Tier B</div>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>≥ $500,000</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--panel)', borderRadius: '4px' }}>
              <div className="tier-badge tier-c">Tier C</div>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>≥ $100,000</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--panel)', borderRadius: '4px' }}>
              <div className="tier-badge tier-d">Tier D</div>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>≥ $10,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
