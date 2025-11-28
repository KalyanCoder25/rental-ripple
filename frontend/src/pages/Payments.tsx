import { useEffect, useState } from 'react';
import Api from '../services/api';

export default function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    Api.getPayments(user?.id).then((data:any) => setPayments(data || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Payments</h2>
        {payments.length === 0 ? <p>No payments found.</p> : (
          <div className="grid grid-cols-1 gap-4">
            {payments.map((p) => (
              <div key={p.id} className="flex justify-between items-center bg-gray-50 p-4 rounded">
                <div>
                  <div className="font-bold">{p.description || `Payment ${p.id}`}</div>
                  <div className="text-sm">Date: {new Date(p.date).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-bold text-blue-600">${p.amount}</div>
                  <div className={`px-2 py-1 rounded text-xs ${p.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{p.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
