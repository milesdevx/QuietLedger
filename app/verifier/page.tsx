'use client';

import { useState } from 'react';

interface Policy {
  id: string;
  minTier: string;
  maxAgeRounds: number;
}

interface VerifyResult {
  verified: boolean;
  tier: string;
  policyId: string;
  message: string;
  error?: string;
}

export default function VerifierPage() {
  const [policies, setPolicies] = useState<Policy[]>([
    { id: 'policy-tier-b-90days', minTier: 'Tier_B', maxAgeRounds: 90 },
    { id: 'policy-tier-c-180days', minTier: 'Tier_C', maxAgeRounds: 180 },
  ]);

  const [newPolicyId, setNewPolicyId] = useState('');
  const [newPolicyTier, setNewPolicyTier] = useState('Tier_B');
  const [newPolicyAge, setNewPolicyAge] = useState('90');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerResult, setRegisterResult] = useState<{ success: boolean; message: string } | null>(null);

  const [verifyCommitment, setVerifyCommitment] = useState('');
  const [verifyPolicyId, setVerifyPolicyId] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);

  const handleRegisterPolicy = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPolicyId.trim()) {
      setRegisterResult({ success: false, message: 'Policy ID is required' });
      return;
    }

    setRegisterLoading(true);
    setRegisterResult(null);

    try {
      const response = await fetch('/api/verifier/register-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          policyId: newPolicyId,
          minTier: newPolicyTier,
          maxAgeRounds: Number(newPolicyAge),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const newPolicy = {
          id: newPolicyId,
          minTier: newPolicyTier,
          maxAgeRounds: Number(newPolicyAge),
        };
        setPolicies([...policies, newPolicy]);
        setRegisterResult({ success: true, message: 'Policy registered successfully!' });
        setNewPolicyId('');
        setNewPolicyTier('Tier_B');
        setNewPolicyAge('90');
      } else {
        setRegisterResult({ success: false, message: data.error || 'Failed to register policy' });
      }
    } catch (err) {
      setRegisterResult({
        success: false,
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleVerifyPassport = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verifyCommitment.trim()) {
      setVerifyResult({
        verified: false,
        tier: '',
        policyId: verifyPolicyId,
        message: 'Commitment hash is required',
        error: 'Missing commitment',
      });
      return;
    }

    if (!verifyPolicyId) {
      setVerifyResult({
        verified: false,
        tier: '',
        policyId: '',
        message: 'Please select a policy',
        error: 'Missing policy',
      });
      return;
    }

    setVerifyLoading(true);
    setVerifyResult(null);

    try {
      const response = await fetch('/api/verifier/verify-passport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commitment: verifyCommitment,
          policyId: verifyPolicyId,
        }),
      });

      const data = await response.json();

      const policy = policies.find(p => p.id === verifyPolicyId);

      setVerifyResult({
        verified: data.verified || false,
        tier: data.tier || 'Unknown',
        policyId: verifyPolicyId,
        message: data.verified
          ? `✓ Passport verified! Tier ${data.tier} meets policy requirement (min: ${policy?.minTier})`
          : `✗ Passport verification failed. Tier ${data.tier} does not meet policy requirement (min: ${policy?.minTier})`,
        error: data.error,
      });
    } catch (err) {
      setVerifyResult({
        verified: false,
        tier: '',
        policyId: verifyPolicyId,
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        error: 'Network error',
      });
    } finally {
      setVerifyLoading(false);
    }
  };

  const getTierBadgeClass = (tier: string) => {
    const tierMap: { [key: string]: string } = {
      'Tier_A': 'tier-a',
      'Tier_B': 'tier-b',
      'Tier_C': 'tier-c',
      'Tier_D': 'tier-d',
    };
    return tierMap[tier] || '';
  };

  return (
    <div>
      {/* Register Policy Section */}
      <div className="card">
        <h2>📋 Register Policy</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Define a policy that specifies the minimum tier and maximum passport age requirements for verification.
        </p>

        <form onSubmit={handleRegisterPolicy}>
          <div className="form-group">
            <label htmlFor="policyId">Policy ID</label>
            <input
              id="policyId"
              type="text"
              placeholder="e.g., premium-loan-threshold"
              value={newPolicyId}
              onChange={(e) => setNewPolicyId(e.target.value)}
              disabled={registerLoading}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="minTier">Minimum Tier Required</label>
              <select
                id="minTier"
                value={newPolicyTier}
                onChange={(e) => setNewPolicyTier(e.target.value)}
                disabled={registerLoading}
              >
                <option value="Tier_A">Tier A (≥ $1,000,000)</option>
                <option value="Tier_B">Tier B (≥ $500,000)</option>
                <option value="Tier_C">Tier C (≥ $100,000)</option>
                <option value="Tier_D">Tier D (≥ $10,000)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="maxAge">Max Passport Age (blocks)</label>
              <input
                id="maxAge"
                type="number"
                placeholder="90"
                value={newPolicyAge}
                onChange={(e) => setNewPolicyAge(e.target.value)}
                disabled={registerLoading}
                min="1"
              />
            </div>
          </div>

          <button type="submit" className="button" disabled={registerLoading}>
            {registerLoading ? 'Registering...' : 'Register Policy'}
          </button>
        </form>

        {registerResult && (
          <div style={{ marginTop: '1rem' }} className={registerResult.success ? 'alert alert-success' : 'alert alert-error'}>
            {registerResult.message}
          </div>
        )}
      </div>

      {/* Policies List */}
      <div className="card">
        <h3>📌 Active Policies</h3>
        {policies.length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            {policies.map((policy) => (
              <div key={policy.id} style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{policy.id}</strong>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                      Min: <span className={`tier-badge ${getTierBadgeClass(policy.minTier)}`}>{policy.minTier}</span>
                      {' '} | Max Age: <code>{policy.maxAgeRounds} blocks</code>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#999' }}>No policies registered yet.</p>
        )}
      </div>

      {/* Verify Passport Section */}
      <div className="card">
        <h2>✓ Verify Passport</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Verify a passport commitment against a registered policy. Only the tier and policy are checked; the holder's balance remains private.
        </p>

        <form onSubmit={handleVerifyPassport}>
          <div className="form-group">
            <label htmlFor="commitment">Passport Commitment Hash</label>
            <input
              id="commitment"
              type="text"
              placeholder="Paste the commitment hash from the holder"
              value={verifyCommitment}
              onChange={(e) => setVerifyCommitment(e.target.value)}
              disabled={verifyLoading}
            />
            <small style={{ color: '#999', display: 'block', marginTop: '0.5rem' }}>
              This is a 64-character hex hash, never the raw balance.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="policySelect">Select Policy to Verify Against</label>
            <select
              id="policySelect"
              value={verifyPolicyId}
              onChange={(e) => setVerifyPolicyId(e.target.value)}
              disabled={verifyLoading}
            >
              <option value="">-- Choose a policy --</option>
              {policies.map((policy) => (
                <option key={policy.id} value={policy.id}>
                  {policy.id} (min: {policy.minTier})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="button" disabled={verifyLoading}>
            {verifyLoading ? 'Verifying...' : 'Verify Passport'}
          </button>

          <button
            type="button"
            className="button button-secondary"
            style={{ marginLeft: '1rem' }}
            onClick={() => setVerifyCommitment('a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0')}
            disabled={verifyLoading}
          >
            Use Example Hash
          </button>
        </form>
      </div>

      {/* Verification Result */}
      {verifyResult && (
        <div className="card">
          <div className={verifyResult.verified ? 'alert alert-success' : 'alert alert-error'}>
            {verifyResult.verified ? '✓' : '✗'} {verifyResult.message}
          </div>

          {verifyResult.verified && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#d4edda', borderRadius: '4px', borderLeft: '4px solid #28a745' }}>
              <h4 style={{ color: '#155724', marginBottom: '0.5rem' }}>Verification Passed</h4>
              <p style={{ color: '#155724' }}>
                The passport holder has demonstrated they meet the policy requirement. You can proceed with confidence.
              </p>
            </div>
          )}

          {!verifyResult.verified && verifyResult.error !== 'Missing commitment' && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px', borderLeft: '4px solid #dc3545' }}>
              <h4 style={{ color: '#721c24', marginBottom: '0.5rem' }}>Verification Failed</h4>
              <p style={{ color: '#721c24' }}>
                The passport holder does not meet the tier requirement for this policy.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Privacy Info */}
      <div className="card">
        <h3>🔒 What Verifiers Can See</h3>
        <ul style={{ marginLeft: '1.5rem', color: '#666' }}>
          <li>✓ Tier level (A, B, C, or D)</li>
          <li>✓ Passport age (blocks since issuance)</li>
          <li>✓ Whether the tier meets the policy minimum</li>
          <li>✓ Whether the passport is fresh enough</li>
          <li>✗ <strong>NOT visible:</strong> Exact balance or income</li>
          <li>✗ <strong>NOT visible:</strong> Personal financial details</li>
        </ul>
      </div>
    </div>
  );
}
