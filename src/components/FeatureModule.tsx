
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FeatureModuleProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  path: string;
  className?: string;
}

const FeatureModule: React.FC<FeatureModuleProps> = ({
  title,
  description,
  icon: Icon,
  color,
  path,
  className
}) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg bg-white bg-opacity-90 border-none",
      className
    )}>
      <div className="p-6 flex flex-col h-full">
        <div className={`circle-icon ${color} mb-4 animate-pulse-gentle`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-serif text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <Button 
          asChild
          className={cn(
            "w-full rounded-full mt-auto",
            color === "bg-shesoul-bubblegum" && "bg-shesoul-bubblegum hover:bg-opacity-90 text-white",
            color === "bg-shesoul-sunflower" && "bg-shesoul-sunflower hover:bg-opacity-90 text-foreground",
            color === "bg-shesoul-pastel" && "bg-shesoul-pastel hover:bg-opacity-90 text-foreground",
            color === "bg-shesoul-peach" && "bg-shesoul-peach hover:bg-opacity-90 text-foreground"
          )}
        >
          <Link to={path}>Explore</Link>
        </Button>
      </div>
    </Card>
  );
};

export default FeatureModule;
