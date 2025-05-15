
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AdminContent = () => {
  const { toast } = useToast();

  const showComingSoonToast = () => {
    toast({
      title: "Coming Soon",
      description: "This feature is under development and will be available soon.",
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
            <CardHeader>
              <CardTitle>Home Page Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="cursor-pointer p-3 border rounded-md hover:bg-gray-50" onClick={showComingSoonToast}>
                  <div className="font-medium">Hero Section</div>
                  <div className="text-sm text-gray-500">Edit main banner text and image</div>
                </div>
                <div className="cursor-pointer p-3 border rounded-md hover:bg-gray-50" onClick={showComingSoonToast}>
                  <div className="font-medium">Welcome Message</div>
                  <div className="text-sm text-gray-500">Edit the church welcome message</div>
                </div>
                <div className="cursor-pointer p-3 border rounded-md hover:bg-gray-50" onClick={showComingSoonToast}>
                  <div className="font-medium">Service Times</div>
                  <div className="text-sm text-gray-500">Update church service schedules</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Page Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="cursor-pointer p-3 border rounded-md hover:bg-gray-50" onClick={showComingSoonToast}>
                  <div className="font-medium">Church History</div>
                  <div className="text-sm text-gray-500">Edit the church history section</div>
                </div>
                <div className="cursor-pointer p-3 border rounded-md hover:bg-gray-50" onClick={showComingSoonToast}>
                  <div className="font-medium">Vision & Mission</div>
                  <div className="text-sm text-gray-500">Update vision and mission statements</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swahili" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Maudhui ya Ukurasa wa Mwanzo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="cursor-pointer p-3 border rounded-md hover:bg-gray-50" onClick={showComingSoonToast}>
                  <div className="font-medium">Sehemu ya Utangulizi</div>
                  <div className="text-sm text-gray-500">Hariri maneno na picha ya bango kuu</div>
                </div>
                <div className="cursor-pointer p-3 border rounded-md hover:bg-gray-50" onClick={showComingSoonToast}>
                  <div className="font-medium">Ujumbe wa Karibu</div>
                  <div className="text-sm text-gray-500">Hariri ujumbe wa karibu wa kanisa</div>
                </div>
                <div className="cursor-pointer p-3 border rounded-md hover:bg-gray-50" onClick={showComingSoonToast}>
                  <div className="font-medium">Nyakati za Ibada</div>
                  <div className="text-sm text-gray-500">Sasisha ratiba za ibada za kanisa</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maudhui ya Ukurasa wa Kuhusu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="cursor-pointer p-3 border rounded-md hover:bg-gray-50" onClick={showComingSoonToast}>
                  <div className="font-medium">Historia ya Kanisa</div>
                  <div className="text-sm text-gray-500">Hariri sehemu ya historia ya kanisa</div>
                </div>
                <div className="cursor-pointer p-3 border rounded-md hover:bg-gray-50" onClick={showComingSoonToast}>
                  <div className="font-medium">Maono na Dhamira</div>
                  <div className="text-sm text-gray-500">Sasisha taarifa za maono na dhamira</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
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
