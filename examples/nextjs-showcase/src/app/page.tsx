'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { useFHEVM } from 'fhevm-sdk';
import ConnectWallet from '@/components/ConnectWallet';
import VisitorRegistration from '@/components/VisitorRegistration';
import RecordVisit from '@/components/RecordVisit';
import ExhibitionList from '@/components/ExhibitionList';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function Home() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  const { connect, isConnected, error } = useFHEVM();

  async function handleConnect(
    newProvider: ethers.BrowserProvider,
    newSigner: ethers.JsonRpcSigner
  ) {
    setProvider(newProvider);
    setSigner(newSigner);

    // Connect FHEVM client
    await connect({
      provider: newProvider,
      signer: newSigner,
      contractAddress: CONTRACT_ADDRESS,
      contractABI: CONTRACT_ABI,
    });
  }

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <span className="icon">🔐</span>
          <h1>Museum Visit Tracker</h1>
        </div>
        <p className="tagline">Privacy-Preserving Analytics with FHEVM</p>
      </header>

      <main className="main">
        <ConnectWallet onConnect={handleConnect} />

        {error && (
          <div className="error-banner">
            <span className="icon">⚠️</span>
            {error.message}
          </div>
        )}

        {isConnected && (
          <>
            <div className="info-card">
              <h2>About This Demo</h2>
              <p>
                This application demonstrates the FHEVM SDK for building privacy-preserving
                applications. All sensitive data (age, feedback, visit duration) is encrypted
                using Fully Homomorphic Encryption before being sent to the blockchain.
              </p>
              <div className="features">
                <div className="feature">
                  <span className="feature-icon">🔒</span>
                  <strong>Private Data:</strong> Your age and feedback remain encrypted on-chain
                </div>
                <div className="feature">
                  <span className="feature-icon">📊</span>
                  <strong>Anonymous Analytics:</strong> Museums can analyze trends without accessing individual data
                </div>
                <div className="feature">
                  <span className="feature-icon">✅</span>
                  <strong>GDPR Compliant:</strong> No personal data exposed in plaintext
                </div>
              </div>
            </div>

            <div className="grid">
              <div className="column">
                <VisitorRegistration />
                <RecordVisit />
              </div>
              <div className="column">
                <ExhibitionList />
              </div>
            </div>

            <div className="sdk-info">
              <h3>Powered by FHEVM SDK</h3>
              <p>
                This demo uses the universal FHEVM SDK - a framework-agnostic library for
                building privacy-preserving dApps with Wagmi-like API.
              </p>
              <div className="sdk-features">
                <span className="tag">Framework Agnostic</span>
                <span className="tag">TypeScript Support</span>
                <span className="tag">React Hooks</span>
                <span className="tag">Wagmi-like API</span>
                <span className="tag">Batch Encryption</span>
              </div>
            </div>
          </>
        )}

        {!isConnected && (
          <div className="connect-prompt">
            <span className="icon">👋</span>
            <h2>Welcome!</h2>
            <p>Connect your wallet to start using the privacy-preserving museum tracker</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Built with FHEVM SDK | Powered by Zama FHE Technology</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
        }
        .header {
          text-align: center;
          color: white;
          margin-bottom: 3rem;
        }
        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        .logo .icon {
          font-size: 3rem;
        }
        h1 {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 700;
        }
        .tagline {
          margin: 0;
          font-size: 1.2rem;
          opacity: 0.9;
        }
        .main {
          max-width: 1200px;
          margin: 0 auto;
        }
        .error-banner {
          background: #fee;
          color: #c33;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .info-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          margin-bottom: 2rem;
        }
        .info-card h2 {
          margin: 0 0 1rem 0;
          color: #1a202c;
        }
        .info-card p {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .features {
          display: grid;
          gap: 1rem;
        }
        .feature {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 8px;
        }
        .feature-icon {
          font-size: 1.5rem;
        }
        .feature strong {
          color: #2d3748;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .connect-prompt {
          text-align: center;
          background: white;
          padding: 4rem 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }
        .connect-prompt .icon {
          font-size: 4rem;
          display: block;
          margin-bottom: 1rem;
        }
        .connect-prompt h2 {
          margin: 0 0 1rem 0;
          color: #1a202c;
        }
        .connect-prompt p {
          color: #718096;
        }
        .sdk-info {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          text-align: center;
        }
        .sdk-info h3 {
          margin: 0 0 1rem 0;
          color: #1a202c;
        }
        .sdk-info p {
          color: #4a5568;
          margin-bottom: 1.5rem;
        }
        .sdk-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }
        .tag {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }
        .footer {
          margin-top: 3rem;
          text-align: center;
          color: white;
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}
