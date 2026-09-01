import { NextRequest, NextResponse } from 'next/server';

interface RegisterPolicyRequest {
  policyId: string;
  minTier: string;
  maxAgeRounds: number;
}

// In-memory policy store (for demo; use database in production)
const policies: Map<string, RegisterPolicyRequest> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body: RegisterPolicyRequest = await request.json();

    // Validate input
    if (!body.policyId || typeof body.policyId !== 'string') {
      return NextResponse.json(
        { error: 'Policy ID is required and must be a string' },
        { status: 400 }
      );
    }

    if (!['Tier_A', 'Tier_B', 'Tier_C', 'Tier_D'].includes(body.minTier)) {
      return NextResponse.json(
        { error: 'Invalid tier: must be Tier_A, Tier_B, Tier_C, or Tier_D' },
        { status: 400 }
      );
    }

    if (typeof body.maxAgeRounds !== 'number' || body.maxAgeRounds < 1) {
      return NextResponse.json(
        { error: 'Max age rounds must be a positive number' },
        { status: 400 }
      );
    }

    // Check for duplicates
    if (policies.has(body.policyId)) {
      return NextResponse.json(
        { error: `Policy with ID "${body.policyId}" already exists` },
        { status: 409 }
      );
    }

    // Store policy
    policies.set(body.policyId, body);

    // In a real implementation, this would:
    // 1. Call the Midnight Network proof server
    // 2. Execute the registerPolicy circuit with the compiled contract
    // 3. Store the policy on-chain
    // 4. Return the on-chain transaction hash

    return NextResponse.json({
      success: true,
      policyId: body.policyId,
      message: `Policy registered: ${body.policyId}`,
    });
  } catch (error) {
    console.error('Error registering policy:', error);
    return NextResponse.json(
      { error: 'Failed to register policy' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return all registered policies
  const allPolicies = Array.from(policies.values());
  return NextResponse.json({ policies: allPolicies });
}
