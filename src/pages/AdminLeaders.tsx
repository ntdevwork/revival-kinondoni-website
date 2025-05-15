
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";

const AdminLeaders = () => {
  const { toast } = useToast();

  // Sample leaders data for initial state
  const defaultLeaders = [
    {
      id: '1',
      name: 'Bishop Dr. Rogathe Z. Swai',
      role: 'Senior Pastor',
      image: 'https://images.unsplash.com/photo-1548449112-96a38a643324?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Bishop Dr. Rogathe has been serving as our Senior Pastor since 2005. With over 30 years in ministry, he is passionate about spreading the Gospel.'
    },
    {
      id: '2',
      name: 'Rev. Mary Johnson',
      role: 'Assistant Pastor',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Rev. Mary oversees our youth and women ministries. She joined Kinondoni Revival Church in 2012 and has been instrumental in community outreach.'
    },
    {
      id: '3',
      name: 'Deacon James Wilson',
      role: 'Head Deacon',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bio: 'Deacon James coordinates our welfare and service ministries. He has been a faithful member of the church since its founding.'
    },
  ];

  // State management
  const [leaders, setLeaders] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentLeader, setCurrentLeader] = useState<any>(null);
  
  // Leader form state
  const [leaderName, setLeaderName] = useState("");
  const [leaderRole, setLeaderRole] = useState("");
  const [leaderBio, setLeaderBio] = useState("");
  const [leaderImage, setLeaderImage] = useState("");

  useEffect(() => {
    // Load leaders from localStorage or use default
    const storedLeaders = localStorage.getItem('krc_leaders');
    if (storedLeaders) {
      setLeaders(JSON.parse(storedLeaders));
    } else {
      setLeaders(defaultLeaders);
      localStorage.setItem('krc_leaders', JSON.stringify(defaultLeaders));
    }
  }, []);

  const handleAddNewClick = () => {
    setCurrentLeader(null);
    setLeaderName("");
    setLeaderRole("");
    setLeaderBio("");
    setLeaderImage("");
    setIsDialogOpen(true);
  };

  const handleEditClick = (leader: any) => {
    setCurrentLeader(leader);
    setLeaderName(leader.name);
    setLeaderRole(leader.role);
    setLeaderBio(leader.bio || "");
    setLeaderImage(leader.image);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (leader: any) => {
    setCurrentLeader(leader);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveLeader = () => {
    // Validate form
    if (!leaderName.trim() || !leaderRole.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    let updatedLeaders;
    const newLeader = {
      id: currentLeader ? currentLeader.id : crypto.randomUUID(),
      name: leaderName.trim(),
      role: leaderRole.trim(),
      bio: leaderBio.trim(),
      image: leaderImage.trim() || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };

    if (currentLeader) {
      // Update existing leader
      updatedLeaders = leaders.map(leader => 
        leader.id === currentLeader.id ? newLeader : leader
      );
      toast({
        title: "Leader Updated",
        description: "The leader profile has been successfully updated.",
      });
    } else {
      // Add new leader
      updatedLeaders = [...leaders, newLeader];
      toast({
        title: "Leader Added",
        description: "The new leader profile has been successfully created.",
      });
    }

    // Update state and localStorage
    setLeaders(updatedLeaders);
    localStorage.setItem('krc_leaders', JSON.stringify(updatedLeaders));
    setIsDialogOpen(false);
  };

  const handleDeleteLeader = () => {
    if (!currentLeader) return;
    
    // Filter out the leader to be deleted
    const updatedLeaders = leaders.filter(leader => leader.id !== currentLeader.id);
    
    // Update state and localStorage
    setLeaders(updatedLeaders);
    localStorage.setItem('krc_leaders', JSON.stringify(updatedLeaders));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Leader Deleted",
      description: "The leader profile has been successfully removed.",
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
          <h1 className="text-3xl font-bold">Leaders Management</h1>
          <p className="text-gray-600 mt-1">Add, edit, or remove church leadership profiles</p>
        </div>
        <Button 
          className="bg-church-orange hover:bg-church-orange/90 flex items-center gap-2"
          onClick={handleAddNewClick}
        >
          <Plus className="h-4 w-4" /> Add New Leader
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
              {leader.bio && (
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{leader.bio}</p>
              )}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditClick(leader)}
                  className="flex items-center"
                >
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 flex items-center"
                  onClick={() => handleDeleteClick(leader)}
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {leaders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No leaders found. Click "Add New Leader" to create one.</p>
        </div>
      )}

      {/* Leader Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentLeader ? "Edit Leader Profile" : "Add New Leader"}</DialogTitle>
            <DialogDescription>
              {currentLeader 
                ? "Make changes to the leader profile here. Click save when you're done."
                : "Add the details for the new leader below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                placeholder="Enter leader's name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={leaderRole}
                onChange={(e) => setLeaderRole(e.target.value)}
                placeholder="e.g., Senior Pastor"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                value={leaderBio}
                onChange={(e) => setLeaderBio(e.target.value)}
                placeholder="Enter leader's biography"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  value={leaderImage}
                  onChange={(e) => setLeaderImage(e.target.value)}
                  placeholder="Image URL"
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
            <Button onClick={handleSaveLeader}>
              Save Leader
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
              Are you sure you want to delete this leader profile? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteLeader}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLeaders;
