
import { toast } from "@/hooks/use-toast";

export interface ImageUploadResult {
  imageUrl: string | null;
  base64?: string;
  error?: string;
}

export const handleImageUpload = (
  file: File,
  callback: (result: ImageUploadResult) => void
): void => {
  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    toast({
      title: "File too large",
      description: "The image must be less than 5MB",
      variant: "destructive"
    });
    callback({ imageUrl: null, error: "File too large" });
    return;
  }
  
  if (!file.type.startsWith('image/')) {
    toast({
      title: "Invalid file type",
      description: "Please upload an image file",
      variant: "destructive"
    });
    callback({ imageUrl: null, error: "Invalid file type" });
    return;
  }
  
  // Create a blob URL to preview the image
  const imageUrl = URL.createObjectURL(file);
  
  // Convert image to base64 for storage
  const reader = new FileReader();
  reader.onloadend = () => {
    callback({ 
      imageUrl: imageUrl,
      base64: reader.result as string 
    });
  };
  reader.readAsDataURL(file);
};
