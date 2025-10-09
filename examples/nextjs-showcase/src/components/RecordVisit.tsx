'use client';

import { useState } from 'react';
import { useFHEVM, useFHEVMWrite } from 'fhevm-sdk';

export default function RecordVisit() {
  const { client, isConnected, encryptMultiple, error: fhevmError } = useFHEVM();
  const { write, isLoading, txHash, error: writeError } = useFHEVMWrite(client, 'recordPrivateVisit');

  const [exhibitionId, setExhibitionId] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [satisfaction, setSatisfaction] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [interest, setInterest] = useState<string>('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);

    // Validate inputs
    const ageNum = parseInt(age);
    const satisfactionNum = parseInt(satisfaction);
    const durationNum = parseInt(duration);
    const interestNum = parseInt(interest);
    const exhibitionIdNum = parseInt(exhibitionId);

    if (
      isNaN(ageNum) || ageNum < 1 || ageNum > 119 ||
      isNaN(satisfactionNum) || satisfactionNum < 1 || satisfactionNum > 10 ||
      isNaN(durationNum) || durationNum < 1 ||
      isNaN(interestNum) || interestNum < 1 || interestNum > 5 ||
      isNaN(exhibitionIdNum) || exhibitionIdNum < 1
    ) {
      alert('Please enter valid values for all fields');
      return;
    }

    try {
      // Encrypt all values in batch
      const encrypted = await encryptMultiple([
        { value: ageNum, type: 'uint8' },
        { value: satisfactionNum, type: 'uint8' },
        { value: durationNum, type: 'uint32' },
        { value: interestNum, type: 'uint8' },
      ]);

      if (!encrypted) {
        alert('Failed to encrypt data');
        return;
      }

      // Record private visit with encrypted data
      const tx = await write(exhibitionIdNum, encrypted.handles, encrypted.inputProof);

      if (tx) {
        setSuccess(true);
        // Clear form
        setExhibitionId('');
        setAge('');
        setSatisfaction('');
        setDuration('');
        setInterest('');
      }
    } catch (err) {
      console.error('Failed to record visit:', err);
      alert('Failed to record visit. Please try again.');
    }
  }

  return (
    <div className="record-visit">
      <h2>Record Private Visit</h2>
      <p className="subtitle">All feedback will be encrypted using FHE</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exhibitionId">Exhibition ID</label>
          <input
            type="number"
            id="exhibitionId"
            value={exhibitionId}
            onChange={(e) => setExhibitionId(e.target.value)}
            placeholder="Enter exhibition ID"
            min="1"
            required
            disabled={!isConnected || isLoading}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="1-119"
              min="1"
              max="119"
              required
              disabled={!isConnected || isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="satisfaction">Satisfaction (1-10)</label>
            <input
              type="number"
              id="satisfaction"
              value={satisfaction}
              onChange={(e) => setSatisfaction(e.target.value)}
              placeholder="1-10"
              min="1"
              max="10"
              required
              disabled={!isConnected || isLoading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Minutes spent"
              min="1"
              required
              disabled={!isConnected || isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="interest">Interest Level (1-5)</label>
            <input
              type="number"
              id="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="1-5"
              min="1"
              max="5"
              required
              disabled={!isConnected || isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isConnected || isLoading}
          className="submit-button"
        >
          {isLoading ? 'Recording...' : 'Record Visit with Encrypted Feedback'}
        </button>
      </form>

      {success && (
        <div className="success">
          <span className="icon">✓</span> Visit recorded successfully!
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
        .record-visit {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
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
          flex: 1;
        }
        .form-row {
          display: flex;
          gap: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #2d3748;
          font-size: 14px;
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
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          border: none;
          padding: 14px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s;
          margin-top: 1rem;
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
