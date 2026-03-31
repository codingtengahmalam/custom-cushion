import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import WizardStepper from "@/components/wizard/WizardStepper";
import StepShape from "@/components/wizard/StepShape";
import StepColor from "@/components/wizard/StepColor";
import StepMaterial from "@/components/wizard/StepMaterial";
import StepSummary from "@/components/wizard/StepSummary";
import StepOrderForm from "@/components/wizard/StepOrderForm";
import CushionPreview from "@/components/wizard/CushionPreview";
import type { CushionOrder } from "@/lib/cushion-data";
import { toast } from "sonner";

const STEPS = ["Shape", "Color", "Material", "Summary", "Order"];

const CustomOrder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState<CushionOrder>({ shape: "", color: "", material: "" });

  const canNext = () => {
    if (step === 1) return !!order.shape;
    if (step === 2) return !!order.color;
    if (step === 3) return !!order.material;
    return true;
  };

  const next = () => {
    if (!canNext()) {
      toast.error("Please make a selection before continuing");
      return;
    }
    if (step < 5) setStep(step + 1);
  };

  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-display font-semibold text-lg">CushionCraft</span>
          </button>
          <span className="text-sm text-muted-foreground">Custom Order</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 lg:items-start">
          {/* Left: sticky preview panel */}
          <div className="lg:w-72 xl:w-80 lg:sticky lg:top-[73px] shrink-0">
            <CushionPreview order={order} />
          </div>

          {/* Right: wizard steps */}
          <div className="flex-1 min-w-0">
            <WizardStepper currentStep={step} steps={STEPS} />

            {step === 1 && <StepShape selected={order.shape} onSelect={(id) => setOrder({ ...order, shape: id })} />}
            {step === 2 && <StepColor selected={order.color} onSelect={(id) => setOrder({ ...order, color: id })} />}
            {step === 3 && <StepMaterial selected={order.material} onSelect={(id) => setOrder({ ...order, material: id })} />}
            {step === 4 && <StepSummary order={order} />}
            {step === 5 && <StepOrderForm order={order} />}

            {/* Navigation */}
            {step < 5 && (
              <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-8 sm:mt-10">
                <Button variant="outline" onClick={prev} disabled={step === 1} className="w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={next} disabled={!canNext()} className="w-full sm:w-auto">
                  {step === 4 ? "Proceed to Order" : "Next"} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomOrder;
