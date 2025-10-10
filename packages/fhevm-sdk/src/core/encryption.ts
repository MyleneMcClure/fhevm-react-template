/**
 * FHEVM Encryption - Utilities for encrypting data for FHEVM contracts
 *
 * Provides functions to encrypt various data types for use in FHEVM transactions
 */

import type { FHEVMClient, EncryptionInput, EncryptedValue } from './types';
import { getInstance } from './client';

/**
 * Encrypt a value for FHEVM contract input
 *
 * @param client - Initialized FHEVM client
 * @param input - Value and type to encrypt
 * @returns Encrypted value with handles and proof
 *
 * @example
 * ```typescript
 * const encrypted = await encryptValue(client, {
 *   value: 25,
 *   type: 'uint8'
 * });
 * ```
 */
export async function encryptValue(
  client: FHEVMClient,
  input: EncryptionInput
): Promise<EncryptedValue> {
  const instance = getInstance(client);
  const contractAddress = await client.contract.getAddress();

  // Create encrypted input
  const encryptedInput = instance.createEncryptedInput(contractAddress, client.signer?.address);

  // Add value based on type
  switch (input.type) {
    case 'uint8':
      encryptedInput.add8(BigInt(input.value));
      break;
    case 'uint16':
      encryptedInput.add16(BigInt(input.value));
      break;
    case 'uint32':
      encryptedInput.add32(BigInt(input.value));
      break;
    case 'uint64':
      encryptedInput.add64(BigInt(input.value));
      break;
    case 'uint128':
      encryptedInput.add128(BigInt(input.value));
      break;
    case 'uint256':
      encryptedInput.add256(BigInt(input.value));
      break;
    default:
      throw new Error(`Unsupported encryption type: ${input.type}`);
  }

  // Get encrypted handles and proof
  const encrypted = encryptedInput.encrypt();

  return {
    handles: encrypted.handles,
    inputProof: encrypted.inputProof,
  };
}

/**
 * Encrypt multiple values in a single batch
 *
 * @param client - Initialized FHEVM client
 * @param inputs - Array of values to encrypt
 * @returns Encrypted batch with handles and proof
 *
 * @example
 * ```typescript
 * const encrypted = await encryptBatch(client, [
 *   { value: 25, type: 'uint8' },
 *   { value: 8, type: 'uint8' },
 *   { value: 3600, type: 'uint32' }
 * ]);
 * ```
 */
export async function encryptBatch(
  client: FHEVMClient,
  inputs: EncryptionInput[]
): Promise<EncryptedValue> {
  const instance = getInstance(client);
  const contractAddress = await client.contract.getAddress();

  // Create encrypted input
  const encryptedInput = instance.createEncryptedInput(contractAddress, client.signer?.address);

  // Add all values
  for (const input of inputs) {
    switch (input.type) {
      case 'uint8':
        encryptedInput.add8(BigInt(input.value));
        break;
      case 'uint16':
        encryptedInput.add16(BigInt(input.value));
        break;
      case 'uint32':
        encryptedInput.add32(BigInt(input.value));
        break;
      case 'uint64':
        encryptedInput.add64(BigInt(input.value));
        break;
      case 'uint128':
        encryptedInput.add128(BigInt(input.value));
        break;
      case 'uint256':
        encryptedInput.add256(BigInt(input.value));
        break;
      default:
        throw new Error(`Unsupported encryption type: ${input.type}`);
    }
  }

  // Get encrypted handles and proof
  const encrypted = encryptedInput.encrypt();

  return {
    handles: encrypted.handles,
    inputProof: encrypted.inputProof,
  };
}

/**
 * Helper function to encrypt a uint8 value
 *
 * @param client - Initialized FHEVM client
 * @param value - Value to encrypt (0-255)
 * @returns Encrypted value
 */
export async function encryptUint8(client: FHEVMClient, value: number): Promise<EncryptedValue> {
  return encryptValue(client, { value, type: 'uint8' });
}

/**
 * Helper function to encrypt a uint32 value
 *
 * @param client - Initialized FHEVM client
 * @param value - Value to encrypt
 * @returns Encrypted value
 */
export async function encryptUint32(client: FHEVMClient, value: number): Promise<EncryptedValue> {
  return encryptValue(client, { value, type: 'uint32' });
}

/**
 * Create encrypted input for contract function call
 *
 * @param client - Initialized FHEVM client
 * @param inputs - Values to encrypt
 * @returns Formatted parameters for contract call [handles, proof]
 */
export async function createEncryptedInput(
  client: FHEVMClient,
  inputs: EncryptionInput[]
): Promise<[Uint8Array, string]> {
  const encrypted = await encryptBatch(client, inputs);
  return [encrypted.handles, encrypted.inputProof];
}
