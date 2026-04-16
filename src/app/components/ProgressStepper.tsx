import { Check } from "lucide-react";

interface Step {
  label: string;
  completed: boolean;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                index < currentStep
                  ? "bg-primary border-primary"
                  : index === currentStep
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4 text-primary-foreground" />
              ) : (
                <span className="text-sm">{index + 1}</span>
              )}
            </div>
            <span className="text-xs mt-1 text-center max-w-[70px]">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 flex-1 mx-2 -mt-5 transition-all ${
                index < currentStep ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
