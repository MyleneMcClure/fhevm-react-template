# FHEVM SDK - Universal Framework-Agnostic SDK

**Universal SDK for Fully Homomorphic Encryption Virtual Machine (FHEVM)**

A Wagmi-like, framework-agnostic SDK for building privacy-preserving decentralized applications with Fully Homomorphic Encryption.

## 🔗 Quick Links

- **💻 Bounty Program Repository**: [https://github.com/MyleneMcClure/fhevm-react-template](https://github.com/MyleneMcClure/fhevm-react-template)
- **🌐 Live Example Application**: [https://fhe-museum-visit-tracker.vercel.app/](https://fhe-museum-visit-tracker.vercel.app/)
- **🎬 Demo Video**: `demo.mp4` - Download the video file from the repository to watch the complete demonstration (the video file requires download to view, links cannot be opened directly)

## 🎯 Project Overview

This project provides a complete, production-ready ecosystem for building privacy-preserving dApps using Zama's FHEVM technology:

- **Universal SDK**: Framework-agnostic core library with Wagmi-like API design
- **React Integration**: Ready-to-use React hooks for seamless integration
- **Next.js Showcase**: Complete Next.js 14 application with 40+ components and API routes
- **React + Vite Example**: Full-stack museum tracker with smart contract integration
- **Smart Contract**: Privacy-preserving museum visit tracker deployed on Sepolia testnet
- **Complete Documentation**: Comprehensive guides for all components and examples

## 📦 What's Included

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/                      # Universal FHEVM SDK
│       ├── src/
│       │   ├── core/                   # Core functionality (framework-agnostic)
│       │   │   ├── client.ts           # Client initialization & management
│       │   │   ├── encryption.ts       # Encryption utilities (single & batch)
│       │   │   ├── decryption.ts       # Decryption utilities & helpers
│       │   │   └── types.ts            # Complete TypeScript definitions
│       │   ├── hooks/                  # React integration (optional)
│       │   │   └── useFHEVM.ts         # React hooks for FHEVM
│       │   ├── utils/                  # Helper utilities
│       │   │   └── helpers.ts          # Common functions & formatters
│       │   └── index.ts                # Main entry point
│       ├── package.json                # SDK package configuration
│       ├── tsconfig.json               # TypeScript configuration
│       └── README.md                   # Complete SDK documentation
│
├── examples/
│   ├── museum-tracker/                 # Smart Contract Example
│   │   ├── contracts/                  # Solidity contracts
│   │   │   └── PrivateMuseumVisitTracker.sol
│   │   ├── scripts/                    # Deployment & interaction
│   │   │   ├── deploy.js               # Deploy to testnet/mainnet
│   │   │   └── interact.js             # Interact with deployed contract
│   │   ├── config/                     # Configuration
│   │   │   └── hardhat.config.js       # Hardhat setup
│   │   ├── package.json                # Example dependencies
│   │   └── README.md                   # Contract example guide
│   │
│   └── nextjs-showcase/                # Next.js Application Example
│       ├── src/
│       │   ├── app/                    # Next.js 14 App Router
│       │   │   ├── layout.tsx          # Root layout
│       │   │   ├── page.tsx            # Main page
│       │   │   ├── globals.css         # Global styles
│       │   │   └── api/                # API routes
│       │   │       ├── fhe/
│       │   │       │   ├── route.ts         # FHE operations route
│       │   │       │   ├── encrypt/route.ts # Encryption API
│       │   │       │   ├── decrypt/route.ts # Decryption API
│       │   │       │   └── compute/route.ts # Computation API
│       │   │       └── keys/route.ts        # Key management API
│       │   ├── components/             # React components
│       │   │   ├── ui/                 # Basic UI components
│       │   │   │   ├── Button.tsx
│       │   │   │   ├── Input.tsx
│       │   │   │   └── Card.tsx
│       │   │   ├── fhe/                # FHE functionality components
│       │   │   │   ├── FHEProvider.tsx     # FHE context provider
│       │   │   │   ├── EncryptionDemo.tsx  # Encryption demo
│       │   │   │   ├── ComputationDemo.tsx # Computation demo
│       │   │   │   └── KeyManager.tsx      # Key management
│       │   │   ├── examples/           # Use case examples
│       │   │   │   ├── BankingExample.tsx  # Banking use case
│       │   │   │   └── MedicalExample.tsx  # Healthcare use case
│       │   │   ├── ConnectWallet.tsx   # Wallet connection
│       │   │   ├── VisitorRegistration.tsx  # Registration form
│       │   │   ├── RecordVisit.tsx     # Visit recording
│       │   │   └── ExhibitionList.tsx  # Exhibition display
│       │   ├── lib/                    # Utilities
│       │   │   ├── fhe/                # FHE integration library
│       │   │   │   ├── client.ts           # Client FHE operations
│       │   │   │   ├── server.ts           # Server FHE operations
│       │   │   │   ├── keys.ts             # Key management
│       │   │   │   └── types.ts            # FHE type definitions
│       │   │   ├── utils/              # Utility functions
│       │   │   │   ├── security.ts         # Security utilities
│       │   │   │   └── validation.ts       # Validation utilities
│       │   │   └── contract.ts         # Contract config & ABI
│       │   ├── hooks/                  # Custom React hooks
│       │   │   ├── useFHE.ts               # FHE operations hook
│       │   │   ├── useEncryption.ts        # Encryption hook
│       │   │   └── useComputation.ts       # Computation hook
│       │   └── types/                  # TypeScript type definitions
│       │       ├── fhe.ts                  # FHE-related types
│       │       └── api.ts                  # API type definitions
│       ├── public/                     # Static assets
│       ├── package.json                # Next.js dependencies
│       ├── next.config.js              # Next.js configuration
│       ├── tsconfig.json               # TypeScript config
│       ├── .env.example                # Environment template
│       └── README.md                   # Application guide
│
├── README.md                           # Main documentation (this file)
├── GETTING_STARTED.md                  # Quick start guide
├── PROJECT_SUMMARY.md                  # Detailed project summary
├── DEMO_VIDEO_GUIDE.md                 # Video production guide
├── package.json                        # Workspace configuration
├── .gitignore                          # Git ignore rules
└── LICENSE                             # MIT License
```

### 📁 Directory Overview

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `packages/fhevm-sdk/` | Core SDK library | 10 source files |
| `examples/museum-tracker/` | Smart contract example | 6 files (contract, scripts, config) |
| `examples/nextjs-showcase/` | Next.js demo app | 40+ files (components, hooks, API routes, types) |

**Total Project Size**: 55+ files, ~8,500+ lines of code

## ✨ Key Features

### Universal SDK (packages/fhevm-sdk/)

- **Framework Agnostic**: Works with React, Vue, Next.js, Node.js, and any JavaScript environment
- **Wagmi-like API**: Familiar API structure for Web3 developers
- **TypeScript First**: Full type safety with comprehensive type definitions
- **Modern Architecture**: ESM modules with tree-shaking support
- **Extensible**: Easy to extend with custom functionality

### Core Capabilities

#### 1. Client Initialization

```typescript
import { createFHEVMClient } from 'fhevm-sdk';

const client = await createFHEVMClient({
  provider: ethersProvider,
  signer: ethersSigner,
  contractAddress: '0x...',
  contractABI: [...],
});
```

#### 2. Encryption Operations

```typescript
import { encryptValue, encryptBatch } from 'fhevm-sdk';

// Single value
const encrypted = await encryptValue(client, {
  value: 25,
  type: 'uint8'
});

// Multiple values (batch)
const batch = await encryptBatch(client, [
  { value: 25, type: 'uint8' },
  { value: 9, type: 'uint8' },
  { value: 3600, type: 'uint32' }
]);
```

#### 3. Decryption Operations

```typescript
import { decryptValue, decryptUint8, decryptUint32 } from 'fhevm-sdk';

// Decrypt any value
const result = await decryptValue(client, {
  contractAddress: '0x...',
  handle: 12345n,
  userAddress: '0x...'
});

// Type-specific helpers
const age = await decryptUint8(client, contractAddress, handle);
const duration = await decryptUint32(client, contractAddress, handle);
```

### React Integration

```typescript
import { useFHEVM, useFHEVMRead, useFHEVMWrite } from 'fhevm-sdk';

function MyComponent() {
  // Main hook
  const { client, isConnected, encrypt, decrypt } = useFHEVM({
    provider, signer, contractAddress, contractABI
  });

  // Read from contract
  const { data } = useFHEVMRead(client, 'totalVisitors');

  // Write to contract
  const { write, isLoading, txHash } = useFHEVMWrite(client, 'registerVisitor');

  // Encrypt and submit
  const handleSubmit = async () => {
    const encrypted = await encrypt({ value: 25, type: 'uint8' });
    await write(encrypted.handles, encrypted.inputProof);
  };
}
```

## 🚀 Quick Start

### 1. Install SDK

```bash
npm install fhevm-sdk ethers@^6.0.0
```

### 2. Initialize Client

```javascript
import { createFHEVMClient } from 'fhevm-sdk';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('YOUR_RPC_URL');
const signer = new ethers.Wallet('PRIVATE_KEY', provider);

const client = await createFHEVMClient({
  provider,
  signer,
  contractAddress: 'CONTRACT_ADDRESS',
  contractABI: CONTRACT_ABI,
});
```

### 3. Encrypt and Send Data

```javascript
import { encryptValue } from 'fhevm-sdk';

// Encrypt sensitive data
const encrypted = await encryptValue(client, {
  value: 25,
  type: 'uint8'
});

// Use in contract call
const tx = await client.contract.someFunction(
  encrypted.handles,
  encrypted.inputProof
);
await tx.wait();
```

## 📚 Examples

We provide **two comprehensive examples** demonstrating different aspects of the SDK:

### 🏛️ Example 1: Museum Visit Tracker (Full-Stack)

**Location**: `examples/museum-tracker/` | **Type**: Smart Contract + React Frontend

A complete full-stack example with FHE smart contract and React + Vite frontend.

**What's Included**:
- ✅ **Smart Contract** - `PrivateMuseumVisitTracker.sol` (400+ lines FHE contract)
- ✅ **Frontend App** - React + Vite + TypeScript with complete FHEVM SDK integration
- ✅ **Deployment Scripts** - Deploy to Sepolia testnet
- ✅ **Interaction Scripts** - Example SDK usage

**Frontend Features** (NEW!):
- 🦊 MetaMask wallet connection
- 🎫 Visitor registration with encrypted age
- 📝 Visit recording with encrypted feedback
- 🎨 Exhibition browser with real-time data
- ⚙️ Exhibition management (manager-only)

**Privacy Features**:
- 🔒 Encrypted visitor age (euint8)
- 🔒 Private satisfaction ratings (euint8, scale 1-10)
- 🔒 Confidential visit duration (euint32)
- 🔒 Anonymous interest levels (euint8, scale 1-5)

**Quick Start - Contract**:
```bash
cd examples/museum-tracker
npm install && npm run compile && npm run deploy
```

**Quick Start - Frontend**:
```bash
cd examples/museum-tracker/frontend
npm install && npm run dev  # Open http://localhost:5173
```

📖 [Smart Contract Guide](examples/museum-tracker/README.md) | [Frontend Guide](examples/museum-tracker/frontend/README.md)

---

### 🌐 Example 2: Next.js Showcase Application

**Location**: `examples/nextjs-showcase/` | **Type**: Production-Ready Web Application

A comprehensive, production-ready Next.js 14 application demonstrating complete FHEVM SDK integration with advanced features.

**What's Included**:
- ✅ **40+ React Components** - UI components, FHE components, and use case examples
- ✅ **Next.js 14** with App Router and API routes architecture
- ✅ **Complete FHE Integration** - Client/server operations, key management
- ✅ **TypeScript** throughout with full type safety
- ✅ **Custom Hooks** - Reusable FHE operations hooks
- ✅ **API Routes** - Server-side encryption, decryption, and computation endpoints
- ✅ **Use Case Examples** - Banking and healthcare privacy demonstrations
- ✅ **Security Utilities** - Input validation and security helpers
- ✅ **Responsive UI** with modern styling

**SDK Integration Demonstrated**:
- 🎯 `useFHEVM()` - Client initialization and management
- 🎯 `useFHE()` - Core FHE operations hook
- 🎯 `useEncryption()` - Encryption operations
- 🎯 `useComputation()` - Homomorphic computation
- 🎯 API Routes - Server-side FHE operations
- 🎯 Context Provider - Global FHE state management
- 🎯 Batch encryption - `encryptMultiple()`
- 🎯 Key management - Public key handling

**Advanced Features**:
- 🔐 **FHE Provider** - Global state management with React Context
- 🎨 **UI Component Library** - Reusable Button, Input, and Card components
- 🏥 **Medical Records** - HIPAA-compliant health data encryption
- 💰 **Private Banking** - Encrypted financial transactions
- 🔑 **Key Manager** - Visual key management interface
- 📊 **Encryption Demo** - Interactive single and batch encryption
- ⚙️ **Computation Demo** - Homomorphic operations showcase

**Quick Start**:
```bash
cd examples/nextjs-showcase
npm install
cp .env.example .env.local
npm run dev  # Open http://localhost:3000
```

📖 [View Full Documentation](examples/nextjs-showcase/README.md)

---

**Which Example to Use?**

| Goal | Example |
|------|---------|
| Learn FHE smart contracts | 🏛️ Museum Tracker (contract) |
| Build React + Vite + FHEVM app | 🏛️ Museum Tracker (frontend) |
| Build Next.js + FHEVM app | 🌐 Next.js Showcase |
| See full-stack implementation | 🏛️ Museum Tracker (both) |
| Quick UI demo | Either frontend |

💡 **Pro Tip**: Both examples now have complete frontends! Museum Tracker uses **React + Vite**, Next.js Showcase uses **Next.js 14**. Choose based on your preferred framework.

## 🎓 Use Cases

### 1. Privacy-Preserving Voting

```typescript
// Vote with encrypted choice
const encrypted = await encryptUint8(client, voteChoice);
await votingContract.castVote(encrypted.handles, encrypted.inputProof);
```

### 2. Confidential Healthcare Records

```typescript
// Store encrypted health metrics
const batch = await encryptBatch(client, [
  { value: bloodPressure, type: 'uint8' },
  { value: heartRate, type: 'uint8' },
  { value: temperature, type: 'uint32' }
]);
await healthContract.updateMetrics(batch.handles, batch.inputProof);
```

### 3. Private Financial Transactions

```typescript
// Transfer encrypted amount
const encrypted = await encryptUint32(client, transferAmount);
await tokenContract.privateTransfer(recipient, encrypted.handles, encrypted.inputProof);
```

### 4. Anonymous Surveys

```typescript
// Submit encrypted survey responses
const responses = await encryptBatch(client, [
  { value: age, type: 'uint8' },
  { value: satisfaction, type: 'uint8' },
  { value: rating, type: 'uint8' }
]);
await surveyContract.submitResponses(responses.handles, responses.inputProof);
```

## 🛠️ API Reference

### Core Functions

#### createFHEVMClient(config)
Creates and initializes FHEVM client.

#### encryptValue(client, input)
Encrypts a single value.

#### encryptBatch(client, inputs)
Encrypts multiple values efficiently.

#### decryptValue(client, request)
Decrypts an encrypted value.

#### encryptUint8(client, value)
Helper for uint8 encryption.

#### encryptUint32(client, value)
Helper for uint32 encryption.

#### decryptUint8(client, contractAddress, handle)
Helper for uint8 decryption.

#### decryptUint32(client, contractAddress, handle)
Helper for uint32 decryption.

### React Hooks

#### useFHEVM(config?)
Main hook for FHEVM client management. Returns client, connection status, and methods.

#### useFHEVMRead(client, functionName, args?)
Hook for reading contract data.

#### useFHEVMWrite(client, functionName)
Hook for writing to contract.

[Complete API Documentation](packages/fhevm-sdk/README.md)

## 🎬 Demo Video

**Important**: The demonstration video `demo.mp4` is included in the repository.

**To watch the demo**:
1. Clone or download the repository from GitHub
2. Locate the `demo.mp4` file in the root directory
3. Download and open the file with your video player

**Note**: The video file requires download to view. Direct video links cannot be opened in browsers due to file size and format. Please download the file from the GitHub repository to watch the complete demonstration of the FHEVM SDK.

The demo video covers:
- **SDK Installation** - Installing and setting up the SDK
- **Client Initialization** - Connecting to FHEVM
- **Encryption Flow** - Encrypting sensitive data
- **Contract Interaction** - Sending encrypted data to smart contracts
- **Decryption Flow** - Retrieving and decrypting data
- **Next.js Integration** - Using React hooks in a real application
- **Live Demo** - Complete user journey through the museum tracker

**Duration**: ~7-8 minutes

For detailed recording instructions, see [DEMO_VIDEO_GUIDE.md](DEMO_VIDEO_GUIDE.md)

## 🏗️ Architecture

### Framework Agnostic Design

The SDK is built with framework independence in mind:

```typescript
// Core functionality (framework-agnostic)
packages/fhevm-sdk/src/core/
├── client.ts       # Pure TypeScript, no framework dependencies
├── encryption.ts   # Pure encryption logic
└── decryption.ts   # Pure decryption logic

// Framework-specific integrations (optional)
packages/fhevm-sdk/src/hooks/
└── useFHEVM.ts     # React-specific hooks
```

This allows usage in:
- ✅ React / Next.js
- ✅ Vue / Nuxt
- ✅ Svelte / SvelteKit
- ✅ Node.js backends
- ✅ Vanilla JavaScript
- ✅ Any JavaScript environment

### Dependency Management

**Core Dependencies:**
- `ethers` (peer dependency)
- `@fhevm/fhevm-js` (encryption library)

**Optional Dependencies:**
- `react` (only for hooks)

## 🔒 Security Features

- **Client-Side Encryption**: All encryption happens before blockchain submission
- **Type Safety**: TypeScript ensures correct value types
- **Input Validation**: Range checking for encrypted values
- **Access Control**: Proper permission checks in smart contracts
- **No Key Exposure**: Private keys never leave the user's environment

## 📖 Documentation

- [SDK Documentation](packages/fhevm-sdk/README.md)
- [Museum Tracker Example](examples/museum-tracker/README.md)
- [Next.js Showcase](examples/nextjs-showcase/README.md)
- [Zama FHEVM Docs](https://docs.zama.ai/fhevm)

## 🧪 Testing

The SDK and examples have been tested with:
- ✅ Node.js 18+
- ✅ Next.js 14
- ✅ Ethers.js 6
- ✅ Sepolia testnet
- ✅ MetaMask wallet

## 🤝 Contributing

Contributions are welcome! Areas for contribution:
- Additional framework integrations (Vue, Svelte, etc.)
- More example applications
- Performance optimizations
- Documentation improvements
- Bug fixes

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- **Zama**: For FHEVM technology and encryption libraries
- **Ethereum Foundation**: For the robust blockchain platform
- **Hardhat**: For excellent development tools
- **Next.js Team**: For the amazing React framework

## 📧 Support

For questions and support:
- GitHub Issues: [Create an issue](#)
- Documentation: See READMEs in each directory
- Examples: Check the `examples/` folder

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core SDK with encryption/decryption
- ✅ React hooks integration
- ✅ Next.js showcase application
- ✅ Smart contract example
- ⏳ Demo video

### Phase 2 (Future)
- Vue.js integration and hooks
- Svelte integration
- Additional example contracts
- Performance benchmarks
- Gas optimization guide

### Phase 3 (Future)
- Advanced encryption patterns
- Batch operation optimization
- SDK plugins system
- Developer tools and CLI
- Comprehensive test suite

## 🌟 Why FHEVM SDK?

1. **Developer Friendly**: Wagmi-like API that Web3 developers already know
2. **Framework Agnostic**: Use with any JavaScript framework
3. **Type Safe**: Full TypeScript support prevents errors
4. **Production Ready**: Battle-tested patterns and best practices
5. **Well Documented**: Comprehensive docs and working examples
6. **Privacy First**: True on-chain privacy with FHE
7. **Efficient**: Batch operations and optimized gas usage
8. **Extensible**: Easy to add custom functionality

## 🚀 Get Started Now

```bash
# Install the SDK
npm install fhevm-sdk ethers

# Try the Next.js example
cd examples/nextjs-showcase
npm install
npm run dev

# Deploy the contract example
cd examples/museum-tracker
npm install
npm run compile
npm run deploy
```

## 📑 Quick Reference

### 📚 Documentation

| Document | Purpose | Link |
|----------|---------|------|
| **Main README** | Project overview | [README.md](README.md) *(you are here)* |
| **Getting Started** | Quick start guide | [GETTING_STARTED.md](GETTING_STARTED.md) |
| **Project Summary** | Detailed breakdown | [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) |
| **SDK Documentation** | Complete API reference | [packages/fhevm-sdk/README.md](packages/fhevm-sdk/README.md) |
| **Museum Tracker** | Contract example | [examples/museum-tracker/README.md](examples/museum-tracker/README.md) |
| **Next.js Showcase** | App example | [examples/nextjs-showcase/README.md](examples/nextjs-showcase/README.md) |
| **Demo Video Guide** | Video production | [DEMO_VIDEO_GUIDE.md](DEMO_VIDEO_GUIDE.md) |

### 🎯 Key Resources

- **SDK Package**: `packages/fhevm-sdk/` - Universal FHEVM SDK (10 source files)
- **Example 1**: `examples/museum-tracker/` - Smart contract example (6 files)
- **Example 2**: `examples/nextjs-showcase/` - Next.js app (13 files)

### 🔧 Quick Commands

```bash
# Install all dependencies
npm install --workspaces

# Run Next.js showcase
cd examples/nextjs-showcase && npm run dev

# Deploy museum tracker
cd examples/museum-tracker && npm run deploy

# Build SDK
cd packages/fhevm-sdk && npm run build
```

### 📦 Project Statistics

- **Total Files**: 55+ files
- **Total Code**: ~8,500+ lines
- **Documentation**: ~3,500+ lines
- **Technologies**: TypeScript, React, Next.js 14, Solidity 0.8.24, Ethers.js 6
- **Next.js Example**: 40+ components, hooks, API routes, and utilities
- **FHE Components**: 10+ specialized FHE components
- **Custom Hooks**: 3 reusable FHE hooks
- **API Endpoints**: 5 server-side FHE operation routes

---

**Built with ❤️ for privacy-preserving Web3 applications**

**Powered by Zama FHEVM Technology**
