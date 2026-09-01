'use client';

import { useState } from 'react';

interface PassportResult {
  commitment: string;
  tier: string;
  timestamp: number;
  success: boolean;
  error?: string;
}

export default function HolderPage() {
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PassportResult | null>(null);

  const getTierBadgeClass = (tier: string) => {
    const tierMap: { [key: string]: string } = {
      'Tier_A': 'tier-a',
      'Tier_B': 'tier-b',
      'Tier_C': 'tier-c',
      'Tier_D': 'tier-d',
    };
    return tierMap[tier] || '';
  };

  const getTierFromBalance = (value: number): string => {
    if (value >= 1000000) return 'Tier_A';
    if (value >= 500000) return 'Tier_B';
    if (value >= 100000) return 'Tier_C';
    return 'Tier_D';
  };

  const handleIssuePassport = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!balance || isNaN(Number(balance))) {
      setResult({
        commitment: '',
        tier: '',
        timestamp: 0,
        success: false,
        error: 'Please enter a valid balance amount',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/holder/issue-passport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ balance: Number(balance) }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          commitment: data.commitment,
          tier: data.tier,
          timestamp: data.timestamp,
          success: true,
        });
        setBalance('');
      } else {
        setResult({
          commitment: '',
          tier: '',
          timestamp: 0,
          success: false,
          error: data.error || 'Failed to issue passport',
        });
      }
    } catch (err) {
      setResult({
        commitment: '',
        tier: '',
        timestamp: 0,
        success: false,
        error: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const exampleBalance = 750000;

  return (
    <div>
      <div className="card">
        <h2>🔐 Issue Financial Passport</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Enter your financial value to issue a reusable passport. Your exact balance will be kept private
          and converted into a tier (A, B, C, or D) that verifiers can check against policies.
        </p>

        <form onSubmit={handleIssuePassport}>
          <div className="form-group">
            <label htmlFor="balance">Financial Balance ($)</label>
            <input
              id="balance"
              type="number"
              placeholder="e.g., 750000"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              disabled={loading}
              min="0"
            />
            <small style={{ color: '#999', display: 'block', marginTop: '0.5rem' }}>
              This value is private and never stored on-chain.
            </small>
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Issuing Passport...' : 'Issue Passport'}
          </button>

          <button
            type="button"
            className="button button-secondary"
            style={{ marginLeft: '1rem', marginTop: '0.5rem' }}
            onClick={() => setBalance(exampleBalance.toString())}
            disabled={loading}
          >
            Use Example ($750,000)
          </button>
        </form>

        {balance && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--panel-2)', borderRadius: '4px', border: '1px solid var(--line)' }}>
            <strong>Your Tier:</strong> <span className={`tier-badge ${getTierBadgeClass(getTierFromBalance(Number(balance)))}`}>
              {getTierFromBalance(Number(balance))}
            </span>
          </div>
        )}
      </div>

      {result && (
        <div className="card">
          {result.success ? (
            <>
              <div className="alert alert-success">
                ✓ Passport issued successfully!
              </div>

              <h3>Passport Details</h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                <div>
                  <strong>Tier:</strong>
                  <div style={{ marginTop: '0.5rem' }}>
                    <span className={`tier-badge ${getTierBadgeClass(result.tier)}`}>
                      {result.tier}
                    </span>
                  </div>
                </div>

                <div>
                  <strong>Issued At:</strong>
                  <p style={{ marginTop: '0.5rem', color: '#666' }}>
                    Block {result.timestamp}
                  </p>
                </div>
              </div>

              <div className="result-box">
                <h3>Commitment Hash</h3>
                <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  Share this with verifiers to prove your tier. Your balance is hidden in this hash.
                </p>
                <code>{result.commitment}</code>
                <button
                  className="button"
                  style={{ marginTop: '1rem' }}
                  onClick={() => {
                    navigator.clipboard.writeText(result.commitment);
                    alert('Commitment copied to clipboard!');
                  }}
                >
                  Copy to Clipboard
                </button>
              </div>

              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(163, 113, 215, 0.1)', borderRadius: '4px', borderLeft: '4px solid var(--witness)' }}>
                <h4 style={{ color: 'var(--witness)', marginBottom: '0.5rem' }}>Next Steps</h4>
                <ol style={{ marginLeft: '1.5rem' }}>
                  <li>Copy your commitment hash above</li>
                  <li>Visit the Verifier page to register policies or verify against existing ones</li>
                  <li>Share your commitment with any verifier that has registered a policy</li>
                  <li>They can verify your tier without knowing your exact balance</li>
                </ol>
              </div>
            </>
          ) : (
            <div className="alert alert-error">
              ✗ Error: {result.error}
            </div>
          )}
        </div>
      )}

      <div className="card">
        <h3>ℹ️ Privacy Guarantee</h3>
        <p style={{ color: '#666' }}>
          Your financial balance (<strong>${balance || 'XXXX'}</strong>) is:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '1rem', color: '#666' }}>
          <li>✓ <strong>Never stored</strong> on the blockchain</li>
          <li>✓ <strong>Never transmitted</strong> to verifiers</li>
          <li>✓ <strong>Only used locally</strong> to compute your tier</li>
          <li>✓ <strong>Hidden</strong> in the commitment hash via cryptographic hashing</li>
        </ul>
      </div>
    </div>
  );
}
