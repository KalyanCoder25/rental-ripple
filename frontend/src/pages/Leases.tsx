import { useEffect, useState } from 'react';
import Api from '../services/api';

export default function Leases() {
  const [leases, setLeases] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) return;
    Api.getLeases(user.id).then((d:any) => setLeases(d || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Your Leases</h2>
        {leases.length === 0 ? <p>No leases found.</p> : (
          <div className="grid grid-cols-1 gap-4">
            {leases.map((l) => (
              <div key={l.id} className="flex justify-between bg-gray-50 p-4 rounded">
                <div>
                  <div className="font-bold">Property: {l.propertyTitle || l.propertyId}</div>
                  <div>Tenant: {l.tenantName}</div>
                  <div>Start: {l.startDate}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-blue-600 font-bold">${l.price}</div>
                  <div className="text-sm">Status: {l.status || 'ACTIVE'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
