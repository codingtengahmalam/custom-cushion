import { CUSHION_SHAPES } from "@/lib/cushion-data";

interface StepShapeProps {
  selected: string;
  onSelect: (id: string) => void;
}

const ShapeIllustration = ({ id, isSelected }: { id: string; isSelected: boolean }) => {
  const fill = isSelected ? "hsl(var(--primary) / 0.15)" : "hsl(var(--muted))";
  const stroke = isSelected ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.4)";

  switch (id) {
    case "square":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <rect x="10" y="10" width="60" height="60" rx="6" fill={fill} stroke={stroke} strokeWidth="2.5" />
        </svg>
      );
    case "rectangle":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <rect x="6" y="20" width="68" height="40" rx="6" fill={fill} stroke={stroke} strokeWidth="2.5" />
        </svg>
      );
    case "round":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <circle cx="40" cy="40" r="30" fill={fill} stroke={stroke} strokeWidth="2.5" />
        </svg>
      );
    case "bolster":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <rect x="8" y="28" width="64" height="24" rx="12" fill={fill} stroke={stroke} strokeWidth="2.5" />
          <ellipse cx="8" cy="40" rx="8" ry="12" fill={fill} stroke={stroke} strokeWidth="2" />
          <ellipse cx="72" cy="40" rx="8" ry="12" fill={fill} stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "bench":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <rect x="4" y="28" width="72" height="24" rx="5" fill={fill} stroke={stroke} strokeWidth="2.5" />
        </svg>
      );
    case "lounger":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <rect x="4" y="30" width="72" height="20" rx="5" fill={fill} stroke={stroke} strokeWidth="2.5" />
          <rect x="4" y="30" width="18" height="20" rx="5" fill={fill} stroke={stroke} strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
};

const StepShape = ({ selected, onSelect }: StepShapeProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
        Choose Your Shape
      </h2>
      <p className="text-muted-foreground mb-8">Select the cushion shape that fits your furniture.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {CUSHION_SHAPES.map((shape) => {
          const isSelected = selected === shape.id;
          return (
            <button
              key={shape.id}
              onClick={() => onSelect(shape.id)}
              className={`group text-left p-4 sm:p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="w-full h-20 mb-3 flex items-center justify-center">
                <ShapeIllustration id={shape.id} isSelected={isSelected} />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">{shape.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{shape.description}</p>
              <span className="inline-block mt-3 text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                {shape.size}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepShape;
