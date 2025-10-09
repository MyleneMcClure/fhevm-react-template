/**
 * useFHEVM Hook - React hook for FHEVM interactions
 *
 * Provides a Wagmi-like API for React applications
 */

import { useState, useEffect, useCallback } from 'react';
import type { Provider, Signer } from 'ethers';
import type { FHEVMConfig, FHEVMClient, FHEVMState, EncryptionInput, EncryptedValue } from '../core/types';
import { createFHEVMClient, isClientInitialized } from '../core/client';
import { encryptValue, encryptBatch } from '../core/encryption';
import { decryptValue, decryptUint8, decryptUint32 } from '../core/decryption';

/**
 * Hook for FHEVM client management
 *
 * @param config - FHEVM configuration
 * @returns FHEVM state and methods
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { client, isConnected, connect, encrypt, decrypt } = useFHEVM({
 *     provider: ethersProvider,
 *     signer: ethersSigner,
 *     contractAddress: '0x...',
 *     contractABI: [...],
 *   });
 *
 *   const handleEncrypt = async () => {
 *     const encrypted = await encrypt({ value: 25, type: 'uint8' });
 *     console.log('Encrypted:', encrypted);
 *   };
 *
 *   return <button onClick={handleEncrypt}>Encrypt Value</button>;
 * }
 * ```
 */
export function useFHEVM(config?: Partial<FHEVMConfig>) {
  const [state, setState] = useState<FHEVMState>({
    client: null,
    isConnected: false,
    isLoading: false,
    error: null,
  });

  /**
   * Connect and initialize FHEVM client
   */
  const connect = useCallback(async (connectConfig?: FHEVMConfig) => {
    const finalConfig = connectConfig || config;

    if (!finalConfig?.provider || !finalConfig?.contractAddress || !finalConfig?.contractABI) {
      setState(prev => ({
        ...prev,
        error: new Error('Missing required configuration: provider, contractAddress, or contractABI'),
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const client = await createFHEVMClient(finalConfig as FHEVMConfig);
      setState({
        client,
        isConnected: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        client: null,
        isConnected: false,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Failed to connect'),
      });
    }
  }, [config]);

  /**
   * Disconnect FHEVM client
   */
  const disconnect = useCallback(() => {
    setState({
      client: null,
      isConnected: false,
      isLoading: false,
      error: null,
    });
  }, []);

  /**
   * Encrypt a value
   */
  const encrypt = useCallback(async (input: EncryptionInput): Promise<EncryptedValue | null> => {
    if (!state.client || !isClientInitialized(state.client)) {
      setState(prev => ({ ...prev, error: new Error('Client not initialized') }));
      return null;
    }

    try {
      return await encryptValue(state.client, input);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Encryption failed'),
      }));
      return null;
    }
  }, [state.client]);

  /**
   * Encrypt multiple values in batch
   */
  const encryptMultiple = useCallback(async (inputs: EncryptionInput[]): Promise<EncryptedValue | null> => {
    if (!state.client || !isClientInitialized(state.client)) {
      setState(prev => ({ ...prev, error: new Error('Client not initialized') }));
      return null;
    }

    try {
      return await encryptBatch(state.client, inputs);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Batch encryption failed'),
      }));
      return null;
    }
  }, [state.client]);

  /**
   * Decrypt a value
   */
  const decrypt = useCallback(async (contractAddress: string, handle: bigint): Promise<bigint | null> => {
    if (!state.client || !isClientInitialized(state.client)) {
      setState(prev => ({ ...prev, error: new Error('Client not initialized') }));
      return null;
    }

    try {
      const result = await decryptValue(state.client, {
        contractAddress,
        handle,
        userAddress: state.client.signer?.address || '',
      });
      return result.value;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Decryption failed'),
      }));
      return null;
    }
  }, [state.client]);

  /**
   * Decrypt a uint8 value
   */
  const decryptU8 = useCallback(async (contractAddress: string, handle: bigint): Promise<number | null> => {
    if (!state.client || !isClientInitialized(state.client)) {
      setState(prev => ({ ...prev, error: new Error('Client not initialized') }));
      return null;
    }

    try {
      return await decryptUint8(state.client, contractAddress, handle);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Decryption failed'),
      }));
      return null;
    }
  }, [state.client]);

  /**
   * Decrypt a uint32 value
   */
  const decryptU32 = useCallback(async (contractAddress: string, handle: bigint): Promise<number | null> => {
    if (!state.client || !isClientInitialized(state.client)) {
      setState(prev => ({ ...prev, error: new Error('Client not initialized') }));
      return null;
    }

    try {
      return await decryptUint32(state.client, contractAddress, handle);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Decryption failed'),
      }));
      return null;
    }
  }, [state.client]);

  /**
   * Auto-connect on mount if config is provided
   */
  useEffect(() => {
    if (config?.provider && config?.contractAddress && config?.contractABI && !state.isConnected) {
      connect();
    }
  }, [config, state.isConnected, connect]);

  return {
    // State
    client: state.client,
    isConnected: state.isConnected,
    isLoading: state.isLoading,
    error: state.error,

    // Methods
    connect,
    disconnect,
    encrypt,
    encryptMultiple,
    decrypt,
    decryptU8,
    decryptU32,
  };
}

/**
 * Hook for reading contract data
 *
 * @param client - FHEVM client
 * @param functionName - Contract function to call
 * @param args - Function arguments
 * @returns Contract call result
 */
export function useFHEVMRead(
  client: FHEVMClient | null,
  functionName: string,
  args: any[] = []
) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const read = useCallback(async () => {
    if (!client || !isClientInitialized(client)) {
      setError(new Error('Client not initialized'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await client.contract[functionName](...args);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Read failed'));
    } finally {
      setIsLoading(false);
    }
  }, [client, functionName, args]);

  useEffect(() => {
    read();
  }, [read]);

  return { data, isLoading, error, refetch: read };
}

/**
 * Hook for writing to contract
 *
 * @param client - FHEVM client
 * @param functionName - Contract function to call
 * @returns Write function and state
 */
export function useFHEVMWrite(client: FHEVMClient | null, functionName: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const write = useCallback(async (...args: any[]) => {
    if (!client || !isClientInitialized(client)) {
      setError(new Error('Client not initialized'));
      return null;
    }

    setIsLoading(true);
    setError(null);
    setTxHash(null);

    try {
      const tx = await client.contract[functionName](...args);
      setTxHash(tx.hash);
      await tx.wait();
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Write failed'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [client, functionName]);

  return { write, isLoading, error, txHash };
}
