# Next.js FHEVM Showcase

Privacy-Preserving Museum Visit Tracker - Built with Next.js and FHEVM SDK

## Overview

This is a complete Next.js application demonstrating the FHEVM SDK for building privacy-preserving decentralized applications. It showcases a museum visit tracking system where all sensitive visitor data is encrypted using Fully Homomorphic Encryption (FHE).

## Features

- **Modern Next.js App Router**: Uses the latest Next.js 14 with App Router
- **FHEVM SDK Integration**: Demonstrates SDK usage with React hooks
- **Wallet Connection**: MetaMask integration for Web3 authentication
- **Encrypted Registration**: Visitor registration with encrypted age data
- **Private Feedback**: Record visit feedback with FHE encryption
- **Exhibition Listing**: Display exhibitions with public statistics
- **Real-time Updates**: Transaction status and success notifications
- **Responsive Design**: Mobile-friendly UI with modern styling

## What This Demo Shows

### 1. SDK Initialization

```typescript
import { useFHEVM } from 'fhevm-sdk';

const { connect, isConnected, encrypt, decrypt } = useFHEVM();

// Connect to FHEVM
await connect({
  provider: ethersProvider,
  signer: ethersSigner,
  contractAddress: CONTRACT_ADDRESS,
  contractABI: CONTRACT_ABI,
});
```

### 2. Encrypting Single Values

```typescript
// Encrypt visitor age
const encrypted = await encrypt({
  value: 25,
  type: 'uint8'
});

// Use in contract call
await contract.registerVisitor(
  encrypted.handles,
  encrypted.inputProof
);
```

### 3. Batch Encryption

```typescript
import { useFHEVM } from 'fhevm-sdk';

// Encrypt multiple values at once
const encrypted = await encryptMultiple([
  { value: 25, type: 'uint8' },      // age
  { value: 9, type: 'uint8' },       // satisfaction
  { value: 120, type: 'uint32' },    // duration
  { value: 5, type: 'uint8' }        // interest
]);

// Use in contract call
await contract.recordPrivateVisit(
  exhibitionId,
  encrypted.handles,
  encrypted.inputProof
);
```

### 4. Reading Contract Data

```typescript
import { useFHEVMRead } from 'fhevm-sdk';

// Read total exhibitions
const { data, isLoading, error } = useFHEVMRead(
  client,
  'totalExhibitions'
);
```

### 5. Writing to Contract

```typescript
import { useFHEVMWrite } from 'fhevm-sdk';

// Get write function
const { write, isLoading, txHash } = useFHEVMWrite(
  client,
  'registerVisitor'
);

// Execute transaction
await write(encryptedData.handles, encryptedData.inputProof);
```

## Prerequisites

- Node.js 18+
- MetaMask browser extension
- Sepolia ETH for transactions

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Configure .env.local with your values
```

## Configuration

Edit `.env.local`:

```env
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
```

## Running the Application

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Application Structure

```
nextjs-showcase/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ConnectWallet.tsx   # Wallet connection
│   │   ├── VisitorRegistration.tsx  # Registration form
│   │   ├── RecordVisit.tsx     # Visit recording form
│   │   └── ExhibitionList.tsx  # Exhibition display
│   └── lib/
│       └── contract.ts         # Contract config & ABI
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Components Explained

### ConnectWallet

Handles MetaMask connection and initializes the FHEVM client.

**Key Features:**
- Detects MetaMask installation
- Requests wallet connection
- Passes provider and signer to parent
- Displays connection status

### VisitorRegistration

Allows visitors to register with encrypted age.

**Key Features:**
- Age input validation (1-119)
- Encrypts age using FHEVM SDK
- Calls `registerVisitor()` contract function
- Shows transaction status

### RecordVisit

Records museum visit with encrypted feedback.

**Key Features:**
- Multiple encrypted inputs (age, satisfaction, duration, interest)
- Batch encryption for efficiency
- Calls `recordPrivateVisit()` contract function
- Form validation

### ExhibitionList

Displays all exhibitions with public statistics.

**Key Features:**
- Reads total exhibitions count
- Fetches exhibition details
- Displays exhibition info and visitor counts
- Shows active/inactive status

## User Flow

1. **Connect Wallet**
   - User clicks "Connect Wallet"
   - MetaMask prompts for connection
   - FHEVM client initializes

2. **Register as Visitor**
   - Enter age (encrypted with FHE)
   - Submit registration
   - Age stored encrypted on-chain

3. **View Exhibitions**
   - Browse available exhibitions
   - See exhibition details
   - View public visitor counts

4. **Record Visit**
   - Select exhibition
   - Enter feedback (age, satisfaction, duration, interest)
   - All values encrypted in batch
   - Submit encrypted feedback

## Privacy Features

### What's Encrypted?
- Visitor age
- Satisfaction ratings (1-10)
- Visit duration
- Interest level (1-5)

### What's Public?
- Exhibition names and details
- Total registered visitor count
- Exhibition start/end dates
- Exhibition active status

### Privacy Benefits
1. **On-Chain Privacy**: Sensitive data never exposed in plaintext
2. **Anonymous Analytics**: Museums can analyze trends without identifying individuals
3. **GDPR Compliance**: No personal data stored unencrypted
4. **Verifiable Privacy**: Encryption happens client-side before blockchain submission

## Technical Highlights

### TypeScript Support
Full TypeScript implementation with type safety throughout.

### React Hooks
Uses FHEVM SDK's React hooks for clean, declarative code:
- `useFHEVM()` - Main client management
- `useFHEVMRead()` - Contract read operations
- `useFHEVMWrite()` - Contract write operations

### Error Handling
Comprehensive error handling at every level:
- Wallet connection errors
- Encryption failures
- Transaction errors
- Network issues

### User Experience
- Loading states during transactions
- Success notifications
- Clear error messages
- Responsive design

## Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables

Set in Vercel dashboard:
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_CHAIN_ID`
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_GATEWAY_URL`

## Testing

### Manual Testing Checklist

- [ ] Connect wallet successfully
- [ ] Register visitor with encrypted age
- [ ] View exhibitions list
- [ ] Record visit with encrypted feedback
- [ ] Verify transactions on Etherscan
- [ ] Check error handling
- [ ] Test on mobile devices

## Troubleshooting

### MetaMask Not Detected

Make sure MetaMask extension is installed and enabled.

### Transaction Fails

- Check you have sufficient Sepolia ETH
- Verify contract address is correct
- Ensure you're on Sepolia network

### Encryption Fails

- Check RPC URL is correct
- Verify gateway URL is accessible
- Ensure contract ABI matches deployed contract

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/fhevm)
- [Contract Example](../museum-tracker/README.md)

## License

MIT

## Support

For issues and questions, please refer to the main project documentation.
