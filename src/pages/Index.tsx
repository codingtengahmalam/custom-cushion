import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Shield, Palette, LayoutDashboard } from "lucide-react";
import heroImage from "@/assets/hero-outdoor.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display font-bold text-xl text-foreground">CushionCraft</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin
            </button>
            <Button onClick={() => navigate("/custom-order")} size="sm">
              Custom Order
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Outdoor patio with colorful cushions" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-28 md:py-40">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Handcrafted Outdoor Cushions
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-md font-body">
              Design your perfect cushion — choose the shape, color, and material to match your outdoor living space.
            </p>
            <Button size="lg" className="mt-8" onClick={() => navigate("/custom-order")}>
              Start Customizing <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h3 className="text-3xl font-display font-semibold text-foreground">Why CushionCraft?</h3>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Premium outdoor cushions, fully customized to your taste.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Palette, title: "Fully Custom", desc: "Choose from various shapes, colors, and premium outdoor materials." },
            { icon: Shield, title: "Weather Resistant", desc: "All materials are UV-protected, water-resistant, and mildew-proof." },
            { icon: Leaf, title: "Eco-Friendly Options", desc: "Sustainable fabrics and recycled fills available for the eco-conscious." },
          ].map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-display font-semibold text-lg text-foreground">{f.title}</h4>
              <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-display font-semibold">Ready to Design Your Cushion?</h3>
          <p className="mt-3 text-primary-foreground/80 max-w-md mx-auto">
            It only takes a few minutes to create your perfect outdoor cushion.
          </p>
          <Button variant="secondary" size="lg" className="mt-8" onClick={() => navigate("/custom-order")}>
            Start Now <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 CushionCraft. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
