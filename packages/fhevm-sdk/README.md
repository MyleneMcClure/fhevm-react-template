# FHEVM SDK

Universal SDK for Fully Homomorphic Encryption Virtual Machine (FHEVM) - Framework Agnostic

## Overview

FHEVM SDK provides a Wagmi-like API for interacting with FHEVM smart contracts across any JavaScript framework including React, Vue, Next.js, Node.js, and more. It simplifies encryption, decryption, and contract interactions while maintaining privacy through Fully Homomorphic Encryption.

## Features

- **Framework Agnostic**: Works with React, Vue, Next.js, Node.js, and any JavaScript environment
- **Wagmi-like API**: Familiar and intuitive API structure for Web3 developers
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Easy Encryption**: Simple APIs for encrypting data before sending to contracts
- **Seamless Decryption**: Straightforward decryption of encrypted contract data
- **React Hooks**: Ready-to-use hooks for React applications
- **Batch Operations**: Support for encrypting multiple values efficiently

## Installation

```bash
npm install fhevm-sdk ethers@^6.0.0
```

## Quick Start

### Basic Usage (Node.js / Vanilla JS)

```typescript
import { ethers } from 'ethers';
import { createFHEVMClient, encryptValue, decryptValue } from 'fhevm-sdk';

// Initialize provider and signer
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_KEY');
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

// Create FHEVM client
const client = await createFHEVMClient({
  provider,
  signer,
  contractAddress: '0x...',
  contractABI: [...],
});

// Encrypt a value
const encrypted = await encryptValue(client, {
  value: 25,
  type: 'uint8'
});

// Use encrypted value in contract call
const tx = await client.contract.registerVisitor(
  encrypted.handles,
  encrypted.inputProof
);
await tx.wait();

// Decrypt a value
const decrypted = await decryptValue(client, {
  contractAddress: '0x...',
  handle: 12345n,
  userAddress: signer.address
});
console.log('Decrypted value:', decrypted.value);
```

### React Usage

```tsx
import { useFHEVM, useFHEVMWrite } from 'fhevm-sdk';
import { useEffect } from 'react';

function MyComponent() {
  const {
    client,
    isConnected,
    connect,
    encrypt,
    decrypt,
    error
  } = useFHEVM();

  const { write: registerVisitor, isLoading, txHash } = useFHEVMWrite(
    client,
    'registerVisitor'
  );

  useEffect(() => {
    // Connect to FHEVM
    connect({
      provider: ethersProvider,
      signer: ethersSigner,
      contractAddress: '0x...',
      contractABI: [...],
    });
  }, []);

  const handleRegister = async () => {
    // Encrypt age
    const encryptedAge = await encrypt({
      value: 25,
      type: 'uint8'
    });

    if (encryptedAge) {
      // Call contract with encrypted data
      await registerVisitor(
        encryptedAge.handles,
        encryptedAge.inputProof
      );
    }
  };

  return (
    <div>
      <button onClick={handleRegister} disabled={!isConnected || isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {txHash && <p>Transaction: {txHash}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

## API Reference

### Core Functions

#### `createFHEVMClient(config: FHEVMConfig): Promise<FHEVMClient>`

Creates and initializes an FHEVM client.

**Parameters:**
- `config.provider`: Ethers provider
- `config.signer`: Ethers signer (optional)
- `config.contractAddress`: Contract address
- `config.contractABI`: Contract ABI
- `config.gatewayUrl`: Gateway URL (optional)
- `config.aclAddress`: ACL contract address (optional)

**Returns:** Initialized FHEVM client

#### `encryptValue(client: FHEVMClient, input: EncryptionInput): Promise<EncryptedValue>`

Encrypts a value for FHEVM contract input.

**Parameters:**
- `client`: Initialized FHEVM client
- `input.value`: Value to encrypt (number, bigint, or string)
- `input.type`: Encryption type ('uint8', 'uint16', 'uint32', 'uint64', 'uint128', 'uint256')

**Returns:** Object with `handles` and `inputProof`

#### `encryptBatch(client: FHEVMClient, inputs: EncryptionInput[]): Promise<EncryptedValue>`

Encrypts multiple values in a single batch.

**Parameters:**
- `client`: Initialized FHEVM client
- `inputs`: Array of values to encrypt

**Returns:** Object with combined `handles` and `inputProof`

#### `decryptValue(client: FHEVMClient, request: DecryptionRequest): Promise<DecryptionResult>`

Decrypts an encrypted value from the contract.

**Parameters:**
- `client`: Initialized FHEVM client
- `request.contractAddress`: Contract address
- `request.handle`: Handle of encrypted value
- `request.userAddress`: User address requesting decryption

**Returns:** Decrypted value as bigint

### React Hooks

#### `useFHEVM(config?: Partial<FHEVMConfig>)`

Main hook for FHEVM client management.

**Returns:**
- `client`: FHEVM client instance
- `isConnected`: Connection status
- `isLoading`: Loading state
- `error`: Error object if any
- `connect(config)`: Function to connect
- `disconnect()`: Function to disconnect
- `encrypt(input)`: Function to encrypt values
- `encryptMultiple(inputs)`: Function to encrypt batch
- `decrypt(contractAddress, handle)`: Function to decrypt values
- `decryptU8(contractAddress, handle)`: Decrypt uint8
- `decryptU32(contractAddress, handle)`: Decrypt uint32

#### `useFHEVMRead(client, functionName, args)`

Hook for reading contract data.

**Returns:**
- `data`: Contract call result
- `isLoading`: Loading state
- `error`: Error object if any
- `refetch()`: Function to refetch data

#### `useFHEVMWrite(client, functionName)`

Hook for writing to contract.

**Returns:**
- `write(...args)`: Function to call contract
- `isLoading`: Loading state
- `error`: Error object if any
- `txHash`: Transaction hash

## Examples

### Encrypting Multiple Values

```typescript
import { encryptBatch } from 'fhevm-sdk';

const encrypted = await encryptBatch(client, [
  { value: 25, type: 'uint8' },     // age
  { value: 8, type: 'uint8' },      // satisfaction
  { value: 3600, type: 'uint32' }   // duration
]);

await client.contract.recordVisit(
  exhibitionId,
  encrypted.handles,
  encrypted.inputProof
);
```

### Helper Functions

```typescript
import { encryptUint8, encryptUint32 } from 'fhevm-sdk';

// Encrypt uint8 (0-255)
const encryptedAge = await encryptUint8(client, 25);

// Encrypt uint32
const encryptedDuration = await encryptUint32(client, 3600);
```

### Decryption Helpers

```typescript
import { decryptUint8, decryptUint32 } from 'fhevm-sdk';

// Decrypt uint8
const age = await decryptUint8(client, contractAddress, handle);
console.log('Age:', age); // 25

// Decrypt uint32
const duration = await decryptUint32(client, contractAddress, handle);
console.log('Duration:', duration); // 3600
```

### Error Handling

```typescript
import { parseContractError } from 'fhevm-sdk';

try {
  await client.contract.someFunction();
} catch (error) {
  const message = parseContractError(error);
  console.error('Contract error:', message);
}
```

## Advanced Usage

### Re-encryption for Data Sharing

```typescript
import { reencrypt } from 'fhevm-sdk';

// Re-encrypt data for another user
const reencrypted = await reencrypt(
  client,
  handle,
  recipientPublicKey
);
```

### Retry with Exponential Backoff

```typescript
import { retry } from 'fhevm-sdk';

const result = await retry(
  async () => await decryptValue(client, request),
  3,  // max retries
  1000  // base delay in ms
);
```

### Network Validation

```typescript
import { isSupportedNetwork, getNetworkName } from 'fhevm-sdk';

const network = await provider.getNetwork();
const chainId = Number(network.chainId);

if (!isSupportedNetwork(chainId)) {
  console.error(`Unsupported network: ${getNetworkName(chainId)}`);
}
```

## Type Definitions

The SDK exports comprehensive TypeScript types:

```typescript
import type {
  FHEVMConfig,
  FHEVMClient,
  EncryptionInput,
  EncryptedValue,
  DecryptionRequest,
  DecryptionResult,
  FHEVMState,
  TransactionOptions,
  EncryptedTxParams,
} from 'fhevm-sdk';
```

## Browser Support

The SDK works in all modern browsers that support:
- ES2020+
- BigInt
- Async/Await
- WebAssembly (for FHEVM cryptography)

## Node.js Support

Requires Node.js 18+ for optimal compatibility.

## Contributing

Contributions are welcome! Please ensure all code follows the existing style and includes appropriate tests.

## License

MIT License - see LICENSE file for details

## Resources

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Zama Encryption](https://www.zama.ai/)
- [Ethers.js Documentation](https://docs.ethers.org/)

## Support

For issues and questions:
- GitHub Issues: [Create an issue](#)
- Documentation: [Read the docs](#)
- Examples: See the `examples/` directory
