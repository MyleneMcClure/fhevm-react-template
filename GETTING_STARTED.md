# Getting Started with FHEVM SDK

Quick start guide for the FHEVM SDK project.

## 📋 Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher
- **MetaMask**: Browser extension installed
- **Sepolia ETH**: For testing on Sepolia testnet
- **Git**: For cloning the repository

## 🚀 Quick Start

### Option 1: Try the Next.js Showcase (Recommended)

This is the fastest way to see the SDK in action.

```bash
# Navigate to the Next.js showcase
cd examples/nextjs-showcase

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local with your values
# NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
# NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# Start the development server
npm run dev
```

Open http://localhost:3000 in your browser and connect your MetaMask wallet!

### Option 2: Use the SDK in Your Project

Install the SDK in your existing project:

```bash
# Install the SDK and ethers
npm install fhevm-sdk ethers
```

Then use it in your code:

```typescript
import { createFHEVMClient, encryptValue } from 'fhevm-sdk';
import { ethers } from 'ethers';

// Initialize
const provider = new ethers.JsonRpcProvider(YOUR_RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const client = await createFHEVMClient({
  provider,
  signer,
  contractAddress: CONTRACT_ADDRESS,
  contractABI: CONTRACT_ABI,
});

// Encrypt data
const encrypted = await encryptValue(client, {
  value: 25,
  type: 'uint8'
});

// Use in contract call
await client.contract.someFunction(
  encrypted.handles,
  encrypted.inputProof
);
```

### Option 3: Deploy the Museum Tracker Contract

Deploy and interact with the example smart contract:

```bash
# Navigate to museum tracker example
cd examples/museum-tracker

# Install dependencies
npm install

# Copy environment file
cp ../../.env.example .env

# Edit .env with your credentials
# SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
# PRIVATE_KEY=your_private_key

# Compile the contract
npm run compile

# Deploy to Sepolia
npm run deploy

# Interact with deployed contract
npm run interact
```

## 📚 Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/              # The SDK itself
│       ├── src/                # Source code
│       ├── package.json        # SDK package config
│       └── README.md          # SDK documentation
│
├── examples/
│   ├── museum-tracker/         # Smart contract example
│   │   ├── contracts/         # Solidity contracts
│   │   ├── scripts/           # Deploy/interact scripts
│   │   └── README.md         # Contract guide
│   │
│   └── nextjs-showcase/        # Next.js application
│       ├── src/               # Application source
│       ├── package.json       # App package config
│       └── README.md         # App guide
│
├── README.md                   # Main documentation
├── PROJECT_SUMMARY.md          # Complete project summary
├── GETTING_STARTED.md         # This file
└── DEMO_VIDEO_GUIDE.md        # Video production guide
```

## 🔑 Environment Setup

### For Next.js Showcase

Create `examples/nextjs-showcase/.env.local`:

```env
# Sepolia RPC URL (get from Infura, Alchemy, etc.)
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Sepolia Chain ID
NEXT_PUBLIC_CHAIN_ID=11155111

# Deployed contract address
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# Zama gateway URL (optional)
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
```

### For Museum Tracker Contract

Create `examples/museum-tracker/.env`:

```env
# Network Configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Private key (DO NOT commit!)
PRIVATE_KEY=your_private_key_here

# Etherscan API key for verification
ETHERSCAN_API_KEY=your_etherscan_api_key

# Deployed contract address (after deployment)
CONTRACT_ADDRESS=0x...
```

## 🛠️ Development Workflow

### 1. Install Dependencies

From the root directory:

```bash
# Install all workspace dependencies
npm install --workspaces
```

Or install individually:

```bash
# SDK
cd packages/fhevm-sdk && npm install

# Museum tracker
cd examples/museum-tracker && npm install

# Next.js showcase
cd examples/nextjs-showcase && npm install
```

### 2. Build the SDK (Optional)

If you want to build the SDK package:

```bash
cd packages/fhevm-sdk
npm run build
```

### 3. Run Examples

**Next.js Showcase:**
```bash
cd examples/nextjs-showcase
npm run dev
# Open http://localhost:3000
```

**Museum Tracker:**
```bash
cd examples/museum-tracker

# Start local Hardhat node (Terminal 1)
npm run node

# Deploy contract (Terminal 2)
npm run deploy:local

# Interact with contract
npm run interact
```

## 🎯 Common Tasks

### Task 1: Register a Visitor

Using the Next.js app:
1. Open http://localhost:3000
2. Click "Connect Wallet"
3. Enter your age in the registration form
4. Click "Register with Encrypted Age"
5. Confirm transaction in MetaMask
6. Wait for confirmation

### Task 2: Record a Visit

Using the Next.js app:
1. Fill in the "Record Private Visit" form
2. Enter exhibition ID, age, satisfaction, duration, interest
3. Click "Record Visit with Encrypted Feedback"
4. Confirm transaction in MetaMask
5. See success message with transaction hash

### Task 3: View Exhibitions

The exhibitions list automatically loads when you connect your wallet.

### Task 4: Deploy Your Own Contract

```bash
cd examples/museum-tracker

# Edit scripts/deploy.js if needed
# Make sure .env is configured

npm run deploy

# Note the contract address
# Update .env.local in Next.js showcase with new address
```

## 🐛 Troubleshooting

### Issue: MetaMask Not Detected

**Solution**:
- Install MetaMask browser extension
- Refresh the page
- Make sure MetaMask is unlocked

### Issue: Transaction Fails

**Solution**:
- Check you have Sepolia ETH (get from faucet)
- Verify contract address is correct
- Make sure you're on Sepolia network in MetaMask
- Check gas settings

### Issue: "Module not found" Error

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: Next.js Build Errors

**Solution**:
```bash
cd examples/nextjs-showcase
rm -rf .next
npm run dev
```

### Issue: Contract Deployment Fails

**Solution**:
- Check SEPOLIA_RPC_URL is correct
- Verify PRIVATE_KEY is valid
- Ensure account has Sepolia ETH
- Try increasing gas limit in hardhat.config.js

### Issue: Encryption/Decryption Fails

**Solution**:
- Check RPC URL is accessible
- Verify contract address is correct
- Ensure gateway URL is correct
- Check network connectivity

## 📖 Next Steps

After getting started:

1. **Read the Documentation**
   - [Main README](README.md)
   - [SDK Documentation](packages/fhevm-sdk/README.md)
   - [Project Summary](PROJECT_SUMMARY.md)

2. **Explore the Examples**
   - Study the Next.js showcase code
   - Examine the smart contract
   - Try modifying the examples

3. **Build Your Own dApp**
   - Use the SDK in your project
   - Create your own privacy-preserving contract
   - Integrate with your existing app

4. **Watch the Demo Video** (when available)
   - See complete walkthrough
   - Learn best practices
   - Understand advanced features

## 🆘 Getting Help

### Documentation
- [SDK API Reference](packages/fhevm-sdk/README.md)
- [Smart Contract Guide](examples/museum-tracker/README.md)
- [Next.js App Guide](examples/nextjs-showcase/README.md)

### External Resources
- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Hardhat Documentation](https://hardhat.org/docs)

### Common Questions

**Q: Can I use this SDK with Vue/Svelte/etc?**
A: Yes! The core SDK is framework-agnostic. Only the React hooks are React-specific.

**Q: Does this work on mainnet?**
A: The SDK works wherever FHEVM is deployed. Currently optimized for Sepolia testnet.

**Q: How do I get Sepolia ETH?**
A: Use a Sepolia faucet:
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia

**Q: Can I use this in production?**
A: The SDK is production-ready, but test thoroughly and ensure you understand FHEVM security considerations.

**Q: How much does it cost to use?**
A: Gas costs for FHEVM operations vary. Use the gas reporter to estimate costs.

## ✅ Checklist for First Run

- [ ] Node.js 18+ installed
- [ ] MetaMask installed and set up
- [ ] Sepolia ETH in wallet
- [ ] Infura/Alchemy API key obtained
- [ ] Environment files configured
- [ ] Dependencies installed
- [ ] Next.js showcase running
- [ ] Wallet connected
- [ ] First transaction successful

## 🎉 Success!

Once you've completed the getting started steps, you're ready to:
- Build privacy-preserving dApps
- Encrypt sensitive data on-chain
- Create confidential smart contracts
- Deploy privacy-first applications

Happy building with FHEVM SDK! 🚀
