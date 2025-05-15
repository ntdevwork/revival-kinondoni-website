
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  
  // Event form state
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState("");
  
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

  const handleAddNewClick = () => {
    setCurrentEvent(null);
    setEventTitle("");
    setEventDate("");
    setEventDescription("");
    setEventImage("");
    setIsDialogOpen(true);
  };

  const handleEditClick = (event: any) => {
    setCurrentEvent(event);
    setEventTitle(event.title);
    setEventDate(event.date);
    setEventDescription(event.description);
    setEventImage(event.image);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (event: any) => {
    setCurrentEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveEvent = () => {
    // Validate form
    if (!eventTitle.trim() || !eventDate.trim() || !eventDescription.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    let updatedEvents;
    const newEvent = {
      id: currentEvent ? currentEvent.id : crypto.randomUUID(),
      title: eventTitle.trim(),
      date: eventDate.trim(),
      description: eventDescription.trim(),
      image: eventImage.trim() || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };

    if (currentEvent) {
      // Update existing event
      updatedEvents = events.map(event => 
        event.id === currentEvent.id ? newEvent : event
      );
      toast({
        title: "Event Updated",
        description: "The event has been successfully updated.",
      });
    } else {
      // Add new event
      updatedEvents = [...events, newEvent];
      toast({
        title: "Event Created",
        description: "The new event has been successfully created.",
      });
    }

    // Update state and localStorage
    setEvents(updatedEvents);
    localStorage.setItem('krc_events', JSON.stringify(updatedEvents));
    setIsDialogOpen(false);
  };

  const handleDeleteEvent = () => {
    if (!currentEvent) return;
    
    // Filter out the event to be deleted
    const updatedEvents = events.filter(event => event.id !== currentEvent.id);
    
    // Update state and localStorage
    setEvents(updatedEvents);
    localStorage.setItem('krc_events', JSON.stringify(updatedEvents));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Event Deleted",
      description: "The event has been successfully removed.",
    });
  };

  const handleImageChange = () => {
    toast({
      title: "Image Upload",
      description: "Image upload functionality will be available soon.",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-gray-600 mt-1">Add, edit, or remove church events</p>
        </div>
        <Button 
          className="bg-church-orange hover:bg-church-orange/90 flex items-center gap-2"
          onClick={handleAddNewClick}
        >
          <Plus className="h-4 w-4" /> Add New Event
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditClick(event)}
                  className="flex items-center"
                >
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 flex items-center"
                  onClick={() => handleDeleteClick(event)}
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
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

      {/* Event Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
            <DialogDescription>
              {currentEvent 
                ? "Make changes to your event here. Click save when you're done."
                : "Add the details for your new event below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Enter event title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                placeholder="e.g., May 4, 2025"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Enter event description"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  value={eventImage}
                  onChange={(e) => setEventImage(e.target.value)}
                  placeholder="Image URL (optional)"
                  className="flex-grow"
                />
                <Button onClick={handleImageChange} type="button">
                  Upload
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent}>
              Save Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteEvent}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
