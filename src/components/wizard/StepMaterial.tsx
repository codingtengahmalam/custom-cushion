import { CUSHION_MATERIALS } from "@/lib/cushion-data";
import { Shield } from "lucide-react";

interface StepMaterialProps {
  selected: string;
  onSelect: (id: string) => void;
}

const StepMaterial = ({ selected, onSelect }: StepMaterialProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
        Select Your Material
      </h2>
      <p className="text-muted-foreground mb-8">Each material is designed to withstand the elements.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CUSHION_MATERIALS.map((mat) => (
          <button
            key={mat.id}
            onClick={() => onSelect(mat.id)}
            className={`group text-left p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
              selected === mat.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground">{mat.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{mat.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepMaterial;
