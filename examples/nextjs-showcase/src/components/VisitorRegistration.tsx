'use client';

import { useState } from 'react';
import { useFHEVM, useFHEVMWrite } from 'fhevm-sdk';

export default function VisitorRegistration() {
  const { client, isConnected, encrypt, error: fhevmError } = useFHEVM();
  const { write, isLoading, txHash, error: writeError } = useFHEVMWrite(client, 'registerVisitor');

  const [age, setAge] = useState<string>('');
  const [success, setSuccess] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 119) {
      alert('Please enter a valid age between 1 and 119');
      return;
    }

    try {
      // Encrypt age using FHEVM SDK
      const encrypted = await encrypt({ value: ageNum, type: 'uint8' });

      if (!encrypted) {
        alert('Failed to encrypt age');
        return;
      }

      // Register visitor with encrypted age
      const tx = await write(encrypted.handles, encrypted.inputProof);

      if (tx) {
        setSuccess(true);
        setAge('');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please try again.');
    }
  }

  return (
    <div className="registration">
      <h2>Register as Visitor</h2>
      <p className="subtitle">Your age will be encrypted using FHE</p>

      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            min="1"
            max="119"
            required
            disabled={!isConnected || isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!isConnected || isLoading || !age}
          className="submit-button"
        >
          {isLoading ? 'Registering...' : 'Register with Encrypted Age'}
        </button>
      </form>

      {success && (
        <div className="success">
          <span className="icon">✓</span> Successfully registered!
          {txHash && (
            <div className="tx-hash">
              Transaction: {txHash.slice(0, 10)}...{txHash.slice(-8)}
            </div>
          )}
        </div>
      )}

      {(fhevmError || writeError) && (
        <div className="error">
          {fhevmError?.message || writeError?.message}
        </div>
      )}

      <style jsx>{`
        .registration {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          margin-bottom: 2rem;
        }
        h2 {
          margin: 0 0 0.5rem 0;
          color: #1a202c;
        }
        .subtitle {
          color: #718096;
          margin: 0 0 1.5rem 0;
          font-size: 14px;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #2d3748;
        }
        input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s;
        }
        input:focus {
          outline: none;
          border-color: #667eea;
        }
        input:disabled {
          background: #f7fafc;
          cursor: not-allowed;
        }
        .submit-button {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 14px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .success {
          margin-top: 1.5rem;
          padding: 16px;
          background: #f0fdf4;
          border: 2px solid #10b981;
          border-radius: 8px;
          color: #065f46;
        }
        .icon {
          font-size: 20px;
          font-weight: bold;
          margin-right: 8px;
        }
        .tx-hash {
          margin-top: 8px;
          font-family: monospace;
          font-size: 13px;
          color: #047857;
        }
        .error {
          margin-top: 1.5rem;
          padding: 16px;
          background: #fef2f2;
          border: 2px solid #ef4444;
          border-radius: 8px;
          color: #991b1b;
        }
      `}</style>
    </div>
  );
}
