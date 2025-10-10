/**
 * FHEVM Client - Core client for FHEVM interactions
 *
 * Provides initialization and management of FHEVM instances
 */

import { Contract, Provider, Signer } from 'ethers';
import { createInstance } from '@fhevm/fhevm-js';
import type { FHEVMConfig, FHEVMClient } from './types';

/**
 * Create and initialize an FHEVM client
 *
 * @param config - FHEVM configuration
 * @returns Initialized FHEVM client
 *
 * @example
 * ```typescript
 * const client = await createFHEVMClient({
 *   provider: ethersProvider,
 *   signer: ethersSigner,
 *   contractAddress: '0x...',
 *   contractABI: [...],
 * });
 * ```
 */
export async function createFHEVMClient(config: FHEVMConfig): Promise<FHEVMClient> {
  const { provider, signer, contractAddress, contractABI, gatewayUrl, aclAddress } = config;

  // Create contract instance
  const contract = new Contract(
    contractAddress,
    contractABI,
    signer || provider
  );

  // Get network information
  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);

  // Create FHEVM instance
  const instance = await createInstance({
    chainId,
    networkUrl: gatewayUrl || (await provider._getConnection()).url,
    gatewayUrl: gatewayUrl,
    aclAddress: aclAddress,
  });

  return {
    contract,
    provider,
    signer,
    instance,
    isInitialized: true,
  };
}

/**
 * Check if FHEVM client is properly initialized
 *
 * @param client - FHEVM client to check
 * @returns True if client is initialized
 */
export function isClientInitialized(client: FHEVMClient | null): boolean {
  return client !== null && client.isInitialized && client.instance !== undefined;
}

/**
 * Get contract instance from FHEVM client
 *
 * @param client - FHEVM client
 * @returns Contract instance
 */
export function getContract(client: FHEVMClient): Contract {
  if (!isClientInitialized(client)) {
    throw new Error('FHEVM client is not initialized');
  }
  return client.contract;
}

/**
 * Get FHEVM instance for encryption/decryption operations
 *
 * @param client - FHEVM client
 * @returns FHEVM instance
 */
export function getInstance(client: FHEVMClient): any {
  if (!isClientInitialized(client)) {
    throw new Error('FHEVM client is not initialized');
  }
  return client.instance;
}

/**
 * Disconnect and cleanup FHEVM client
 *
 * @param client - FHEVM client to disconnect
 */
export function disconnectClient(client: FHEVMClient): void {
  // Cleanup resources if needed
  client.isInitialized = false;
}
