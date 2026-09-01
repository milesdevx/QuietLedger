import { NextRequest, NextResponse } from 'next/server';

interface VerifyPassportRequest {
  commitment: string;
  policyId: string;
}

// Mock store: commitment -> { tier, timestamp }
const passports: Map<string, { tier: string; timestamp: number }> = new Map();

// Mock policies store (shared with register-policy)
const policies: Map<string, { minTier: string; maxAgeRounds: number }> = new Map([
  ['policy-tier-b-90days', { minTier: 'Tier_B', maxAgeRounds: 90 }],
  ['policy-tier-c-180days', { minTier: 'Tier_C', maxAgeRounds: 180 }],
]);

// Helper: Compare tiers
function tierIsGreaterOrEqual(tierA: string, tierB: string): boolean {
  const tierValues: { [key: string]: number } = {
    'Tier_A': 3,
    'Tier_B': 2,
    'Tier_C': 1,
    'Tier_D': 0,
  };
  return tierValues[tierA] >= tierValues[tierB];
}

// Helper: Get current block height (simulated)
function getCurrentBlockHeight(): number {
  // In production, this would query the actual Midnight network block height
  return Math.floor(Date.now() / 1000);
}

// Helper: Extract tier from commitment (mock implementation)
function extractTierFromPassport(commitment: string): string {
  // In a real implementation, this would:
  // 1. Call the verifyPassport circuit with the commitment
  // 2. Get back the tier and timestamp from the circuit
  // 3. Return the verified tier

  // For demo purposes, simulate based on commitment hash
  const hash = parseInt(commitment.substring(0, 8), 16);
  const tier = hash % 4;
  return ['Tier_D', 'Tier_C', 'Tier_B', 'Tier_A'][tier];
}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyPassportRequest = await request.json();

    // Validate input
    if (!body.commitment || typeof body.commitment !== 'string') {
      return NextResponse.json(
        { error: 'Commitment is required and must be a string' },
        { status: 400 }
      );
    }

    if (!body.policyId || typeof body.policyId !== 'string') {
      return NextResponse.json(
        { error: 'Policy ID is required' },
        { status: 400 }
      );
    }

    // Check if policy exists
    const policy = policies.get(body.policyId);
    if (!policy) {
      return NextResponse.json(
        { error: `Policy "${body.policyId}" not found` },
        { status: 404 }
      );
    }

    // Extract tier from passport (in production, verify on-chain)
    const tier = extractTierFromPassport(body.commitment);

    // Get passport timestamp (in production, retrieve from ledger)
    let passportTimestamp = Math.floor(Date.now() / 1000) - 60; // Assume 60 seconds old for demo
    if (passports.has(body.commitment)) {
      passportTimestamp = passports.get(body.commitment)!.timestamp;
    }

    // Check 1: Tier meets minimum
    const tierOk = tierIsGreaterOrEqual(tier, policy.minTier);

    // Check 2: Passport is not too old
    const currentHeight = getCurrentBlockHeight();
    const passportAge = currentHeight - passportTimestamp;
    const ageOk = passportAge <= policy.maxAgeRounds;

    // Result: both checks must pass
    const verified = tierOk && ageOk;

    // In a real implementation, this would:
    // 1. Call the Midnight Network proof server
    // 2. Execute the verifyPassport circuit with the commitment and policy ID
    // 3. Get back the verification result (true/false) from the circuit
    // 4. Return the result along with the tier and age

    return NextResponse.json({
      verified,
      tier,
      policyId: body.policyId,
      passportAge,
      maxAge: policy.maxAgeRounds,
      tierMeets: tierOk,
      ageValid: ageOk,
      message: verified
        ? `Passport verified: Tier ${tier} meets policy minimum (${policy.minTier}) and is ${passportAge} blocks old (max: ${policy.maxAgeRounds})`
        : `Verification failed: Tier ${tier} vs minimum ${policy.minTier}, age ${passportAge} (max: ${policy.maxAgeRounds})`,
    });
  } catch (error) {
    console.error('Error verifying passport:', error);
    return NextResponse.json(
      { error: 'Failed to verify passport' },
      { status: 500 }
    );
  }
}
