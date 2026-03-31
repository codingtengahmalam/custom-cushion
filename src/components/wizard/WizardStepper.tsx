import { Check } from "lucide-react";

interface WizardStepperProps {
  currentStep: number;
  steps: string[];
}

const WizardStepper = ({ currentStep, steps }: WizardStepperProps) => {
  const totalSteps = steps.length;
  const currentLabel = steps[currentStep - 1];
  const progressPct = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <>
      {/* Mobile: compact progress bar */}
      <div className="flex flex-col gap-2 mb-8 sm:hidden">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-foreground">
            Langkah {currentStep} / {totalSteps}: <span className="text-primary">{currentLabel}</span>
          </span>
          <span className="text-muted-foreground">{Math.round(progressPct)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Desktop: full step indicators */}
      <div className="hidden sm:flex items-center justify-center gap-2 mb-10">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const isActive = currentStep === stepNum;
          const isCompleted = currentStep > stepNum;

          return (
            <div key={label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`wizard-step-indicator ${
                    isActive ? "wizard-step-active" : isCompleted ? "wizard-step-completed" : "wizard-step-pending"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                <span className={`text-xs font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 h-0.5 mb-5 ${currentStep > stepNum ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WizardStepper;
