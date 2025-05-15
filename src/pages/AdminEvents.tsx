
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// In a real app, this would come from a database
const defaultEvents = [
  {
    id: '1',
    title: "Men's Day",
    date: "May 4, 2025",
    description: "Join us for a special Men's Day service with Bishop Dr. Rogathe Z. Swai. The theme is 'Men of Faith, Men of Action'.",
    image: "/lovable-uploads/24ed29dd-2470-4442-bb92-2e387d526605.png"
  },
  {
    id: '2',
    title: "Youth Conference",
    date: "June 15, 2025",
    description: "Annual youth conference focused on empowering the next generation with practical faith for today's challenges.",
    image: "https://images.unsplash.com/photo-1523803326055-13445f272bf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: '3',
    title: "Women's Prayer Meeting",
    date: "July 2, 2025",
    description: "Monthly women's prayer meeting focusing on family and community. Special guest speaker from Nairobi.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const AdminEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  
  useEffect(() => {
    // Load events from localStorage or use default
    const storedEvents = localStorage.getItem('krc_events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(defaultEvents);
      localStorage.setItem('krc_events', JSON.stringify(defaultEvents));
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-gray-600 mt-1">Add, edit, or remove church events</p>
        </div>
        <Button className="bg-church-orange hover:bg-church-orange/90">
          Add New Event
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <p className="text-sm text-gray-500">{event.date}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 line-clamp-3">{event.description}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => {
                  toast({
                    title: "Edit feature",
                    description: "This feature will be implemented soon",
                  });
                }}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600" onClick={() => {
                  toast({
                    title: "Delete feature",
                    description: "This feature will be implemented soon",
                  });
                }}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events found. Click "Add New Event" to create one.</p>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
