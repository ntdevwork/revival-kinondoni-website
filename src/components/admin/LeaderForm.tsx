
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUpload from "./ImageUpload";
import { Leader } from "./LeaderCard";
import { useToast } from "@/hooks/use-toast";

interface LeaderFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (leader: Leader) => void;
  currentLeader: Leader | null;
}

const LeaderForm: React.FC<LeaderFormProps> = ({
  isOpen,
  onOpenChange,
  onSave,
  currentLeader
}) => {
  const { toast } = useToast();
  const [leaderName, setLeaderName] = useState("");
  const [leaderRole, setLeaderRole] = useState("");
  const [leaderBio, setLeaderBio] = useState("");
  const [leaderImage, setLeaderImage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Reset form when dialog opens with new leader data
  useEffect(() => {
    if (isOpen) {
      if (currentLeader) {
        setLeaderName(currentLeader.name);
        setLeaderRole(currentLeader.role);
        setLeaderBio(currentLeader.bio || "");
        setLeaderImage(currentLeader.image);
        setImagePreview(currentLeader.image);
      } else {
        setLeaderName("");
        setLeaderRole("");
        setLeaderBio("");
        setLeaderImage("");
        setImagePreview(null);
      }
    }
  }, [isOpen, currentLeader]);

  const handleSave = () => {
    // Validate form
    if (!leaderName.trim() || !leaderRole.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const leader: Leader = {
      id: currentLeader ? currentLeader.id : crypto.randomUUID(),
      name: leaderName.trim(),
      role: leaderRole.trim(),
      bio: leaderBio.trim(),
      image: leaderImage || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };

    onSave(leader);
    
    // Clean up any blob URLs to prevent memory leaks
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const handleImageSelected = (imageUrl: string, base64: string) => {
    setImagePreview(imageUrl);
    setLeaderImage(base64);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <ImageUpload 
            imagePreview={imagePreview}
            onImageSelected={handleImageSelected}
            label="Profile Image"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Leader
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderForm;
