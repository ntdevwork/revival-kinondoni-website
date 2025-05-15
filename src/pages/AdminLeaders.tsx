
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AdminLeaders = () => {
  const { toast } = useToast();

  const showComingSoonToast = () => {
    toast({
      title: "Coming Soon",
      description: "This feature is under development and will be available soon.",
    });
  };

  // Sample leaders data
  const leaders = [
    {
      id: '1',
      name: 'Bishop Dr. Rogathe Z. Swai',
      role: 'Senior Pastor',
      image: 'https://images.unsplash.com/photo-1548449112-96a38a643324?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      name: 'Rev. Mary Johnson',
      role: 'Assistant Pastor',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      name: 'Deacon James Wilson',
      role: 'Head Deacon',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Leaders Management</h1>
          <p className="text-gray-600 mt-1">Add, edit, or remove church leadership profiles</p>
        </div>
        <Button className="bg-church-orange hover:bg-church-orange/90" onClick={showComingSoonToast}>
          Add New Leader
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaders.map((leader) => (
          <Card key={leader.id} className="overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{leader.name}</CardTitle>
              <p className="text-gray-500">{leader.role}</p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={showComingSoonToast}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600" onClick={showComingSoonToast}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminLeaders;
