import { Link } from 'react-router-dom';

export default function PropertyCard({ p }: any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{p.title}</h3>
      <p className="text-gray-500 text-sm">{p.location}</p>
      <p className="text-gray-700 mt-2">{p.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold text-blue-600">${p.price}/night</span>
        <div className="flex items-center gap-2">
          <Link to={`/properties/${p.id}`} className="text-sm text-white bg-blue-600 p-2 rounded hover:bg-blue-700">View</Link>
        </div>
      </div>
    </div>
  );
}
