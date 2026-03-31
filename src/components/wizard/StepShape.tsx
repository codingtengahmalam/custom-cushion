import { CUSHION_SHAPES } from "@/lib/cushion-data";

interface StepShapeProps {
  selected: string;
  onSelect: (id: string) => void;
}

const StepShape = ({ selected, onSelect }: StepShapeProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
        Choose Your Shape
      </h2>
      <p className="text-muted-foreground mb-8">Select the cushion shape that fits your furniture.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {CUSHION_SHAPES.map((shape) => (
          <button
            key={shape.id}
            onClick={() => onSelect(shape.id)}
            className={`group text-left p-4 sm:p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
              selected === shape.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <h3 className="font-display font-semibold text-lg text-foreground">{shape.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{shape.description}</p>
            <span className="inline-block mt-3 text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
              {shape.size}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepShape;
