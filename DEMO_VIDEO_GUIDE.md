# Demo Video Production Guide

Complete guide for creating the **demo.mp4** demonstration video for the FHEVM SDK project.

## Video Specifications

- **Filename**: `demo.mp4`
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (Full HD)
- **Framerate**: 30fps
- **Duration**: 7-8 minutes
- **Audio**: Clear narration with background music (optional)
- **Captions**: Recommended for accessibility

## Recording Tools

### Recommended Software

1. **OBS Studio** (Free, Open Source)
   - Download: https:/obsproject.com/
   - Best for: Screen recording with webcam overlay
   - Settings: 1920x1080, 30fps, MP4 output

2. **Loom** (Free/Paid)
   - Website: https:/www.loom.com/
   - Best for: Quick recording with editing features

3. **Camtasia** (Paid)
   - Best for: Professional editing and annotations

4. **ScreenFlow** (Mac, Paid)
   - Best for: Mac users needing professional quality

### Audio Setup

- Use a quality microphone (USB condenser mic recommended)
- Record in a quiet environment
- Test audio levels before full recording
- Consider background music at 10-15% volume

## Video Script

### Section 1: Introduction (30 seconds)

**Visual**: Project directory structure in VS Code

**Narration**:
> "Welcome to the FHEVM SDK demonstration. This is a universal, framework-agnostic SDK for building privacy-preserving decentralized applications using Fully Homomorphic Encryption. Let's explore how it works through a complete example - a privacy-preserving museum visit tracker."

**On-Screen Text**:
- "FHEVM SDK"
- "Universal • Framework-Agnostic • Privacy-First"

---

### Section 2: SDK Setup (1 minute)

**Visual**: Terminal showing installation and code editor

**Narration**:
> "Getting started is simple. Install the SDK with npm, along with ethers.js. The SDK provides a Wagmi-like API that's familiar to Web3 developers."

**Commands to Show**:
```bash
npm install fhevm-sdk ethers
```

**Visual**: Show `src/core/client.ts` file

**Narration**:
> "Initialize the FHEVM client by providing your Ethereum provider, signer, and contract details. The SDK handles all the complexity of FHE encryption behind a clean API."

**Code to Show**:
```typescript
import { createFHEVMClient } from 'fhevm-sdk';

const client = await createFHEVMClient({
  provider: ethersProvider,
  signer: ethersSigner,
  contractAddress: '0x...',
  contractABI: [...],
});
```

---

### Section 3: Encryption Flow (1 minute)

**Visual**: Show `src/core/encryption.ts` and terminal output

**Narration**:
> "Encrypting data is straightforward. For a single value, use encryptValue. For multiple values, use encryptBatch for better efficiency. Let's encrypt a visitor's age."

**Code to Show**:
```typescript
/ Single value encryption
const encrypted = await encryptValue(client, {
  value: 25,
  type: 'uint8'
});

console.log('Encrypted handles:', encrypted.handles);
console.log('Input proof:', encrypted.inputProof);
```

**Visual**: Terminal showing encrypted output (handles and proof)

**Narration**:
> "The SDK returns encrypted handles and an input proof. These are passed to your smart contract, ensuring the original value never touches the blockchain in plaintext."

**Visual**: Show batch encryption

**Code to Show**:
```typescript
/ Batch encryption
const batch = await encryptBatch(client, [
  { value: 25, type: 'uint8' },      / age
  { value: 9, type: 'uint8' },       / satisfaction
  { value: 3600, type: 'uint32' }    / duration
]);
```

---

### Section 4: Contract Interaction (1 minute)

**Visual**: Show smart contract in VS Code, then terminal

**Narration**:
> "Our example contract is a privacy-preserving museum visit tracker. Visitors can register with encrypted ages and record visits with encrypted feedback."

**Visual**: Show `PrivateMuseumVisitTracker.sol` contract

**Narration**:
> "The contract uses Zama's FHE library to handle encrypted data on-chain. Let's register a visitor."

**Commands to Show**:
```bash
npm run deploy
```

**Visual**: Terminal showing deployment

**Code to Show**:
```typescript
/ Register visitor with encrypted age
const tx = await client.contract.registerVisitor(
  encrypted.handles,
  encrypted.inputProof
);

await tx.wait();
console.log('Visitor registered!');
```

**Visual**: Show Etherscan transaction confirmation

---

### Section 5: Decryption Flow (30 seconds)

**Visual**: Show `src/core/decryption.ts` and terminal

**Narration**:
> "Decryption is just as easy. The SDK provides helpers for different data types. Only authorized users can decrypt values."

**Code to Show**:
```typescript
/ Decrypt uint8 value
const age = await decryptUint8(
  client,
  contractAddress,
  handle
);

console.log('Decrypted age:', age);
```

**Visual**: Terminal showing decrypted value

---

### Section 6: Next.js Application Demo (2 minutes)

**Visual**: Browser showing Next.js app

**Narration**:
> "Now let's see the SDK in action with our Next.js showcase application. This demonstrates all SDK features in a production-ready application."

**Steps to Show**:

1. **Start Application**
   ```bash
   cd examples/nextjs-showcase
   npm run dev
   ```

2. **Open Browser**
   - Show homepage: `http:/localhost:3000`
   - Point out modern UI and clear sections

3. **Connect Wallet**
   - Click "Connect Wallet"
   - Show MetaMask popup
   - Approve connection
   - Show connected status

4. **Register Visitor**
   - Navigate to registration section
   - Enter age: "28"
   - Click "Register with Encrypted Age"
   - Show loading state
   - Show success message and transaction hash
   - Explain: "Age 28 is now encrypted on-chain"

5. **View Exhibitions**
   - Scroll to exhibitions list
   - Point out exhibition details
   - Note public visitor counts

6. **Record Private Visit**
   - Fill in form:
     - Exhibition ID: 1
     - Age: 28
     - Satisfaction: 9
     - Duration: 120 (minutes)
     - Interest: 5
   - Click "Record Visit with Encrypted Feedback"
   - Show loading state
   - Show success confirmation
   - Explain: "All feedback values are encrypted before submission"

---

### Section 7: React Hooks Deep Dive (1 minute)

**Visual**: VS Code showing React components

**Narration**:
> "The SDK provides React hooks for seamless integration. Let's examine the key hooks."

**Show `useFHEVM` Hook**:
```typescript
const {
  client,
  isConnected,
  encrypt,
  decrypt,
  error
} = useFHEVM({
  provider,
  signer,
  contractAddress,
  contractABI
});
```

**Narration**:
> "useFHEVM manages the client lifecycle and provides encryption methods."

**Show `useFHEVMWrite` Hook**:
```typescript
const {
  write,
  isLoading,
  txHash,
  error
} = useFHEVMWrite(client, 'registerVisitor');
```

**Narration**:
> "useFHEVMWrite handles contract interactions with automatic loading states."

**Visual**: Show live updates in browser as state changes

---

### Section 8: Summary and Use Cases (30 seconds)

**Visual**: Animated slide or split screen showing multiple use cases

**Narration**:
> "The FHEVM SDK enables countless privacy-preserving applications: confidential voting, private healthcare records, anonymous surveys, and confidential DeFi transactions. It's framework-agnostic, type-safe, and production-ready."

**On-Screen Text**:
- "✅ Framework Agnostic"
- "✅ Wagmi-like API"
- "✅ TypeScript Support"
- "✅ React Hooks"
- "✅ Batch Operations"
- "✅ Production Ready"

**Visual**: Show GitHub repo or documentation link

**Narration**:
> "Check out the complete documentation and examples in the repository. Thank you for watching!"

**End Screen**:
- Project name: "FHEVM SDK"
- Tagline: "Universal SDK for Privacy-Preserving dApps"
- Links to documentation

---

## Recording Checklist

### Pre-Recording

- [ ] Install and test all recording software
- [ ] Set up microphone and test audio levels
- [ ] Close unnecessary applications
- [ ] Disable notifications (Do Not Disturb mode)
- [ ] Prepare browser tabs in order
- [ ] Have terminal commands ready
- [ ] Test deployment on Sepolia testnet
- [ ] Ensure sufficient Sepolia ETH for transactions
- [ ] Clear browser cache for clean demo
- [ ] Prepare VS Code with relevant files open

### Recording Setup

- [ ] Resolution: 1920x1080
- [ ] Framerate: 30fps
- [ ] Audio: Clear, no background noise
- [ ] Zoom: Appropriate text size (150-200%)
- [ ] Theme: High contrast for visibility
- [ ] Cursor: Large enough to see
- [ ] Annotations: Prepare highlight tool

### During Recording

- [ ] Speak clearly and at moderate pace
- [ ] Pause between sections
- [ ] Show code for 5+ seconds before explaining
- [ ] Wait for animations/transitions to complete
- [ ] Verify transactions complete before moving on
- [ ] Use on-screen annotations when helpful

### Post-Recording

- [ ] Review entire video for errors
- [ ] Add captions/subtitles
- [ ] Add intro/outro slides
- [ ] Add background music (optional, low volume)
- [ ] Add transitions between sections
- [ ] Export as MP4 (H.264)
- [ ] Verify file size (target: under 500MB)
- [ ] Test playback on different devices

## Editing Guidelines

### Cuts and Transitions

- Cut out long waits (installations, transaction confirmations)
- Use fade transitions between major sections
- Add "fast forward" effect for lengthy operations
- Keep natural pauses for comprehension

### Annotations

- Use arrows to highlight important UI elements
- Add text overlays for key concepts
- Highlight code sections being discussed
- Use zoom-in effect for small text

### Audio

- Normalize audio levels
- Remove background noise
- Add subtle background music (10-15% volume)
- Ensure narration is always audible

### Captions

- Add captions for all narration
- Use clear, readable font
- Position at bottom of screen
- Include code snippets as on-screen text

## File Delivery

### Final Video

- Filename: `demo.mp4`
- Location: `D:/fhevm-react-template/demo.mp4`
- Size: Target under 500MB
- Test playback before delivery

### Alternative Formats (Optional)

- Upload to YouTube (unlisted)
- Upload to Vimeo
- Provide streaming link
- Include subtitles file (.srt)

## Common Issues and Solutions

### Issue: Video Too Long
**Solution**: Cut unnecessary parts, speed up installations/builds

### Issue: Audio Quality Poor
**Solution**: Re-record audio separately, sync in editing

### Issue: Text Too Small
**Solution**: Increase zoom to 150-200%, use high-contrast theme

### Issue: Transactions Slow
**Solution**: Fast-forward during waits, add "Transaction pending..." text

### Issue: File Size Too Large
**Solution**: Reduce bitrate, compress with HandBrake, or trim duration

## Example Timeline

```
00:00 - 00:30  Introduction
00:30 - 01:30  SDK Setup
01:30 - 02:30  Encryption Flow
02:30 - 03:30  Contract Interaction
03:30 - 04:00  Decryption Flow
04:00 - 06:00  Next.js Application Demo
06:00 - 07:00  React Hooks Deep Dive
07:00 - 07:30  Summary and Use Cases
07:30 - 07:45  Outro / Credits
```

## Resources

- [OBS Studio Tutorial](https:/obsproject.com/wiki/)
- [Loom Recording Guide](https:/support.loom.com/)
- [Video Editing Tips](https:/www.youtube.com/results?search_query=video+editing+tips)
- [FFmpeg for Compression](https:/ffmpeg.org/)

---

**Good luck with your recording!**

Remember: The goal is to clearly demonstrate the SDK's capabilities and ease of use. Keep it engaging, informative, and professional.
