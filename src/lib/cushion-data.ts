export const CUSHION_SHAPES = [
  { id: "square", name: "Square", description: "Classic square shape, perfect for chairs", size: "45 x 45 cm" },
  { id: "rectangle", name: "Rectangle", description: "Ideal for benches and loungers", size: "60 x 40 cm" },
  { id: "round", name: "Round", description: "Elegant round cushion for accent seating", size: "45 cm diameter" },
  { id: "bolster", name: "Bolster", description: "Cylindrical support cushion", size: "50 x 20 cm" },
  { id: "bench", name: "Bench Pad", description: "Long cushion for garden benches", size: "120 x 45 cm" },
  { id: "lounger", name: "Sun Lounger", description: "Full-length lounger cushion", size: "190 x 60 cm" },
];

export const CUSHION_COLORS = [
  { id: "sage", name: "Sage Green", hex: "#8B9D77" },
  { id: "terracotta", name: "Terracotta", hex: "#C4654A" },
  { id: "navy", name: "Navy Blue", hex: "#2C3E6B" },
  { id: "cream", name: "Cream", hex: "#F5F0E1" },
  { id: "charcoal", name: "Charcoal", hex: "#3D3D3D" },
  { id: "mustard", name: "Mustard", hex: "#D4A843" },
  { id: "coral", name: "Coral Pink", hex: "#E87F7F" },
  { id: "ocean", name: "Ocean Teal", hex: "#4A8B8D" },
];

export const CUSHION_MATERIALS = [
  { id: "sunbrella", name: "Sunbrella®", description: "Premium fade-resistant fabric, 5-year warranty", priceMultiplier: 1.5 },
  { id: "polyester", name: "Outdoor Polyester", description: "Durable and water-resistant, great value", priceMultiplier: 1.0 },
  { id: "olefin", name: "Olefin", description: "Moisture-wicking, mildew-resistant, eco-friendly", priceMultiplier: 1.2 },
  { id: "canvas", name: "Heavy Canvas", description: "Thick and sturdy, natural look and feel", priceMultiplier: 1.3 },
];

export interface CushionOrder {
  shape: string;
  color: string;
  material: string;
}
