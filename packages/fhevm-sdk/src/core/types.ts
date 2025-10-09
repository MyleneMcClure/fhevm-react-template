/**
 * Core Types for FHEVM SDK
 */

import type { Contract, Provider, Signer } from 'ethers';

/**
 * FHEVM Client Configuration
 */
export interface FHEVMConfig {
  provider: Provider;
  signer?: Signer;
  contractAddress: string;
  contractABI: any[];
  gatewayUrl?: string;
  aclAddress?: string;
}

/**
 * FHEVM Client Instance
 */
export interface FHEVMClient {
  contract: Contract;
  provider: Provider;
  signer?: Signer;
  instance: any;
  isInitialized: boolean;
}

/**
 * Encryption Input Parameters
 */
export interface EncryptionInput {
  value: number | bigint | string;
  type: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256';
}

/**
 * Encrypted Value Result
 */
export interface EncryptedValue {
  handles: Uint8Array;
  inputProof: string;
}

/**
 * Decryption Request Parameters
 */
export interface DecryptionRequest {
  contractAddress: string;
  handle: bigint;
  userAddress: string;
}

/**
 * Decryption Result
 */
export interface DecryptionResult {
  value: bigint;
  decrypted: boolean;
}

/**
 * FHEVM Hook State
 */
export interface FHEVMState {
  client: FHEVMClient | null;
  isConnected: boolean;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Transaction Options
 */
export interface TransactionOptions {
  gasLimit?: bigint;
  gasPrice?: bigint;
  value?: bigint;
}

/**
 * Encrypted Transaction Parameters
 */
export interface EncryptedTxParams {
  functionName: string;
  args: any[];
  options?: TransactionOptions;
}
