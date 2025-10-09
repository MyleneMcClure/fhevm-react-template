'use client';

import { useState, useEffect } from 'react';
import { useFHEVM, useFHEVMRead } from 'fhevm-sdk';
import { EXHIBITION_TYPE_NAMES, ExhibitionType } from '@/lib/contract';

interface Exhibition {
  id: number;
  name: string;
  type: ExhibitionType;
  startDate: number;
  endDate: number;
  isActive: boolean;
  publicVisitorCount: number;
}

export default function ExhibitionList() {
  const { client, isConnected } = useFHEVM();
  const { data: totalExhibitions } = useFHEVMRead(client, 'totalExhibitions');

  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (totalExhibitions && client) {
      loadExhibitions();
    }
  }, [totalExhibitions, client]);

  async function loadExhibitions() {
    if (!client) return;

    setLoading(true);
    try {
      const count = Number(totalExhibitions);
      const exhibitionsData: Exhibition[] = [];

      for (let i = 1; i <= count; i++) {
        const data = await client.contract.exhibitions(i);
        exhibitionsData.push({
          id: i,
          name: data.name,
          type: data.exhibitionType,
          startDate: Number(data.startDate),
          endDate: Number(data.endDate),
          isActive: data.isActive,
          publicVisitorCount: Number(data.publicVisitorCount),
        });
      }

      setExhibitions(exhibitionsData);
    } catch (err) {
      console.error('Failed to load exhibitions:', err);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString();
  }

  if (!isConnected) {
    return (
      <div className="exhibition-list">
        <h2>Exhibitions</h2>
        <p className="info">Please connect your wallet to view exhibitions</p>
        <style jsx>{`
          .exhibition-list {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          }
          h2 {
            margin: 0 0 1rem 0;
            color: #1a202c;
          }
          .info {
            color: #718096;
          }
        `}</style>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="exhibition-list">
        <h2>Exhibitions</h2>
        <p className="info">Loading exhibitions...</p>
        <style jsx>{`
          .exhibition-list {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          }
          h2 {
            margin: 0 0 1rem 0;
            color: #1a202c;
          }
          .info {
            color: #718096;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="exhibition-list">
      <h2>Exhibitions</h2>

      {exhibitions.length === 0 ? (
        <p className="info">No exhibitions found</p>
      ) : (
        <div className="exhibitions">
          {exhibitions.map((exhibition) => (
            <div key={exhibition.id} className="exhibition-card">
              <div className="header">
                <h3>{exhibition.name}</h3>
                <span className={`badge ${exhibition.isActive ? 'active' : 'inactive'}`}>
                  {exhibition.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="details">
                <div className="detail-row">
                  <span className="label">ID:</span>
                  <span className="value">#{exhibition.id}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Type:</span>
                  <span className="value">{EXHIBITION_TYPE_NAMES[exhibition.type]}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Period:</span>
                  <span className="value">
                    {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Public Visitors:</span>
                  <span className="value">{exhibition.publicVisitorCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .exhibition-list {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          margin-bottom: 2rem;
        }
        h2 {
          margin: 0 0 1.5rem 0;
          color: #1a202c;
        }
        .info {
          color: #718096;
        }
        .exhibitions {
          display: grid;
          gap: 1rem;
        }
        .exhibition-card {
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.5rem;
          transition: border-color 0.2s;
        }
        .exhibition-card:hover {
          border-color: #cbd5e0;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        h3 {
          margin: 0;
          color: #2d3748;
          font-size: 18px;
        }
        .badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .badge.active {
          background: #d1fae5;
          color: #065f46;
        }
        .badge.inactive {
          background: #fee;
          color: #991b1b;
        }
        .details {
          display: grid;
          gap: 0.75rem;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
        .label {
          color: #718096;
          font-weight: 500;
        }
        .value {
          color: #2d3748;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
