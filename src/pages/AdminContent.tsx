
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Sample content structure
const initialContent = {
  english: {
    homepage: {
      heroTitle: "Welcome to Kinondoni Revival Church",
      heroDescription: "Transforming lives through the power of God's word",
      welcomeMessage: "We are delighted to welcome you to Kinondoni Revival Church. We are a community of believers committed to sharing the love of Christ and making disciples.",
      serviceTimesTitle: "Service Times"
    },
    about: {
      churchHistoryTitle: "Our History",
      churchHistoryContent: "Founded in 1990, Kinondoni Revival Church has been serving the community for over three decades, bringing the message of hope and salvation.",
      visionTitle: "Our Vision",
      visionContent: "To raise disciples who will transform their communities through the power of the Gospel.",
      missionTitle: "Our Mission",
      missionContent: "To equip believers with the Word of God and empower them to fulfill their God-given purpose."
    }
  },
  swahili: {
    homepage: {
      heroTitle: "Karibu Kanisa la Ufufuo la Kinondoni",
      heroDescription: "Kubadilisha maisha kupitia nguvu ya neno la Mungu",
      welcomeMessage: "Tunafuraha kukukaribisha katika Kanisa la Ufufuo la Kinondoni. Sisi ni jamii ya waumini waliojitoa kushiriki upendo wa Kristo na kutengeneza wanafunzi.",
      serviceTimesTitle: "Nyakati za Ibada"
    },
    about: {
      churchHistoryTitle: "Historia Yetu",
      churchHistoryContent: "Ikianzishwa mwaka 1990, Kanisa la Ufufuo la Kinondoni limekuwa likihudumia jamii kwa zaidi ya miaka thelathini, likiwafikishia ujumbe wa tumaini na wokovu.",
      visionTitle: "Maono Yetu",
      visionContent: "Kuinua wanafunzi watakaobadilisha jamii zao kupitia nguvu ya Injili.",
      missionTitle: "Dhamira Yetu",
      missionContent: "Kuwatayarisha waumini kwa Neno la Mungu na kuwawezesha kutimiza malengo yao yaliyotolewa na Mungu."
    }
  }
};

const AdminContent = () => {
  const [content, setContent] = useState(
    localStorage.getItem('krc_content') 
      ? JSON.parse(localStorage.getItem('krc_content')!) 
      : initialContent
  );
  const [editingContent, setEditingContent] = useState<{
    section: string;
    field: string;
    value: string;
    language: 'english' | 'swahili';
    page: string;
  } | null>(null);
  const { toast } = useToast();

  const handleEdit = (language: 'english' | 'swahili', page: string, section: string, field: string, value: string) => {
    setEditingContent({
      language,
      page,
      section,
      field,
      value
    });
  };

  const handleSave = () => {
    if (!editingContent) return;
    
    const { language, page, section, field, value } = editingContent;
    const newContent = { ...content };
    
    // Update the content
    newContent[language][page][section + field] = value;
    
    // Save to state and localStorage
    setContent(newContent);
    localStorage.setItem('krc_content', JSON.stringify(newContent));
    
    // Reset editing state
    setEditingContent(null);
    
    // Show success toast
    toast({
      title: "Content Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const renderContentItems = (language: 'english' | 'swahili', page: string, items: any) => {
    return Object.keys(items).map((key) => {
      const value = items[key];
      const sectionName = key.replace(/Title$|Content$|Message$|Description$/, '');
      const fieldType = key.includes('Title') ? 'Title' : 
                        key.includes('Content') ? 'Content' : 
                        key.includes('Message') ? 'Message' : 'Description';
      
      return (
        <div 
          key={key} 
          className="cursor-pointer p-3 border rounded-md hover:bg-gray-50"
          onClick={() => handleEdit(language, page, sectionName, fieldType, value)}
        >
          <div className="font-medium">{value.length > 30 ? value.substring(0, 30) + '...' : value}</div>
          <div className="text-sm text-gray-500">{sectionName} - {fieldType}</div>
        </div>
      );
    });
  };

  const handleImageUpload = () => {
    toast({
      title: "Coming Soon",
      description: "Image upload functionality will be available soon.",
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-gray-600 mt-1">
          Edit website content in both English and Swahili
        </p>
      </div>

      <Tabs defaultValue="english">
        <TabsList className="mb-4">
          <TabsTrigger value="english">English Content</TabsTrigger>
          <TabsTrigger value="swahili">Swahili Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="english" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Home Page Content</CardTitle>
              <Button onClick={handleImageUpload}>Update Images</Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {renderContentItems('english', 'homepage', content.english.homepage)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>About Page Content</CardTitle>
              <Button onClick={handleImageUpload}>Update Images</Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {renderContentItems('english', 'about', content.english.about)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swahili" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Maudhui ya Ukurasa wa Mwanzo</CardTitle>
              <Button onClick={handleImageUpload}>Sasisha Picha</Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {renderContentItems('swahili', 'homepage', content.swahili.homepage)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Maudhui ya Ukurasa wa Kuhusu</CardTitle>
              <Button onClick={handleImageUpload}>Sasisha Picha</Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {renderContentItems('swahili', 'about', content.swahili.about)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={!!editingContent} onOpenChange={(open) => !open && setEditingContent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              Make changes to the selected content below.
            </DialogDescription>
          </DialogHeader>
          
          {editingContent && (
            <div className="py-4">
              <label className="block text-sm font-medium mb-2">
                {editingContent.section} {editingContent.field} 
                ({editingContent.language === 'english' ? 'English' : 'Swahili'})
              </label>
              <Textarea
                value={editingContent.value}
                onChange={(e) => setEditingContent({...editingContent, value: e.target.value})}
                rows={5}
                className="w-full border rounded-md p-2"
              />
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingContent(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <h3 className="font-medium text-blue-800">Content Management Instructions</h3>
        <p className="text-blue-700 text-sm mt-1">
          Click on any content section above to edit. Changes will be saved automatically and 
          immediately reflected on the public website.
        </p>
      </div>
    </div>
  );
};

export default AdminContent;
