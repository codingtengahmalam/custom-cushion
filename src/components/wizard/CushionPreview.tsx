import { CUSHION_SHAPES, CUSHION_COLORS, CUSHION_MATERIALS } from "@/lib/cushion-data";
import type { CushionOrder } from "@/lib/cushion-data";

const CUSTOM_PREFIX = "custom:";

interface ShapeSVGProps {
  id: string;
  fill: string;
}

const CushionShapeSVG = ({ id, fill }: ShapeSVGProps) => {
  const gradientId = "cushionHighlight";
  const stroke = "rgba(0,0,0,0.18)";
  const overlay = `url(#${gradientId})`;

  const defs = (
    <defs>
      <radialGradient id={gradientId} cx="50%" cy="30%" r="65%" fx="50%" fy="25%">
        <stop offset="0%" stopColor="white" stopOpacity="0.35" />
        <stop offset="100%" stopColor="black" stopOpacity="0.12" />
      </radialGradient>
    </defs>
  );

  const renderShape = (fillColor: string, extraStrokeWidth?: number) => {
    const sw = extraStrokeWidth ?? 2;
    switch (id) {
      case "square":
        return <rect x="10" y="10" width="60" height="60" rx="8" fill={fillColor} stroke={stroke} strokeWidth={sw} />;
      case "rectangle":
        return <rect x="6" y="20" width="68" height="40" rx="8" fill={fillColor} stroke={stroke} strokeWidth={sw} />;
      case "round":
        return <circle cx="40" cy="40" r="30" fill={fillColor} stroke={stroke} strokeWidth={sw} />;
      case "bolster":
        return (
          <>
            <rect x="8" y="28" width="64" height="24" rx="12" fill={fillColor} stroke={stroke} strokeWidth={sw} />
            <ellipse cx="8" cy="40" rx="8" ry="12" fill={fillColor} stroke={stroke} strokeWidth={sw - 0.5} />
            <ellipse cx="72" cy="40" rx="8" ry="12" fill={fillColor} stroke={stroke} strokeWidth={sw - 0.5} />
          </>
        );
      case "bench":
        return <rect x="4" y="28" width="72" height="24" rx="6" fill={fillColor} stroke={stroke} strokeWidth={sw} />;
      case "lounger":
        return (
          <>
            <rect x="4" y="30" width="72" height="20" rx="6" fill={fillColor} stroke={stroke} strokeWidth={sw} />
            <rect x="4" y="30" width="18" height="20" rx="6" fill={fillColor} stroke={stroke} strokeWidth={sw - 0.5} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
      {defs}
      {renderShape(fill)}
      {renderShape(overlay)}
    </svg>
  );
};

interface CushionPreviewProps {
  order: CushionOrder;
}

const CushionPreview = ({ order }: CushionPreviewProps) => {
  const isCustomColor = order.color.startsWith(CUSTOM_PREFIX);
  const colorHex = isCustomColor
    ? order.color.slice(CUSTOM_PREFIX.length)
    : (CUSHION_COLORS.find((c) => c.id === order.color)?.hex ?? null);
  const colorName = isCustomColor
    ? order.color.slice(CUSTOM_PREFIX.length).toUpperCase()
    : (CUSHION_COLORS.find((c) => c.id === order.color)?.name ?? null);

  const shape = CUSHION_SHAPES.find((s) => s.id === order.shape);
  const material = CUSHION_MATERIALS.find((m) => m.id === order.material);

  const svgFill = colorHex ?? "hsl(var(--muted))";

  const rows = [
    { label: "Shape", value: shape?.name, extra: shape?.size, swatch: null },
    { label: "Color", value: colorName, extra: null, swatch: colorHex },
    { label: "Material", value: material?.name, extra: null, swatch: null },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-5">
      <h3 className="font-display font-semibold text-base text-foreground">Live Preview</h3>

      {/* SVG illustration */}
      <div className="w-full aspect-square rounded-lg bg-muted/50 flex items-center justify-center p-6 border border-border/60">
        {order.shape ? (
          <CushionShapeSVG id={order.shape} fill={svgFill} />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <svg viewBox="0 0 80 80" className="w-24 h-24 opacity-30" aria-hidden="true">
              <rect x="15" y="25" width="50" height="30" rx="8" fill="currentColor" />
            </svg>
            <span className="text-xs text-center">Select a shape to preview</span>
          </div>
        )}
      </div>

      {/* Spec rows */}
      <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2 px-3 py-2.5 bg-background">
            <span className="text-xs font-medium text-muted-foreground shrink-0">{row.label}</span>
            <div className="flex items-center gap-2">
              {row.swatch && (
                <div
                  className="w-4 h-4 rounded-full border border-border shrink-0"
                  style={{ backgroundColor: row.swatch }}
                />
              )}
              <span className="text-xs font-semibold text-foreground text-right">
                {row.value ?? <span className="text-muted-foreground font-normal">—</span>}
              </span>
              {row.extra && (
                <span className="text-xs text-muted-foreground">
                  · {row.extra}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CushionPreview;
