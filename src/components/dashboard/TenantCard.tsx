import { Phone, Mail, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TenantCardProps {
  tenant: {
    id: string;
    name: string;
    email: string;
    phone: string;
    property: string;
    unit: string;
    rentAmount: number;
    paymentStatus: "paid" | "pending" | "overdue";
    leaseEnd: string;
  };
}

const TenantCard = ({ tenant }: TenantCardProps) => {
  const statusColors = {
    paid: "bg-success text-success-foreground",
    pending: "bg-warning text-warning-foreground", 
    overdue: "bg-destructive text-destructive-foreground"
  };

  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{tenant.name}</h3>
            <p className="text-sm text-muted-foreground">{tenant.property} - Unit {tenant.unit}</p>
          </div>
          <Badge className={statusColors[tenant.paymentStatus]}>
            {tenant.paymentStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{tenant.email}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{tenant.phone}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Lease ends: {tenant.leaseEnd}</span>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-sm text-muted-foreground">Monthly Rent</span>
          <span className="font-semibold">${tenant.rentAmount.toLocaleString()}</span>
        </div>
        
        {tenant.paymentStatus === "overdue" && (
          <Button variant="destructive" size="sm" className="w-full">
            <AlertCircle className="h-4 w-4 mr-2" />
            Send Reminder
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TenantCard;