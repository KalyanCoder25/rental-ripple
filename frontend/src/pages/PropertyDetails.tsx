import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../services/api';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!id) return;
    Api.getProperty(id).then((p) => { setProperty(p); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!property) return <div>Property not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <button onClick={() => navigate(-1)} className="text-sm text-gray-600">Back</button>
        </div>
        <p className="text-gray-500">{property.location}</p>
        <p className="mt-4">{property.description}</p>
        <div className="mt-6 flex items-center gap-4">
          <span className="text-xl font-bold text-blue-600">${property.price}</span>
          <span className={`px-2 py-1 rounded text-xs ${property.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{property.status}</span>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Messages */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-bold">Contact Owner</h3>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 mt-2 border rounded" placeholder="Write a message to owner..." />
            <div className="mt-2">
              <button onClick={async () => {
                if (!user) { alert('Please login'); return; }
                await Api.sendMessage({ conversationId: `prop-${property.id}`, fromUserId: user.id, message });
                alert('Message sent');
                setMessage('');
              }} className="px-4 py-2 bg-blue-600 text-white rounded">Send Message</button>
            </div>
          </div>

          {/* Lease & Payment */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-bold">Actions</h3>
            {user?.role === 'TENANT' && (
              <div className="mt-2">
                <button onClick={async () => {
                  if (!user) return alert('Please login');
                  const payload = { propertyId: property.id, tenantId: user.id, startDate: new Date().toISOString(), endDate: null, price: property.price };
                  await Api.createLease(payload);
                  alert('Lease created');
                  navigate('/leases');
                }} className="px-4 py-2 bg-green-600 text-white rounded">Request Lease / Rent</button>
              </div>
            )}

            {user?.role === 'LANDLORD' && (
              <div className="mt-2">
                <button onClick={async () => {
                  // Toggle status
                  const updated = { ...property, status: property.status === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE' };
                  await Api.updateProperty(property.id, updated);
                  alert('Property status updated');
                  location.reload();
                }} className="px-4 py-2 bg-yellow-600 text-white rounded">Toggle Availability</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
