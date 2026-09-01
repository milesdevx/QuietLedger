import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface IssuePassportRequest {
  balance: number;
}

interface IssuePassportResponse {
  commitment: string;
  tier: string;
  timestamp: number;
}

// Helper: Determine tier from balance
function getTierFromBalance(balance: number): string {
  if (balance >= 1000000) return 'Tier_A';
  if (balance >= 500000) return 'Tier_B';
  if (balance >= 100000) return 'Tier_C';
  return 'Tier_D';
}

// Helper: Generate commitment hash
function generateCommitment(balance: number, nonce: string, tier: string, timestamp: number): string {
  const input = `${balance}:${nonce}:${tier}:${timestamp}`;
  return crypto.createHash('sha256').update(input).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body: IssuePassportRequest = await request.json();

    // Validate input
    if (typeof body.balance !== 'number' || body.balance < 0) {
      return NextResponse.json(
        { error: 'Invalid balance: must be a non-negative number' },
        { status: 400 }
      );
    }

    // Determine tier
    const tier = getTierFromBalance(body.balance);

    // Generate timestamp (simulated block height)
    const timestamp = Math.floor(Date.now() / 1000);

    // Generate unique nonce
    const nonce = crypto.randomBytes(16).toString('hex');

    // Generate commitment (balance is included in hash but not disclosed)
    const commitment = generateCommitment(body.balance, nonce, tier, timestamp);

    // In a real implementation, this would:
    // 1. Call the Midnight Network proof server
    // 2. Execute the issuePassport circuit with the real compiled contract
    // 3. Store the commitment on-chain via the smart contract
    // 4. Return the actual on-chain commitment and block height

    const response: IssuePassportResponse = {
      commitment,
      tier,
      timestamp,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error issuing passport:', error);
    return NextResponse.json(
      { error: 'Failed to issue passport' },
      { status: 500 }
    );
  }
}
