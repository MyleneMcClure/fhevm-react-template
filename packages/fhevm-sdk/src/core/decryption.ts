/**
 * FHEVM Decryption - Utilities for decrypting FHEVM encrypted data
 *
 * Provides functions to request and retrieve decrypted values from FHEVM contracts
 */

import type { FHEVMClient, DecryptionRequest, DecryptionResult } from './types';
import { getInstance } from './client';

/**
 * Request decryption of an encrypted value
 *
 * @param client - Initialized FHEVM client
 * @param handle - Handle of the encrypted value
 * @returns Decrypted value
 *
 * @example
 * ```typescript
 * const decrypted = await decryptValue(client, {
 *   contractAddress: '0x...',
 *   handle: 12345n,
 *   userAddress: '0x...'
 * });
 * console.log('Decrypted value:', decrypted.value);
 * ```
 */
export async function decryptValue(
  client: FHEVMClient,
  request: DecryptionRequest
): Promise<DecryptionResult> {
  const instance = getInstance(client);

  try {
    // Request decryption from gateway
    const decryptedValue = await instance.decrypt(
      request.contractAddress,
      request.handle
    );

    return {
      value: BigInt(decryptedValue),
      decrypted: true,
    };
  } catch (error) {
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Decrypt a uint8 value
 *
 * @param client - Initialized FHEVM client
 * @param contractAddress - Address of the contract
 * @param handle - Handle of the encrypted value
 * @returns Decrypted uint8 value (0-255)
 */
export async function decryptUint8(
  client: FHEVMClient,
  contractAddress: string,
  handle: bigint
): Promise<number> {
  const result = await decryptValue(client, {
    contractAddress,
    handle,
    userAddress: client.signer?.address || '',
  });

  return Number(result.value);
}

/**
 * Decrypt a uint32 value
 *
 * @param client - Initialized FHEVM client
 * @param contractAddress - Address of the contract
 * @param handle - Handle of the encrypted value
 * @returns Decrypted uint32 value
 */
export async function decryptUint32(
  client: FHEVMClient,
  contractAddress: string,
  handle: bigint
): Promise<number> {
  const result = await decryptValue(client, {
    contractAddress,
    handle,
    userAddress: client.signer?.address || '',
  });

  return Number(result.value);
}

/**
 * Decrypt multiple values in batch
 *
 * @param client - Initialized FHEVM client
 * @param requests - Array of decryption requests
 * @returns Array of decrypted values
 *
 * @example
 * ```typescript
 * const decrypted = await decryptBatch(client, [
 *   { contractAddress: '0x...', handle: 123n, userAddress: '0x...' },
 *   { contractAddress: '0x...', handle: 456n, userAddress: '0x...' }
 * ]);
 * ```
 */
export async function decryptBatch(
  client: FHEVMClient,
  requests: DecryptionRequest[]
): Promise<DecryptionResult[]> {
  const promises = requests.map(request => decryptValue(client, request));
  return Promise.all(promises);
}

/**
 * Check if a value can be decrypted by the current user
 *
 * @param client - Initialized FHEVM client
 * @param contractAddress - Address of the contract
 * @param handle - Handle of the encrypted value
 * @returns True if value can be decrypted
 */
export async function canDecrypt(
  client: FHEVMClient,
  contractAddress: string,
  handle: bigint
): Promise<boolean> {
  try {
    await decryptValue(client, {
      contractAddress,
      handle,
      userAddress: client.signer?.address || '',
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Request re-encryption for sharing encrypted data
 *
 * @param client - Initialized FHEVM client
 * @param handle - Handle of the encrypted value
 * @param publicKey - Public key of the recipient
 * @returns Re-encrypted value
 */
export async function reencrypt(
  client: FHEVMClient,
  handle: bigint,
  publicKey: string
): Promise<Uint8Array> {
  const instance = getInstance(client);

  try {
    const reencrypted = await instance.reencrypt(
      handle,
      publicKey,
      client.signer?.address || ''
    );

    return reencrypted;
  } catch (error) {
    throw new Error(`Re-encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
