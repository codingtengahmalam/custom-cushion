import { CUSHION_SHAPES, CUSHION_COLORS, CUSHION_MATERIALS } from "@/lib/cushion-data";
import type { CushionOrder } from "@/lib/cushion-data";

interface StepSummaryProps {
  order: CushionOrder;
}

const StepSummary = ({ order }: StepSummaryProps) => {
  const shape = CUSHION_SHAPES.find((s) => s.id === order.shape);
  const color = CUSHION_COLORS.find((c) => c.id === order.color);
  const material = CUSHION_MATERIALS.find((m) => m.id === order.material);

  const items = [
    { label: "Shape", value: shape?.name, detail: shape?.size },
    { label: "Color", value: color?.name, swatch: color?.hex },
    { label: "Material", value: material?.name, detail: material?.description },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
        Order Summary
      </h2>
      <p className="text-muted-foreground mb-8">Review your custom cushion before placing the order.</p>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between p-5">
            <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
            <div className="flex items-center gap-3">
              {item.swatch && (
                <div className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: item.swatch }} />
              )}
              <div className="text-right">
                <span className="font-semibold text-foreground">{item.value}</span>
                {item.detail && <p className="text-xs text-muted-foreground">{item.detail}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepSummary;
