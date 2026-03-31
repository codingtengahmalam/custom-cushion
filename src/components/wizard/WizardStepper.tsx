import { Check } from "lucide-react";

interface WizardStepperProps {
  currentStep: number;
  steps: string[];
}

const WizardStepper = ({ currentStep, steps }: WizardStepperProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
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
  );
};

export default WizardStepper;
