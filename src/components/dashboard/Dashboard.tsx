import { Building, Users, DollarSign, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "./StatsCard";
import PropertyCard from "./PropertyCard";
import TenantCard from "./TenantCard";
import heroImage from "@/assets/hero-property.jpg";

const Dashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Total Properties",
      value: "24",
      change: "+2 this month",
      icon: Building,
      trend: "up" as const
    },
    {
      title: "Total Tenants", 
      value: "156",
      change: "+8 this month",
      icon: Users,
      trend: "up" as const
    },
    {
      title: "Monthly Revenue",
      value: "$45,280",
      change: "+12% from last month",
      icon: DollarSign,
      trend: "up" as const
    },
    {
      title: "Occupancy Rate",
      value: "94%",
      change: "+3% from last month", 
      icon: TrendingUp,
      trend: "up" as const
    }
  ];

  const recentProperties = [
    {
      id: "1",
      name: "Sunset Apartments",
      address: "123 Oak Street, Downtown",
      type: "Apartment Complex",
      units: 24,
      occupiedUnits: 22,
      monthlyRent: 28800,
      status: "occupied" as const,
      image: ""
    },
    {
      id: "2", 
      name: "Garden View Condos",
      address: "456 Pine Avenue, Midtown",
      type: "Condominium",
      units: 18,
      occupiedUnits: 16,
      monthlyRent: 32400,
      status: "occupied" as const,
      image: ""
    },
    {
      id: "3",
      name: "Riverside Townhomes",
      address: "789 River Road, Westside",
      type: "Townhouse",
      units: 12,
      occupiedUnits: 10,
      monthlyRent: 24000,
      status: "vacant" as const,
      image: ""
    }
  ];

  const recentTenants = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      property: "Sunset Apartments",
      unit: "2A",
      rentAmount: 1200,
      paymentStatus: "paid" as const,
      leaseEnd: "Dec 31, 2024"
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "m.chen@email.com", 
      phone: "(555) 234-5678",
      property: "Garden View Condos",
      unit: "5B",
      rentAmount: 1800,
      paymentStatus: "pending" as const,
      leaseEnd: "Mar 15, 2025"
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "(555) 345-6789",
      property: "Riverside Townhomes", 
      unit: "3C",
      rentAmount: 2000,
      paymentStatus: "overdue" as const,
      leaseEnd: "Jan 20, 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-hero overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-info/80" />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">Property Management Dashboard</h1>
            <p className="text-xl opacity-90">Manage your properties, tenants, and payments efficiently</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Properties */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Recent Properties</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tenants */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Recent Tenants</CardTitle>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Tenant
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTenants.map((tenant) => (
                <TenantCard key={tenant.id} tenant={tenant} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;