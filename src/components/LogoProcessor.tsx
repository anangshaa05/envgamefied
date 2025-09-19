import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Download, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { removeBackground, loadImage } from "@/utils/backgroundRemoval";

const LogoProcessor = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    // Display original image
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Process image to remove background
    setIsProcessing(true);
    try {
      const imageElement = await loadImage(file);
      const processedBlob = await removeBackground(imageElement);
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImage(processedUrl);
      
      toast({
        title: "Success!",
        description: "Background removed successfully.",
      });
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Processing Failed",
        description: "Failed to remove background. Please try a different image.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'logo-no-background.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUseAsLogo = () => {
    if (!processedImage) return;
    
    // Create a download link for the processed image to be used as logo
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'new-logo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Logo Ready!",
      description: "Download the processed logo and replace it in your assets folder.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Logo Background Remover</h1>
          <p className="text-lg text-muted-foreground">
            Upload your logo image and we'll remove the background for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Logo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Click to upload image</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, JPEG up to 10MB</p>
                    </div>
                  </label>
                </div>

                {originalImage && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Original Image:</p>
                    <img
                      src={originalImage}
                      alt="Original logo"
                      className="w-full max-w-xs mx-auto rounded-lg border"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Result Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Processed Logo
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Removing background...</p>
                  </div>
                ) : processedImage ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Background Removed:</p>
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg">
                        <img
                          src={processedImage}
                          alt="Processed logo"
                          className="w-full max-w-xs mx-auto"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleDownload} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button onClick={handleUseAsLogo} size="sm">
                        Use as Logo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mb-4" />
                    <p className="text-sm">Upload an image to see the result</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoProcessor;