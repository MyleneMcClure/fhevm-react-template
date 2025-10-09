/**
 * Helper Utilities for FHEVM SDK
 *
 * Provides common utility functions for FHEVM operations
 */

/**
 * Convert a number to the appropriate BigInt for encryption
 *
 * @param value - Value to convert
 * @param type - Target encryption type
 * @returns Validated BigInt value
 */
export function toBigInt(value: number | bigint | string, type: string): bigint {
  const bigValue = BigInt(value);

  // Validate ranges
  switch (type) {
    case 'uint8':
      if (bigValue < 0n || bigValue > 255n) {
        throw new Error(`Value ${bigValue} out of range for uint8 (0-255)`);
      }
      break;
    case 'uint16':
      if (bigValue < 0n || bigValue > 65535n) {
        throw new Error(`Value ${bigValue} out of range for uint16 (0-65535)`);
      }
      break;
    case 'uint32':
      if (bigValue < 0n || bigValue > 4294967295n) {
        throw new Error(`Value ${bigValue} out of range for uint32 (0-4294967295)`);
      }
      break;
    case 'uint64':
      if (bigValue < 0n || bigValue > 18446744073709551615n) {
        throw new Error(`Value ${bigValue} out of range for uint64`);
      }
      break;
  }

  return bigValue;
}

/**
 * Format an encrypted handle for display
 *
 * @param handle - Handle to format
 * @returns Formatted string
 */
export function formatHandle(handle: bigint): string {
  return `0x${handle.toString(16).padStart(64, '0')}`;
}

/**
 * Parse a handle from hex string
 *
 * @param handleHex - Hex string of handle
 * @returns Parsed BigInt handle
 */
export function parseHandle(handleHex: string): bigint {
  return BigInt(handleHex);
}

/**
 * Check if a value is within valid range for encryption type
 *
 * @param value - Value to check
 * @param type - Encryption type
 * @returns True if value is valid
 */
export function isValidValue(value: number | bigint, type: string): boolean {
  try {
    toBigInt(value, type);
    return true;
  } catch {
    return false;
  }
}

/**
 * Format transaction hash for display
 *
 * @param hash - Transaction hash
 * @returns Shortened hash
 */
export function formatTxHash(hash: string): string {
  if (hash.length < 10) return hash;
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

/**
 * Format address for display
 *
 * @param address - Ethereum address
 * @returns Shortened address
 */
export function formatAddress(address: string): string {
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Wait for transaction confirmation
 *
 * @param tx - Transaction object
 * @param confirmations - Number of confirmations to wait for
 * @returns Transaction receipt
 */
export async function waitForConfirmation(tx: any, confirmations: number = 1): Promise<any> {
  return tx.wait(confirmations);
}

/**
 * Retry a function with exponential backoff
 *
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries
 * @param baseDelay - Base delay in milliseconds
 * @returns Result of the function
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Retry failed');
}

/**
 * Parse error message from contract revert
 *
 * @param error - Error object
 * @returns Parsed error message
 */
export function parseContractError(error: any): string {
  if (error?.reason) return error.reason;
  if (error?.message) return error.message;
  if (typeof error === 'string') return error;
  return 'Unknown contract error';
}

/**
 * Check if network is supported for FHEVM
 *
 * @param chainId - Chain ID to check
 * @returns True if network is supported
 */
export function isSupportedNetwork(chainId: number): boolean {
  // Add supported networks
  const supportedNetworks = [
    11155111, // Sepolia
    1, // Mainnet (if supported)
    // Add other supported networks
  ];

  return supportedNetworks.includes(chainId);
}

/**
 * Get network name from chain ID
 *
 * @param chainId - Chain ID
 * @returns Network name
 */
export function getNetworkName(chainId: number): string {
  const networks: Record<number, string> = {
    1: 'Ethereum Mainnet',
    11155111: 'Sepolia Testnet',
    31337: 'Hardhat Local',
  };

  return networks[chainId] || `Unknown Network (${chainId})`;
}

/**
 * Format gas price in Gwei
 *
 * @param gasPrice - Gas price in wei
 * @returns Formatted gas price in Gwei
 */
export function formatGasPrice(gasPrice: bigint): string {
  const gwei = Number(gasPrice) / 1e9;
  return `${gwei.toFixed(2)} Gwei`;
}

/**
 * Estimate gas cost in USD (requires gas price and ETH price)
 *
 * @param gasUsed - Gas used
 * @param gasPrice - Gas price in wei
 * @param ethPrice - ETH price in USD
 * @returns Estimated cost in USD
 */
export function estimateGasCost(gasUsed: bigint, gasPrice: bigint, ethPrice: number): string {
  const ethCost = Number(gasUsed * gasPrice) / 1e18;
  const usdCost = ethCost * ethPrice;
  return `$${usdCost.toFixed(2)}`;
}
