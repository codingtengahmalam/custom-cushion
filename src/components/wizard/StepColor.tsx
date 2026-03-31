import { CUSHION_COLORS } from "@/lib/cushion-data";
import { Check } from "lucide-react";

interface StepColorProps {
  selected: string;
  onSelect: (id: string) => void;
}

const StepColor = ({ selected, onSelect }: StepColorProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
        Pick Your Color
      </h2>
      <p className="text-muted-foreground mb-8">Choose a color that complements your outdoor space.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        {CUSHION_COLORS.map((color) => (
          <button
            key={color.id}
            onClick={() => onSelect(color.id)}
            className={`group flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
              selected === color.id
                ? "border-primary shadow-md"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-border relative shadow-inner"
              style={{ backgroundColor: color.hex }}
            >
              {selected === color.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-6 h-6" style={{ color: color.id === "cream" || color.id === "mustard" ? "#333" : "#fff" }} />
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-foreground">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepColor;
