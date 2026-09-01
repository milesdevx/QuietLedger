/**
 * QuietLedger Contract Utilities
 * Helpers for interacting with the compiled Midnight Compact contract
 */

export enum Tier {
  Tier_A = 'Tier_A', // >= $1,000,000
  Tier_B = 'Tier_B', // >= $500,000
  Tier_C = 'Tier_C', // >= $100,000
  Tier_D = 'Tier_D', // >= $10,000
}

export interface Policy {
  minTier: Tier;
  maxAgeRounds: number;
}

export interface PassportRecord {
  tier: Tier;
  timestamp: number;
}

export interface Passport {
  commitment: string;
  tier: Tier;
  timestamp: number;
}

export interface VerificationResult {
  verified: boolean;
  tier: Tier;
  tierMeets: boolean;
  ageValid: boolean;
  passportAge: number;
  maxAge: number;
}

/**
 * Determine tier from financial balance
 */
export function getTierFromBalance(balance: number): Tier {
  if (balance >= 1000000) return Tier.Tier_A;
  if (balance >= 500000) return Tier.Tier_B;
  if (balance >= 100000) return Tier.Tier_C;
  return Tier.Tier_D;
}

/**
 * Get numeric value for tier comparison
 */
export function tierToUint(tier: Tier): number {
  const tierValues = {
    [Tier.Tier_A]: 3,
    [Tier.Tier_B]: 2,
    [Tier.Tier_C]: 1,
    [Tier.Tier_D]: 0,
  };
  return tierValues[tier];
}

/**
 * Check if tierA >= tierB
 */
export function tierIsGreaterOrEqual(tierA: Tier, tierB: Tier): boolean {
  return tierToUint(tierA) >= tierToUint(tierB);
}

/**
 * Get tier display name
 */
export function getTierName(tier: Tier): string {
  const names = {
    [Tier.Tier_A]: 'Tier A',
    [Tier.Tier_B]: 'Tier B',
    [Tier.Tier_C]: 'Tier C',
    [Tier.Tier_D]: 'Tier D',
  };
  return names[tier];
}

/**
 * Get tier minimum balance threshold
 */
export function getTierThreshold(tier: Tier): number {
  const thresholds = {
    [Tier.Tier_A]: 1000000,
    [Tier.Tier_B]: 500000,
    [Tier.Tier_C]: 100000,
    [Tier.Tier_D]: 10000,
  };
  return thresholds[tier];
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Validate commitment hash format
 */
export function isValidCommitment(commitment: string): boolean {
  // Should be 64 hex characters (SHA-256)
  return /^[a-f0-9]{64}$/i.test(commitment);
}

/**
 * Validate policy ID format
 */
export function isValidPolicyId(policyId: string): boolean {
  return policyId.length > 0 && policyId.length <= 256;
}

/**
 * Format block height as human-readable
 */
export function formatBlockHeight(blocks: number): string {
  return `Block ${blocks}`;
}

/**
 * Calculate passport age in blocks
 */
export function calculatePassportAge(issuedAt: number, currentBlock: number): number {
  return Math.max(0, currentBlock - issuedAt);
}

/**
 * Check if passport is fresh (within maxAge)
 */
export function isPassportFresh(issuedAt: number, currentBlock: number, maxAge: number): boolean {
  const age = calculatePassportAge(issuedAt, currentBlock);
  return age <= maxAge;
}
