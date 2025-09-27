import { MapPin, Users, DollarSign, Edit, Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    type: string;
    units: number;
    occupiedUnits: number;
    monthlyRent: number;
    status: "occupied" | "vacant" | "maintenance";
    image: string;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const statusColors = {
    occupied: "bg-success text-success-foreground",
    vacant: "bg-warning text-warning-foreground",
    maintenance: "bg-destructive text-destructive-foreground"
  };

  const occupancyRate = Math.round((property.occupiedUnits / property.units) * 100);

  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300 group">
      <CardHeader className="p-0">
        <div className="relative h-48 bg-muted rounded-t-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 right-4">
            <Badge className={statusColors[property.status]}>
              {property.status}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-semibold text-lg">{property.name}</h3>
            <p className="text-sm opacity-90 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {property.address}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="font-medium">{property.type}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Occupancy
            </span>
            <span className="font-medium">{occupancyRate}% ({property.occupiedUnits}/{property.units})</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Monthly Rent
            </span>
            <span className="font-medium">${property.monthlyRent.toLocaleString()}</span>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;