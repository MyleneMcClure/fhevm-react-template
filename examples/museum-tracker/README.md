# Museum Visit Tracker Example

Privacy-Preserving Museum Visit Tracker using FHEVM SDK

## Overview

This example demonstrates how to build a privacy-preserving museum visit tracking system using Fully Homomorphic Encryption (FHE). It showcases:

- Encrypted visitor data (age, satisfaction ratings, visit duration)
- Private visit records with FHE
- Statistical analysis without revealing individual data
- FHEVM SDK integration for encryption/decryption

## Features

- **Private Visitor Registration**: Register visitors with encrypted age data
- **Confidential Feedback**: Record satisfaction ratings privately
- **Exhibition Management**: Create and manage exhibitions
- **Anonymous Analytics**: Generate statistics without exposing individual data
- **Access Control**: Role-based permissions for museum managers

## Smart Contract

The `PrivateMuseumVisitTracker.sol` contract provides:

### Data Structures

- **Exhibition**: Museum exhibitions with encrypted visitor counts
- **VisitorProfile**: Registered visitors with encrypted age/age group
- **PrivateVisitRecord**: Visit records with encrypted satisfaction, duration, and interest

### Key Functions

- `registerVisitor()`: Register with encrypted age
- `createExhibition()`: Create new exhibition (manager only)
- `recordPrivateVisit()`: Record visit with encrypted feedback
- `getExhibitionInfo()`: Get exhibition details
- `getVisitorProfile()`: Get visitor registration status

## Setup

### Prerequisites

- Node.js 18+
- Hardhat
- Ethereum wallet with Sepolia ETH

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=deployed_contract_address
```

## Usage

### Compile Contract

```bash
npm run compile
```

### Deploy to Sepolia

```bash
npm run deploy
```

### Deploy Locally

```bash
# Terminal 1: Start local node
npm run node

# Terminal 2: Deploy
npm run deploy:local
```

### Interact with Contract

```bash
npm run interact
```

## Using FHEVM SDK

### Installation

```bash
npm install fhevm-sdk ethers
```

### Initialize Client

```javascript
import { createFHEVMClient, encryptValue, decryptValue } from 'fhevm-sdk';
import { ethers } from 'ethers';

// Setup provider and signer
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Create FHEVM client
const client = await createFHEVMClient({
  provider,
  signer,
  contractAddress: process.env.CONTRACT_ADDRESS,
  contractABI: MuseumTrackerABI,
});
```

### Encrypt Visitor Age

```javascript
import { encryptUint8 } from 'fhevm-sdk';

// Encrypt age (25 years old)
const encryptedAge = await encryptUint8(client, 25);

// Register visitor with encrypted age
const tx = await client.contract.registerVisitor(
  encryptedAge.handles,
  encryptedAge.inputProof
);
await tx.wait();

console.log('Visitor registered with encrypted age!');
```

### Record Private Visit with Encrypted Feedback

```javascript
import { encryptBatch } from 'fhevm-sdk';

// Encrypt multiple values: age, satisfaction, duration, interest
const encrypted = await encryptBatch(client, [
  { value: 25, type: 'uint8' },      // age
  { value: 9, type: 'uint8' },       // satisfaction (1-10)
  { value: 3600, type: 'uint32' },   // duration in seconds
  { value: 5, type: 'uint8' }        // interest level (1-5)
]);

// Record private visit
const tx = await client.contract.recordPrivateVisit(
  exhibitionId,
  encrypted.handles,
  encrypted.inputProof
);
await tx.wait();

console.log('Private visit recorded with encrypted feedback!');
```

### Decrypt Statistics

```javascript
import { decryptUint32 } from 'fhevm-sdk';

// Get encrypted visitor count
const exhibition = await client.contract.exhibitions(exhibitionId);
const encryptedCount = exhibition.privateVisitorCount;

// Decrypt the count (requires proper permissions)
const visitorCount = await decryptUint32(
  client,
  process.env.CONTRACT_ADDRESS,
  encryptedCount
);

console.log('Total visitors:', visitorCount);
```

## Example Scenarios

### Scenario 1: Visitor Registration

```javascript
// Visitor registers with private age
const age = 28;
const encrypted = await encryptUint8(client, age);

await client.contract.registerVisitor(
  encrypted.handles,
  encrypted.inputProof
);
```

### Scenario 2: Visit with Feedback

```javascript
// Record visit to Art exhibition with encrypted feedback
const exhibitionId = 1;
const feedback = await encryptBatch(client, [
  { value: 28, type: 'uint8' },      // age
  { value: 9, type: 'uint8' },       // satisfaction (very satisfied)
  { value: 7200, type: 'uint32' },   // 2 hours visit
  { value: 5, type: 'uint8' }        // maximum interest
]);

await client.contract.recordPrivateVisit(
  exhibitionId,
  feedback.handles,
  feedback.inputProof
);
```

### Scenario 3: Museum Manager Analytics

```javascript
// Manager creates new exhibition
await client.contract.createExhibition(
  'Renaissance Masters',
  1, // Art type
  Math.floor(Date.now() / 1000),
  Math.floor(Date.now() / 1000) + 90 * 24 * 3600 // 90 days
);

// Get encrypted statistics
const stats = await client.contract.getExhibitionStatistics(exhibitionId);

// Decrypt for authorized manager
const totalVisitors = await decryptUint32(
  client,
  contractAddress,
  stats.visitorCount
);
const avgSatisfaction = await decryptUint32(
  client,
  contractAddress,
  stats.satisfactionSum
);

console.log(`Exhibition has ${totalVisitors} visitors`);
console.log(`Average satisfaction: ${avgSatisfaction / totalVisitors}`);
```

## Smart Contract Details

### Exhibition Types

```solidity
enum ExhibitionType {
  History,      // 0
  Art,          // 1
  Science,      // 2
  Culture,      // 3
  Technology,   // 4
  Nature        // 5
}
```

### Age Groups (Encrypted)

```solidity
enum AgeGroup {
  Child,   // 0-12
  Teen,    // 13-19
  Adult,   // 20-59
  Senior   // 60+
}
```

### Access Control

- **Owner**: Full contract control, can set museum manager
- **Museum Manager**: Create exhibitions, manage exhibition status
- **Registered Visitors**: Record private visits with encrypted data

## Security Features

- **Access Control**: Role-based permissions (Owner, Manager, Visitor)
- **Input Validation**: Age (1-119), Satisfaction (1-10), Interest (1-5)
- **Duplicate Prevention**: Visitors can't record multiple visits to same exhibition
- **Privacy Protection**: All sensitive data encrypted with FHE
- **Date Validation**: Exhibition end date must be after start date

## Privacy Benefits

1. **Individual Privacy**: Visitor ages and feedback remain encrypted on-chain
2. **Anonymous Analytics**: Statistical analysis without revealing individual data
3. **GDPR Compliance**: Personal data never exposed in plaintext
4. **Confidential Feedback**: Honest ratings without fear of identification
5. **Aggregate Insights**: Museum gets valuable insights while respecting privacy

## Testing

Run the comprehensive test suite from the main project:

```bash
cd ../../..
npm test
```

68 test cases covering:
- Deployment verification
- Visitor registration
- Exhibition creation
- Private visit recording
- Access control
- Edge cases
- Gas optimization

## Gas Optimization

The contract uses:
- Packed struct variables
- Efficient uint32/uint8 types
- Compiler optimization (800 runs)
- Minimal storage operations

## License

MIT

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Zama FHEVM](https://docs.zama.ai/fhevm)
- [Full Project Documentation](../../README.md)
