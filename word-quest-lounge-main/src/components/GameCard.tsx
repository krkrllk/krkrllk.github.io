import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  gradient?: "primary" | "secondary";
}

export const GameCard = ({ title, description, icon: Icon, onClick, gradient = "primary" }: GameCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 hover:scale-105 shadow-card hover:shadow-hover p-8 border-2 border-transparent hover:border-primary ${
        gradient === "primary" ? "gradient-primary" : "gradient-secondary"
      }`}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
          <Icon className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
    </Card>
  );
};
