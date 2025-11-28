import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropertyCard from './components/PropertyCard';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const navigate = useNavigate();

  // Load User from Storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login"); // If not logged in, kick them out
    } else {
      setUser(JSON.parse(storedUser));
      fetchProperties();
    }
  }, []);

  function fetchProperties() {
  fetch("http://localhost:8082/api/properties")
    .then((res) => res.json())
    .then((data) => setProperties(data));
}


  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Hello, {user?.username} ({user?.role})
        </h1>
        <div className="flex gap-2 items-center">
          <Link to="/leases" className="text-sm p-2 bg-gray-100 rounded">Leases</Link>
          <Link to="/payments" className="text-sm p-2 bg-gray-100 rounded">Payments</Link>
          <Link to="/messages" className="text-sm p-2 bg-gray-100 rounded">Messages</Link>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>
        </div>
      </div>

      {/* OWNER VIEW: Add Property Form */}
      {user?.role === "LANDLORD" && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Add a New Hotel/Property</h2>
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newProp = {
                title: formData.get("title"),
                description: formData.get("description"),
                price: formData.get("price"),
                location: formData.get("location"),
                status: "AVAILABLE",
              };

              fetch(`http://localhost:8082/api/add-property?landlordId=${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProp),
              }).then(() => {
                alert("Property Added!");
                fetchProperties(); // Refresh list
              });
            }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <input name="title" placeholder="Property Title" required className="p-2 border rounded" />
            <input name="location" placeholder="Location" required className="p-2 border rounded" />
            <input name="price" type="number" placeholder="Price per night" required className="p-2 border rounded" />
            <input name="description" placeholder="Description" required className="p-2 border rounded" />
            <button className="col-span-2 bg-green-600 text-white p-2 rounded hover:bg-green-700">Add Property</button>
          </form>
        </div>
      )}

      {/* TENANT VIEW: List of Properties */}
      <h2 className="text-xl font-bold mb-4">
        {user?.role === "TENANT" ? "Available Hotels for You" : "Your Listed Properties"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.length === 0 ? <p>No properties found.</p> : null}
        {properties.map((p) => (
          <PropertyCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}