import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <blockquote className="text-lg font-medium text-foreground mb-4 italic">
            "The Earth does not belong to us; we belong to the Earth. 
            All things are connected like the blood that unites one family."
          </blockquote>
          <cite className="text-sm text-muted-foreground">- Chief Seattle</cite>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for our planet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;