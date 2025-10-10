'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface ConnectWalletProps {
  onConnect: (provider: ethers.BrowserProvider, signer: ethers.JsonRpcSigner) => void;
}

export default function ConnectWallet({ onConnect }: ConnectWalletProps) {
  const [address, setAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          setAddress(await signer.getAddress());
          onConnect(provider, signer);
        }
      } catch (err) {
        console.error('Failed to check connection:', err);
      }
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask to use this application');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Request account access
      await provider.send('eth_requestAccounts', []);

      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      setAddress(userAddress);
      onConnect(provider, signer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }

  function formatAddress(addr: string): string {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  return (
    <div className="connect-wallet">
      {!address ? (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="connect-button"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="connected">
          <span className="address">{formatAddress(address)}</span>
          <span className="status">Connected</span>
        </div>
      )}
      {error && <div className="error">{error}</div>}

      <style jsx>{`
        .connect-wallet {
          margin-bottom: 2rem;
        }
        .connect-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .connect-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .connect-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .connected {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: #f0f4f8;
          border-radius: 8px;
        }
        .address {
          font-family: monospace;
          font-weight: 600;
        }
        .status {
          color: #10b981;
          font-size: 14px;
        }
        .error {
          margin-top: 12px;
          padding: 12px;
          background: #fee;
          color: #c33;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
